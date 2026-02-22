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
    <section id={SECTIONS.PROJECTS} className="py-20 px-6 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">Proyectos Destacados</h2>
          <div className="h-1 w-20 bg-blue-500 rounded"></div>
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