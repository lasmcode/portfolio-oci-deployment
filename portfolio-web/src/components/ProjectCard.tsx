import { Project } from '@/lib/types';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Separamos las tecnologías de forma segura
  const technologies = project.technologies 
    ? project.technologies.split(',').map(t => t.trim()) 
    : [];

  return (
    <div className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 flex flex-col h-full">
      {/* Contenedor de Imagen Optimizado */}
      <div className="relative h-52 w-full overflow-hidden bg-gray-800">
        <Image
          src={project.image_url || '/images/projects/placeholder.jpg'}
          alt={`Thumbnail de ${project.name}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
          {project.name}
        </h3>

        <p className="text-gray-400 mb-6 flex-grow leading-relaxed">
          {project.description}
        </p>

        {/* Badges de tecnologías */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-lg text-xs font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Enlaces con seguridad rel="noopener noreferrer" */}
        <div className="flex gap-6 pt-4 border-t border-gray-800">
          {project.github_link && (
            <a
              href={project.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-bold text-white hover:text-blue-400 transition-colors"
            >
              GitHub <span>↗</span>
            </a>
          )}
          {project.demo_link && (
            <a
              href={project.demo_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              Demo en vivo <span>↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}