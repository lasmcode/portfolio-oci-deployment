/**
 * /api/projects/route.ts - API endpoint para obtener proyectos
 * 
 * RUTA: GET /api/projects
 * 
 * FLUJO:
 * 1. Cliente hace request GET a /api/projects
 * 2. Ejecuta query SQL ordenada por fecha de creación descendente
 * 3. Retorna array JSON con todos los proyectos
 * 
 * RESPUESTA EXITOSA (200):
 * [
 *   {
 *     "id": 1,
 *     "user_id": 1,
 *     "name": "Spotifu Music",
 *     "description": "A music streaming app that emulates Spotify's core features",
 *     "image_url": "/images/projects/spotifu.jpg",
 *     "github_link": "https://github.com/...",
 *     "demo_link": "https://spotifu-demo.com",
 *     "technologies": "React, TypeScript, Firebase"
 *   },
 *   ...más proyectos
 * ]
 */

import { executeQuery } from '@/lib/db';
import { Project } from '@/lib/types';
import { NextResponse } from 'next/server';
import { APP_CONFIG } from '@/utils/constantsServer';

export async function GET() {
  try {
    // Obtiene todos los proyectos ordenados por fecha de creación (más recientes primero)
    const projects = await executeQuery<Project>(
      `SELECT * FROM projects 
       WHERE user_id = :user_id 
       ORDER BY created_at DESC`,
      [APP_CONFIG.USER_ID]
    );

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
