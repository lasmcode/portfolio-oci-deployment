/**
 * migrate.js — Database Migration Runner
 *
 * Runs SQL migration files from the /migrations folder in order.
 * Tracks which migrations have already been applied in the
 * schema_migrations table — safe to run on every deploy.
 *
 * Features:
 * - Handles regular SQL statements (CREATE, INSERT, ALTER, etc.)
 * - Handles PL/SQL blocks (BEGIN...END; / blocks)
 * - Idempotent: skips already-applied migrations
 * - Uses oracledb Thin mode — no Oracle Instant Client needed
 *
 * Usage:
 *   node scripts/migrate.js
 *
 * To add a new migration:
 *   Create migrations/004_your_change.sql and deploy.
 *   It will be detected and run automatically.
 */

'use strict';

const oracledb = require('oracledb');
const fs = require('fs');
const path = require('path');

// ================================================================
// SQL PARSER
// Splits a .sql file into individual executable statements.
// Handles both regular SQL (terminated by ;) and
// PL/SQL blocks (terminated by a standalone / on its own line).
// ================================================================
function parseStatements(sql) {
  const statements = [];
  let current = '';
  let inPlsqlBlock = false;

  // Keywords that start a PL/SQL block
  const plsqlStart = /^\s*(BEGIN|DECLARE|CREATE\s+(OR\s+REPLACE\s+)?(PROCEDURE|FUNCTION|TRIGGER|PACKAGE|TYPE))\b/i;

  const lines = sql.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip pure comment lines and empty lines when buffer is empty
    if ((trimmed.startsWith('--') || trimmed === '') && current.trim() === '') {
      continue;
    }

    // Detect start of PL/SQL block
    if (!inPlsqlBlock && plsqlStart.test(trimmed)) {
      inPlsqlBlock = true;
    }

    if (inPlsqlBlock) {
      // PL/SQL block ends with a standalone '/' on its own line
      if (trimmed === '/') {
        const stmt = current.trim();
        if (stmt) statements.push({ sql: stmt, type: 'plsql' });
        current = '';
        inPlsqlBlock = false;
      } else {
        current += line + '\n';
      }
    } else {
      current += line + '\n';
      // Regular SQL ends with semicolon
      if (trimmed.endsWith(';')) {
        const stmt = current.trim().replace(/;$/, '').trim();
        if (stmt && !stmt.startsWith('--')) {
          statements.push({ sql: stmt, type: 'sql' });
        }
        current = '';
      }
    }
  }

  // Catch any remaining content
  const remaining = current.trim().replace(/;$/, '').trim();
  if (remaining && !remaining.startsWith('--')) {
    statements.push({ sql: remaining, type: 'sql' });
  }

  return statements;
}

// ================================================================
// MIGRATION RUNNER
// ================================================================
async function runMigrations() {
  let connection;

  console.log('🔄 Starting database migrations...');
  console.log(`   DB User:    ${process.env.OCI_DB_USER}`);
  console.log(`   TNS_ADMIN:  ${process.env.TNS_ADMIN}`);
  console.log(`   Connect:    ${(process.env.OCI_DB_CONNECTION_STRING || '').substring(0, 60)}...`);

  try {
    connection = await oracledb.getConnection({
      user: process.env.OCI_DB_USER,
      password: process.env.OCI_DB_PASSWORD,
      connectString: process.env.OCI_DB_CONNECTION_STRING,
      walletLocation: process.env.TNS_ADMIN,
      walletPassword: process.env.WALLET_PASSWORD,
    });

    console.log('✅ Connected to Oracle Autonomous Database\n');

    // Ensure the migrations tracking table exists
    try {
      await connection.execute(`
        CREATE TABLE schema_migrations (
          version    VARCHAR2(50) PRIMARY KEY,
          applied_at TIMESTAMP DEFAULT SYSDATE NOT NULL
        )
      `);
      await connection.commit();
      console.log('📋 Created schema_migrations tracking table');
    } catch (err) {
      if (err.errorNum === 955) {
        // ORA-00955: table already exists — expected on re-runs
      } else {
        throw err;
      }
    }

    // Fetch already-applied migrations
    const result = await connection.execute(
      'SELECT version FROM schema_migrations ORDER BY version',
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    const applied = new Set(result.rows.map(r => r.VERSION));
    console.log(`📦 Already applied: ${applied.size} migration(s)\n`);

    // Discover migration files
    const migrationsDir = path.join(__dirname, '../migrations');
    if (!fs.existsSync(migrationsDir)) {
      console.log('⚠️  No migrations directory found. Skipping.');
      return;
    }

    const files = fs.readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort();

    if (files.length === 0) {
      console.log('⚠️  No migration files found.');
      return;
    }

    let ranCount = 0;

    for (const file of files) {
      const version = file.replace('.sql', '');

      if (applied.has(version)) {
        console.log(`⏭️  Skipping ${file} (already applied)`);
        continue;
      }

      console.log(`\n▶️  Running migration: ${file}`);
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');
      const statements = parseStatements(sql);
      console.log(`   Found ${statements.length} statement(s)`);

      for (let i = 0; i < statements.length; i++) {
        const { sql: stmt, type } = statements[i];
        const preview = stmt.replace(/\s+/g, ' ').substring(0, 80);

        try {
          await connection.execute(stmt);
          console.log(`   ✅ [${i + 1}/${statements.length}] ${type.toUpperCase()}: ${preview}...`);
        } catch (err) {
          // ORA-00955: name already used (CREATE TABLE/INDEX that exists)
          // ORA-01430: column already exists (ADD COLUMN on existing table)
          // ORA-02260: table can only have one primary key
          const ignoredErrors = [955, 1430, 2260];
          if (ignoredErrors.includes(err.errorNum)) {
            console.log(`   ⚠️  [${i + 1}/${statements.length}] Skipped (already exists): ${preview}...`);
          } else {
            console.error(`\n❌ Migration failed at statement ${i + 1}:`);
            console.error(`   File:      ${file}`);
            console.error(`   Statement: ${stmt.substring(0, 200)}`);
            console.error(`   ORA-${err.errorNum}: ${err.message}`);
            throw err;
          }
        }
      }

      // Commit this migration and record it
      await connection.commit();
      await connection.execute(
        'INSERT INTO schema_migrations (version) VALUES (:v)',
        [version]
      );
      await connection.commit();

      console.log(`   ✅ Migration ${file} completed and recorded`);
      ranCount++;
    }

    if (ranCount === 0) {
      console.log('\n✅ Database is up to date. No new migrations to run.');
    } else {
      console.log(`\n✅ Successfully ran ${ranCount} migration(s).`);
    }

  } catch (err) {
    console.error('\n❌ Migration runner failed:', err.message || err);
    process.exit(1);
  } finally {
    if (connection) {
      try { await connection.close(); } catch (_) {}
    }
  }
}

runMigrations();
