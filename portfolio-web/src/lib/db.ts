/**
 * db.ts - OCI Autonomous Database Configuration & Utilities
 * * Manages Oracle Database connections using the 'oracledb' driver.
 * Supports Thin mode, optimized for OCI Autonomous DB.
 * * Required Environment Variables:
 * - OCI_DB_USER, OCI_DB_PASSWORD, OCI_DB_CONNECTION_STRING
 * - TNS_ADMIN (Wallet path), WALLET_PASSWORD
 */

import oracledb from 'oracledb';

let pool: oracledb.Pool | null = null;

/**
 * Initializes the connection pool if it doesn't exist.
 * Validates environment variables before attempting connection.
 */

async function initializePool() {
  if (pool) return pool;

  try {
    
    if (!process.env.OCI_DB_CONNECTION_STRING) {
      throw new Error("Falta la variable OCI_DB_CONNECTION_STRING en el .env");
    }

    pool = await oracledb.createPool({
      user: process.env.OCI_DB_USER,
      password: process.env.OCI_DB_PASSWORD,
      connectString: process.env.OCI_DB_CONNECTION_STRING,
      // TNS_ADMIN is the path to your Wallet folder. 
      // In Docker it will be '/wallet', on local storage it will be your path.
      walletLocation: process.env.TNS_ADMIN || '/wallet', 
      walletPassword: process.env.WALLET_PASSWORD,
      poolMin: 2,
      poolMax: 10,
      poolIncrement: 1,
    });

    console.log('✅ Pool de conexiones inicializado exitosamente');
    return pool;
  } catch (error) {
    console.error('❌ Error inicializando el pool:', error);
    throw error;
  }
}
/**
 * Acquires a connection from the initialized pool.
 */
async function getConnection() {
  const connectionPool = await initializePool();
  if (!connectionPool) {
    throw new Error('Pool de conexiones no disponible');
  }
  return await connectionPool.getConnection();
}

/**
 * Executes a SQL query and returns results as an array of objects.
 * Supports both positional (Array) and named (Object) bind parameters.
 */
export async function executeQuery<T>(
  query: string,
  params: any[] | Record<string, any> = [] // Cambiado para soportar objetos
): Promise<T[]> {
  let connection;
  try {
    connection = await getConnection();
    // When passing an object { id: 1 }, Oracle will automatically map
    // all instances of :id to the value 1.
    const result = await connection.execute(query, params, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });
    return (result.rows as T[]) || [];
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

/**
 * Executes a SQL query and returns the first row or null if empty.
 */
export async function executeQuerySingle<T>(
  query: string,
  params: any[] | Record<string, any> = [] // Cambiado aquí también
): Promise<T | null> {
  const results = await executeQuery<T>(query, params);
  return results.length > 0 ? results[0] : null;
}

/**
 * Gracefully shuts down the connection pool.
 * Should be called during application teardown.
 */
export async function closePool() {
  if (pool) {
    await pool.close();
    pool = null;
  }
}
