/**
 * /api/social-links/route.ts - API endpoint para obtener links sociales
 *
 * RUTA: GET /api/social-links
 *
 * RESPONSABILIDAD:
 * - Obtiene todos los links sociales del usuario
 * - Los muestra en el footer del portafolio
 *
 * RESPUESTA:
 * [
 *   { "id": 1, "platform": "twitter", "url": "https://twitter.com/..." },
 *   { "id": 2, "platform": "linkedin", "url": "https://linkedin.com/..." },
 *   ...
 * ]
 */

import { executeQuery } from '@/lib/db';
import { SocialLink } from '@/lib/types';
import { NextResponse } from 'next/server';
import { APP_CONFIG } from '@/utils/constantsServer';

export async function GET() {
  try {
    const socialLinks = await executeQuery<SocialLink>(
      `SELECT * FROM social_links
       WHERE user_id = :user_id`,
      [APP_CONFIG.USER_ID]
    );

    return NextResponse.json(socialLinks);
  } catch (error) {
    console.error('Error fetching social links:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
