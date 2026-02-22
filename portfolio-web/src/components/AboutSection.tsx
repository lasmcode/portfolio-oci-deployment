import { User } from '@/lib/types';
import { SECTIONS } from '@/utils/constants';

interface AboutSectionProps {
  data: User; 
}

export default function AboutSection({ data }: AboutSectionProps) {

  if (!data) return null;

  return (
    <section id={SECTIONS.ABOUT} className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">Sobre Mí</h2>
          <div className="h-1 w-20 bg-blue-500 rounded"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          
          <div className="md:col-span-2">
            
            <p className="text-gray-300 text-lg leading-relaxed mb-6 whitespace-pre-line">
              {data.about}
            </p>
            
            <p className="text-gray-400 text-md leading-relaxed italic border-l-4 border-blue-500 pl-4">
              "Mi enfoque es crear experiencias digitales escalables, seguras y 
              optimizadas, aprovechando el poder de la nube y las bases de datos modernas."
            </p>
          </div>

          {/* Elemento Visual / Decorativo */}
          <div className="flex justify-center relative">
            <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 p-1 transform rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl">
              <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center overflow-hidden border-2 border-black/50">
                 <span className="text-6xl" role="img" aria-label="developer">👨‍💻</span>
              </div>
            </div>
            {/* Glow decorativo de fondo */}
            <div className="absolute -z-10 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full -top-4 -right-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
}