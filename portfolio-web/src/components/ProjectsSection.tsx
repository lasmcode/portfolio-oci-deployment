import { Project } from '@/lib/types';
import ProjectCard from './ProjectCard';
import { SECTIONS } from '@/utils/constants';

interface ProjectsSectionProps {
  data: Project[];
}

export default function ProjectsSection({ data }: ProjectsSectionProps) {
  // Si no hay proyectos, no renderizamos la sección (Resiliencia)
  if (!data || data.length === 0) return null;

  return (
    <section id={SECTIONS.PROJECTS} className="py-20 px-6 rounded-3xl shadow-lg" style={{ background: 'rgba(30,41,59,0.7)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Proyectos Destacados</h2>
          <div className="h-1 w-20 rounded" style={{ background: 'var(--primary)' }}></div>
        </div>
        
        {/* Grid optimizado: 1 columna en móvil, 2 en tablets/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((project, index) => (
            <ProjectCard key={project.id || index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}