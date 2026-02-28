import { User } from '@/lib/types';
import { SECTIONS } from '@/utils/constants';

interface AboutSectionProps {
  data: User;
}

export default function AboutSection({ data }: AboutSectionProps) {

  if (!data) return null;

  return (
    <section id={SECTIONS.ABOUT} className="py-20 px-6 rounded-3xl shadow-lg" style={{ background: 'rgba(30,41,59,0.7)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Sobre Mí</h2>
          <div className="h-1 w-20 rounded" style={{ background: 'var(--primary)' }}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

          <div className="md:col-span-2">

            <p className="text-lg leading-relaxed mb-6 whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>
              {data.about}
            </p>

            <p className="text-md leading-relaxed italic border-l-4 pl-4" style={{ color: 'var(--accent)', borderColor: 'var(--primary)' }}>
              "Mi enfoque es crear experiencias digitales escalables, seguras y
              optimizadas, aprovechando el poder de la nube y las bases de datos modernas."
            </p>
          </div>

          {/* Elemento Visual / Decorativo */}
          <div className="flex justify-center relative">
            <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] p-1 transform rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl">
              <div className="w-full h-full rounded-2xl flex items-center justify-center overflow-hidden border-2" style={{ background: 'var(--card)', borderColor: 'var(--panel)' }}>
                 <span className="text-6xl" role="img" aria-label="developer">👨‍💻</span>
              </div>
            </div>
            {/* Glow decorativo de fondo */}
            <div className="absolute -z-10 w-32 h-32 blur-3xl rounded-full -top-4 -right-4" style={{ background: 'var(--primary)', opacity: 0.2 }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
