import { Certification } from '@/lib/types';
import Image from 'next/image';

interface Props {
  cert: Certification;
}

export default function CertificationCard({ cert }: Props) {
  return (
    <div className="group bg-gray-900/40 border border-gray-800 p-5 rounded-2xl flex items-center gap-6 hover:border-blue-500/50 transition-all duration-300">
      {/* Contenedor de la Insignia */}
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={cert.badge_url || '/images/certs/generic-cert.png'}
          alt={cert.name}
          fill
          className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
          sizes="80px"
        />
      </div>

      {/* Texto y Link */}
      <div className="flex flex-col gap-2">
        <h3 className="text-white font-bold leading-tight group-hover:text-blue-400 transition-colors">
          {cert.name}
        </h3>
        
        <a 
          href={cert.url_file}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-gray-500 flex items-center gap-1 hover:text-white"
        >
          VERIFICAR CREDENCIAL 
          <span className="text-[10px]">↗</span>
        </a>
      </div>
    </div>
  );
}