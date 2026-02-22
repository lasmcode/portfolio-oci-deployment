import { SocialLink } from '@/lib/types';
import Image from 'next/image';

interface FooterProps {
  data: SocialLink[];
}

export default function Footer({ data }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Diccionario de iconos internos (puedes usar SVGs o emojis)
  const internalIcons: Record<string, string> = {
    linkedin: '💼',
    github: '🐙',
    twitter: '𝕏',
    x: '𝕏',
    instagram: '📸'
  };

  return (
    <footer className="bg-black border-t border-gray-800 py-12 px-6 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        <div className="flex gap-6 mb-8">
          {data?.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              {link.icon_url ? (
                <img 
                  src={link.icon_url} 
                  alt={link.platform} 
                  className="w-8 h-8 object-contain filter invert opacity-70 hover:opacity-100"
                />
              ) : (
                <span className="text-3xl grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all">
                  {internalIcons[link.platform.toLowerCase()] || '🔗'}
                </span>
              )}
            </a>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} <span className="text-white font-medium">Luis Solarte. Todos los derechos reservados.</span> • 
            <span className="ml-2 text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20">
             Diseñado & Desarrollado con ❤️ desde LATAM usando <span className="text-blue-400">Next.js</span> y <span className="text-blue-400">OCI</span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}