
import { executeQuerySingle } from '@/lib/db';
import { PORTFOLIO_QUERY, MOCK_DATA, APP_CONFIG } from '@/utils/constantsServer';
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection"; 
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default async function Home() {
  let data;
  let isDemo = false;

  try {
    const result = await executeQuerySingle<{ FULL_DATA: string }>(
      PORTFOLIO_QUERY,
      [APP_CONFIG.USER_ID]
    );

    // Oracle retorna el JSON como un string en la columna FULL_DATA
    data = result?.FULL_DATA ? JSON.parse(result.FULL_DATA) : null;
    
    if (!data) throw new Error("Empty data");
  } catch (error) {
    console.error("OCI Connection failed:", error);
    data = MOCK_DATA;
    isDemo = true;
  }

  return (
    <div className="flex flex-col gap-24 pb-20">
      {isDemo && (
        <div className="bg-amber-500/10 border border-amber-500/50 text-amber-500 px-4 py-3 rounded-xl text-center mt-8 animate-pulse">
          ⚠️ Modo Offline: Mostrando datos de respaldo.
        </div>
      )}

      {/* Repartimos la data unificada a cada componente */}
      <HeroSection data={data.user} />     

      <ExperienceSection data={data.experiences} />

      <ProjectsSection data={data.projects} />

      <CertificationsSection data={data.certifications} />

      <AboutSection data={data.user} />

      <Footer data={data.social_links} />
    </div>
  );
}

