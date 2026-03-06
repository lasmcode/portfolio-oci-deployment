import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({ subsets: ["latin"] });

export default function TechGrid() {
  const techs = [
    { name: 'OCI', color: 'from-orange-500/20', border: 'border-orange-500/50' },
    { name: 'Terraform', color: 'from-purple-500/20', border: 'border-purple-500/50' },
    { name: 'Kubernetes', color: 'from-blue-500/20', border: 'border-blue-500/50' },
    { name: 'Docker', color: 'from-cyan-500/20', border: 'border-cyan-500/50' },
    { name: 'Java', color: 'from-red-500/20', border: 'border-red-500/50' },
    { name: 'Node.js', color: 'from-green-500/20', border: 'border-green-500/50' },
  ];

  return (
    <div className={`grid grid-cols-2 gap-3 w-full max-w-[280px] ${geistMono.className}`}>
      {techs.map((tech) => (
        <div 
          key={tech.name}
          className={`flex items-center justify-center p-3 rounded-xl border bg-gradient-to-br ${tech.color} to-transparent ${tech.border} backdrop-blur-sm transition-transform hover:scale-105`}
        >
          <span className="text-xs font-bold tracking-tighter opacity-90">{tech.name}</span>
        </div>
      ))}
      {/* Bloque central de "Expertise" */}
      <div className="col-span-2 p-2 rounded-xl border border-slate-700 bg-slate-800/50 text-center">
        <span className="text-[10px] uppercase tracking-widest text-slate-400">Cloud Native Expert</span>
      </div>
    </div>
  );
}