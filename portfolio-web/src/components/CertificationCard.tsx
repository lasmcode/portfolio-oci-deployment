import { Certification } from '@/lib/types';
import Image from 'next/image';

interface Props {
  cert: Certification;
}

export default function CertificationCard({ cert }: Props) {
  return (
    <div className="group p-5 rounded-3xl flex items-center gap-6 transition-all duration-300 border shadow-md" style={{ background: 'rgba(30,41,59,0.7)', borderColor: 'var(--panel)' }}>
      {/* Contenedor de la Insignia */}
      <div className="relative w-20 h-20 flex-shrink-0" style={{ background: 'var(--panel)' }}>
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
        <h3 className="font-bold leading-tight group-hover:text-[var(--primary)] transition-colors" style={{ color: 'var(--foreground)' }}>
          {cert.name}
        </h3>

        <a
          href={cert.url_file}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono flex items-center gap-1 transition-colors"
          style={{ color: 'var(--primary)' }}
        >
          VERIFICAR CREDENCIAL
          <span className="text-[10px]">↗</span>
        </a>
      </div>
    </div>
  );
}
