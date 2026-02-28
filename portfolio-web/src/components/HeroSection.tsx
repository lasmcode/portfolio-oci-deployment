import { User } from '@/lib/types';
import { SECTIONS } from '@/utils/constants';

interface HeroSectionProps {
  data: User;
}

const SHOW_CONTACT_BUTTON = false;

export default function HeroSection({ data }: HeroSectionProps) {

  if (!data) return null;

  return (
    <section
      id={SECTIONS.HOME}
      className="min-h-[70vh] flex flex-col items-center justify-center px-6 pt-20 rounded-3xl shadow-lg"
      style={{ background: 'rgba(30,41,59,0.7)' }}
    >
      <div className="text-center max-w-3xl">

        <div className="mb-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] p-1">
            <div className="w-full h-full rounded-full flex items-center justify-center border-2" style={{ background: 'var(--panel)', borderColor: 'var(--card)' }}>
              <span className="text-4xl text-white" role="img" aria-label="user">👤</span>
            </div>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight" style={{ color: 'var(--primary)' }}>
          {data.name}
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ color: 'var(--secondary)' }}>
          {data.professional_title}
        </h2>

        <p className="text-lg mb-8 leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          {data.about}
        </p>

        {data.location && (
          <p className="mb-8 flex items-center justify-center gap-2" style={{ color: 'var(--accent)' }}>
            <span>📍</span> {data.location}
          </p>
        )}

        {SHOW_CONTACT_BUTTON && (
          <button
            className="px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105"
            style={{ background: 'var(--primary)', color: 'var(--foreground)' }}
          >
            Contáctame
          </button>
        )}
      </div>
    </section>
  );
}
