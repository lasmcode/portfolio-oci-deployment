/**
 * /api/experiences/route.ts - API endpoint para obtener experiencias laborales
 *
 * RUTA: GET /api/experiences
 *
 * FLUJO:
 * 1. Cliente hace request GET a /api/experiences
 * 2. Ejecuta query SQL ordenada por fecha descendente
 * 3. Retorna array JSON con todas las experiencias
 *
 * RESPUESTA EXITOSA (200):
 * [
 *   {
 *     "id": 1,
 *     "user_id": 1,
 *     "enterprise": "Zalmart",
 *     "job_title": "Lead Android Developer",
 *     "start_date": "2018-05-01",
 *     "end_date": "2020-09-30",
 *     "description": "Implementé advanced memory management..."
 *   },
 *   ...más experiencias
 * ]
 *
 * RESPUESTA VACÍA (200):
 * []
 */

import { executeQuery } from '@/lib/db';
import { Experience } from '@/lib/types';
import { NextResponse } from 'next/server';
import { APP_CONFIG } from '@/utils/constantsServer';

export async function GET() {
  try {
    // Obtiene todas las experiencias del usuario ordenadas por fecha (más recientes primero)
    const experiences = await executeQuery<Experience>(
      `SELECT * FROM experiences
       WHERE user_id = :user_id
       ORDER BY start_date DESC`,
      [APP_CONFIG.USER_ID]
    );

    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
