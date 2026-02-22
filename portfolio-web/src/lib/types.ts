/**
 * types.ts - Definiciones de tipos TypeScript para toda la aplicación
 * * Sincronizado con el esquema de Oracle DB y el resultado de la consulta JSON_OBJECT.
 */

export interface User {
  id?: number;
  name: string;
  professional_title: string;
  about: string;
  location?: string;
  email?: string;
  created_at?: Date | string;
}

export interface Experience {
  id?: number;
  user_id?: number;
  enterprise: string;
  job_title: string;
  start_date: string; // Recibido como ISO string desde la BD
  end_date?: string | null;
  description: string;
}

export interface Project {
  id?: number;
  user_id?: number;
  name: string;
  description: string;
  image_url?: string;
  github_link?: string;
  demo_link?: string;
  technologies?: string; // "React, TypeScript, Tailwind"
}

export interface Certification {
  id?: number;
  user_id?: number;
  name: string;
  organization: string;
  url_file: string;
  badge_url?: string;
  is_active?: number;
  issue_date?: string;
}

export interface SocialLink {
  id?: number;
  user_id?: number;
  platform: string;
  url: string;
  icon_url?: string | null;
}

/**
 * Interfaz para la respuesta unificada del servidor (PORTFOLIO_QUERY)
 */
export interface PortfolioData {
  user: User;
  experiences: Experience[];
  projects: Project[];
  certifications: Certification[];
  social_links: SocialLink[];
}

/**
 * Tipo para las respuestas de API (si decides mantener alguna)
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}