


export const SECTIONS = {
  HOME: 'hero',
  EXPERIENCE: 'experience',
  PROJECTS: 'projects',
  CERTIFICATIONS: 'certifications',
  ABOUT: 'about',
} as const;

// URLs internas de API
export const API_ENDPOINTS = {
  USER: '/api/user',
  EXPERIENCES: '/api/experiences',
  PROJECTS: '/api/projects',
  SOCIAL_LINKS: '/api/social-links',
} as const;

// Mapeo de plataformas a iconos/colores
export const SOCIAL_PLATFORMS = {
  twitter: { name: 'Twitter', color: '#1DA1F2', icon: '𝕏' },
  linkedin: { name: 'LinkedIn', color: '#0077B5', icon: '🔗' },
  github: { name: 'GitHub', color: '#333333', icon: '🐙' },
  youtube: { name: 'YouTube', color: '#FF0000', icon: '▶️' },
  dribbble: { name: 'Dribbble', color: '#EA4C89', icon: '🎨' },
} as const;

// Breakpoints Tailwind (para referencia)
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  XXL: '1536px',
} as const;
