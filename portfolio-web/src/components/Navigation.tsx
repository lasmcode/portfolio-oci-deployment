/**
 * Navigation.tsx - Componente de navegación con smooth scroll
 *
 * TIPO: Client Component ('use client')
 * - Necesita interactividad del navegador
 * - Accede a document.getElementById() del DOM
 *
 * FUNCIONALIDAD:
 * - Navbar fijo en la parte superior
 * - Botones que hacen scroll suave hacia cada sección
 * - Estilos con Tailwind CSS
 *
 * SECIONES DISPONIBLES:
 * - Home (hero)
 * - Experience
 * - Projects
 * - About
 *
 * USO EN page.tsx:
 * <Navigation />
 * (Se renderiza una sola vez en el layout)
 */

'use client';

import { SECTIONS } from '@/utils/constants';

export default function Navigation() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Altura del navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-slate-950/80 backdrop-blur-md z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          AS.Dev
        </span>

        <div className="hidden md:flex gap-8">
          {Object.entries(SECTIONS).map(([key, id]) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors tracking-wider"
              style={{
                fontFamily: 'var(--font-headings)'
              }}
            >
              {key.charAt(0) + key.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
