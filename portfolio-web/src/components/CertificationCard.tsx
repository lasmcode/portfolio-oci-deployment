import { Certification } from '@/lib/types';
import Image from 'next/image';

interface Props {
  cert: Certification;
}

export default function CertificationCard({ cert }: Props) {
  return (
    <div 
      className="group p-3 rounded-3xl flex items-center gap-2 transition-all duration-500 border shadow-md hover:shadow-2xl hover:-translate-y-1" 
      style={{ 
        background: 'rgba(30, 41, 59, 0.7)', 
        borderColor: 'var(--panel)',
        backdropFilter: 'blur(10px)' 
      }}
    >
      {/* Badge Visual Area: 
          Increased to 140px (w-36) to make the OCI badge the main focus.
          Removed internal paddings to let the image touch the edges.
      */}
      <div className="relative w-36 h-36 flex-shrink-0 flex items-center justify-center overflow-hidden">
        {/* Radial glow that activates on hover */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-2xl"
             style={{ background: 'var(--primary)' }}></div>
        
        <Image
          src={cert.badge_url?.trim() || '/images/certs/generic-cert.png'}
          alt={cert.name}
          width={130} // Large scale for high detail visibility
          height={130}
          className="object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0 grayscale-[0.1]"
        />
      </div>

      {/* Main Content Area:
          Adjusted padding and font sizes to accommodate the larger image.
      */}
      <div className="flex flex-col gap-1 py-2 pr-4 flex-1">
        <p className="text-[10px] font-black uppercase tracking-[0.15em] opacity-40" style={{ color: 'var(--primary)' }}>
          {cert.organization || 'OFFICIAL CERTIFICATION'}
        </p>
        
        <h3 
          className="font-extrabold text-lg md:text-xl leading-tight group-hover:text-[var(--primary)] transition-colors duration-300" 
          style={{ color: 'var(--foreground)' }}
        >
          {cert.name}
        </h3>

        <a
          href={cert.url_file}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[11px] font-bold mt-3 transition-all duration-300 hover:opacity-70"
          style={{ color: 'var(--primary)' }}
        >
          VERIFY CREDENTIAL
          <span className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
        </a>
      </div>
    </div>
  );
}