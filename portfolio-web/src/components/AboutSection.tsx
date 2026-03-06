import { User } from '@/lib/types';
import { PERSONAL_QUOTE, SECTIONS, SECTION_TITLES } from '@/utils/constants';
import TechGrid from '@/components/TechGrid'; // Importación limpia desde components

interface AboutSectionProps {
  data: User;
}

export default function AboutSection({ data }: AboutSectionProps) {

  if (!data) return null;

  return (
    <section id={SECTIONS.ABOUT} className="py-20 px-6 rounded-3xl shadow-lg" style={{ background: 'rgba(30,41,59,0.7)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>{SECTION_TITLES.ABOUT}</h2>
          <div className="h-1 w-20 rounded" style={{ background: 'var(--primary)' }}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

          <div className="md:col-span-2">
            <p className="text-lg leading-relaxed mb-6 whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>
              {data.about}
            </p>

            <p className="text-lg leading-relaxed italic border-l-4 pl-4 font-headings" style={{ color: 'var(--accent)', borderColor: 'var(--primary)', fontFamily: 'var(--font-headings)'}}>
              "{PERSONAL_QUOTE}"
            </p>
          </div>

          {/* Elemento Visual: Bento Grid Tecnológico */}
          <div className="flex justify-center relative">
            <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-2xl border border-slate-700/50 flex items-center justify-center overflow-hidden transform rotate-2 hover:rotate-0 transition-all duration-500">
                <TechGrid />
            </div>
            {/* Glow decorativo de fondo */}
            <div className="absolute -z-10 w-48 h-48 blur-[80px] rounded-full -top-10 -right-10" 
                 style={{ background: 'var(--primary)', opacity: 0.15 }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}