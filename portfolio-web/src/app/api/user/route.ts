/**
 * /api/user/route.ts - API endpoint para obtener información del usuario
 *
 * RUTA: GET /api/user
 *
 * FLUJO:
 * 1. Cliente hace request GET a /api/user
 * 2. Esta función ejecuta una query a la BD
 * 3. Retorna JSON con datos del usuario
 *
 * RESPUESTA EXITOSA (200):
 * {
 *   "id": 1,
 *   "name": "Alejandro Múnez",
 *   "professional_title": "Mobile & Web Developer",
 *   "about": "Developer based in San Francisco...",
 *   "location": "San Francisco, USA",
 *   "email": "alejandro@example.com"
 * }
 *
 * RESPUESTA ERROR (500):
 * { "error": "Internal Server Error" }
 */

import { executeQuerySingle } from '@/lib/db';
import { User } from '@/lib/types';
import { NextResponse } from 'next/server';
import { APP_CONFIG } from '@/utils/constantsServer';

export async function GET() {
  try {
    // Obtiene usuario principal de la BD (ID = 1)
    const user = await executeQuerySingle<User>(
      'SELECT * FROM users WHERE id = :id',
      [APP_CONFIG.USER_ID]
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
