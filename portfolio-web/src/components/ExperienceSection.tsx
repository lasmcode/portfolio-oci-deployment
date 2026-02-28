import { Experience } from '@/lib/types';
import ExperienceCard from './ExperienceCard';
import { SECTIONS } from '@/utils/constants';

interface ExperienceSectionProps {
  data: Experience[];
}

export default function ExperienceSection({ data }: ExperienceSectionProps) {

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section id={SECTIONS.EXPERIENCE} className="py-20 px-6 rounded-3xl shadow-lg" style={{ background: 'rgba(30,41,59,0.7)' }}>
      <div className="mb-12">
        <h2 className="text-4xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Experiencia Laboral</h2>
        <div className="h-1 w-20 rounded" style={{ background: 'var(--primary)' }}></div>
      </div>

      <div className="relative border-l-2 ml-3" style={{ borderColor: 'var(--card)' }}>
        {data.map((exp, index) => (
          <ExperienceCard key={exp.id || index} experience={exp} />
        ))}
      </div>
    </section>
  );
}
