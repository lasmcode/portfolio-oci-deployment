import CertificationCard from './CertificationCard';
import { SECTIONS } from '@/utils/constants';

interface CertificationsSectionProps {
  data: any[]; 
}

export default function CertificationsSection({ data }: CertificationsSectionProps) {
  if (!data || data.length === 0) return null;

  return (
    <section id="certifications" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">Certificaciones</h2>
          <div className="h-1 w-20 bg-blue-500 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((cert, index) => (
            <CertificationCard key={index} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}