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
    <section id={SECTIONS.EXPERIENCE} className="py-20 px-6 max-w-4xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-white mb-2">Experiencia Laboral</h2>
        <div className="h-1 w-20 bg-blue-500 rounded"></div>
      </div>

      <div className="relative border-l-2 border-gray-800 ml-3">
        {data.map((exp, index) => (
          <ExperienceCard key={exp.id || index} experience={exp} />
        ))}
      </div>
    </section>
  );
}