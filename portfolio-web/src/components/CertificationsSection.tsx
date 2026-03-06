import CertificationCard from './CertificationCard';
import { SECTIONS, SECTION_TITLES } from '@/utils/constants';

interface CertificationsSectionProps {
  data: any[];
}

export default function CertificationsSection({ data }: CertificationsSectionProps) {
  if (!data || data.length === 0) return null;

  return (
    <section id={SECTIONS.CERTIFICATIONS} className="py-20 px-6 rounded-3xl shadow-lg" style={{ background: 'rgba(30,41,59,0.7)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>{SECTION_TITLES.CERTIFICATIONS}</h2>
          <div className="h-1 w-20 rounded" style={{ background: 'var(--primary)' }}></div>
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
