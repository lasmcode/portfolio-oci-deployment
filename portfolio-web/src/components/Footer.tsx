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
    <footer className="border-t py-12 px-6 rounded-3xl shadow-lg" style={{ background: 'rgba(30,41,59,0.7)', borderColor: 'var(--panel)' }}>
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
                <span className="text-3xl grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all" style={{ color: 'var(--primary)' }}>
                  {internalIcons[link.platform.toLowerCase()] || '🔗'}
                </span>
              )}
            </a>
          ))}
        </div>

        <div className="text-center flex flex-col items-center gap-2">
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            © {currentYear} <span className="font-medium" style={{ color: 'var(--foreground)' }}>Luis Solarte. All rights reserved.</span>
          </span>
          <span className="text-[10px] px-2 py-1 rounded border mt-1" style={{ background: 'var(--panel)', color: 'var(--primary)', borderColor: 'var(--primary)' }}>
            Designed & Developed with ❤️ from LATAM using <span style={{ color: 'var(--primary)' }}>Next.js</span> and <span style={{ color: 'var(--primary)' }}>OCI</span>
          </span>
        </div>
      </div>
    </footer>
  );
}