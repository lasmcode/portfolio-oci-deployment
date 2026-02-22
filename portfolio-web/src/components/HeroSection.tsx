import { User } from '@/lib/types';
import { SECTIONS } from '@/utils/constants';

interface HeroSectionProps {
  data: User;
}

const SHOW_CONTACT_BUTTON = false;

export default function HeroSection({ data }: HeroSectionProps) {

  if (!data) return null;

  return (
    <section 
      id={SECTIONS.HOME} 
      className="min-h-[70vh] flex flex-col items-center justify-center bg-black px-6 pt-20"
    >
      <div className="text-center max-w-3xl">
      
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
            <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center border-2 border-black">
              <span className="text-4xl text-white" role="img" aria-label="user">👤</span>
            </div>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          {data.name}
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold text-blue-400 mb-6">
          {data.professional_title}
        </h2>

        <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
          {data.about}
        </p>

        {data.location && (
          <p className="text-gray-400 mb-8 flex items-center justify-center gap-2">
            <span>📍</span> {data.location}
          </p>
        )}

        {SHOW_CONTACT_BUTTON && (
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105">
            Contáctame
          </button>
        )}
      </div>
    </section>
  );
}