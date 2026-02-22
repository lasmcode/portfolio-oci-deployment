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
      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4" style={{ background: 'var(--primary)', borderColor: 'var(--panel)' }}></div>

      <div className="p-6 rounded-3xl border shadow-md transition-colors" style={{ background: 'rgba(30,41,59,0.7)', borderColor: 'var(--panel)' }}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
          <div>
            <h3 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
              {experience.job_title}
            </h3>
            <p className="font-medium text-lg" style={{ color: 'var(--primary)' }}>
              {experience.enterprise}
            </p>
          </div>
          <span className="text-sm font-mono px-3 py-1 rounded-full whitespace-nowrap" style={{ background: 'var(--panel)', color: 'var(--text-secondary)' }}>
            {startDate} — {endDate}
          </span>
        </div>

        <p className="leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>
          {experience.description}
        </p>
      </div>
    </div>
  );
}