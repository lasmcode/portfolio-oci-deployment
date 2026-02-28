/**
 * db.ts - Configuración y utilidades para conexión a OCI Autonomous Database
 *
 * Este archivo centraliza todas las operaciones con la base de datos.
 * Usa oracledb para conectarse a Oracle Autonomous Database que provee OCI.
 *
 * VARIABLES DE ENTORNO NECESARIAS en .env.local:
 * - OCI_DB_USER: Usuario de la BD
 * - OCI_DB_PASSWORD: Contraseña del usuario
 * - OCI_DB_CONNECTION_STRING: Connection string de OCI (ej: "adb-xyz.us-ashburn-1.oraclecloud.com:1522/dbname_high")
 */

import oracledb from 'oracledb';

// Configuración global de Oracle
// Solo inicializa el cliente nativo (Thick) si se especifica la librería.
// De lo contrario, usa el modo Thin (puro JavaScript) que es ideal para desarrollo local y Docker.
if (process.env.ORACLE_CLIENT_LIB_DIR) {
  oracledb.initOracleClient({
    libDir: process.env.ORACLE_CLIENT_LIB_DIR,
  });
}

let pool: oracledb.Pool | null = null;

/**
 * Inicializa el pool de conexiones con OCI Autonomous Database
 * El pool mantiene varias conexiones abiertas para mejor rendimiento
 */
async function initializePool() {
  if (pool) return pool;

  try {
    pool = await oracledb.createPool({
      user: process.env.OCI_DB_USER,
      password: process.env.OCI_DB_PASSWORD,
      connectString: process.env.OCI_DB_CONNECTION_STRING,
      poolMin: 1,
      poolMax: 10,
      poolIncrement: 1,
    });

    console.log('Pool de conexiones inicializado exitosamente');
    return pool;
  } catch (error) {
    console.error('Error inicializando pool de conexiones:', error);
    throw error;
  }
}

/**
 * Obtiene una conexión del pool
 * Si el pool no existe, lo crea primero
 */
async function getConnection() {
  const connectionPool = await initializePool();
  if (!connectionPool) {
    throw new Error('Pool de conexiones no disponible');
  }
  return await connectionPool.getConnection();
}

/**
 * Ejecuta una query y retorna los resultados como objetos
 *
 * @param query - Consulta SQL (usar :param para parámetros)
 * @param params - Array de parámetros para la query
 * @returns Array de objetos con los resultados
 *
 * EJEMPLO:
 * const users = await executeQuery('SELECT * FROM users WHERE id = :id', [1]);
 */
export async function executeQuery<T>(
  query: string,
  params: any[] = []
): Promise<T[]> {
  let connection;
  try {
    connection = await getConnection();
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
 * Ejecuta una query que retorna una sola fila
 * Ideal para queries que sabes que traerán máximo 1 resultado
 */
export async function executeQuerySingle<T>(
  query: string,
  params: any[] = []
): Promise<T | null> {
  const results = await executeQuery<T>(query, params);
  return results.length > 0 ? results[0] : null;
}

/**
 * Cierra el pool de conexiones (llamar cuando se apague la app)
 */
export async function closePool() {
  if (pool) {
    await pool.close();
    pool = null;
  }
}
