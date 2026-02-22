import { Experience } from '@/lib/types';

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  /**
   * Formatea una fecha string o Date a formato legible.
   * Usamos 'UTC' para evitar que la zona horaria del servidor cambie la fecha un día antes/después.
   */
  const formatDate = (date: Date | string) => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    return dateObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      timeZone: 'UTC' 
    });
  };

  const startDate = formatDate(experience.start_date);
  const endDate = experience.end_date ? formatDate(experience.end_date) : 'Presente';

  return (
    <div className="relative pl-8 pb-12 last:pb-0">
      {/* El "punto" de la línea de tiempo */}
      <div className="absolute -left-[9px] top-1 w-4 h-4 bg-blue-500 rounded-full border-4 border-black"></div>

      <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-colors">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
          <div>
            <h3 className="text-2xl font-bold text-white">
              {experience.job_title}
            </h3>
            <p className="text-blue-400 font-medium text-lg">
              {experience.enterprise}
            </p>
          </div>
          <span className="text-sm font-mono text-gray-500 bg-gray-800 px-3 py-1 rounded-full whitespace-nowrap">
            {startDate} — {endDate}
          </span>
        </div>

        <p className="text-gray-400 leading-relaxed whitespace-pre-line">
          {experience.description}
        </p>
      </div>
    </div>
  );
}