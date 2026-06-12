import { useMsal } from "@azure/msal-react";
import { ShieldCheck } from "lucide-react";

export default function Dashboard() {
  const { accounts } = useMsal();

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-[var(--color-brand-surface)] w-full">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-[var(--color-brand-primary)] w-16 h-16 rounded-full flex items-center justify-center shadow-md">
          <ShieldCheck className="text-white w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-brand-text)]">Tu Career Score</h1>
          <p className="text-[var(--color-brand-subtext)]">Bienvenido de vuelta, {accounts[0]?.name?.split(' ')[0]}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card de Score */}
        <div className="bg-[var(--color-brand-bg)] p-6 rounded-xl border border-gray-100 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-[var(--color-brand-subtext)] mb-2">Puntaje Actual</h3>
          <span className="text-5xl font-bold text-[var(--color-brand-primary)]">--<span className="text-2xl text-gray-400">/100</span></span>
          <p className="text-sm text-[var(--color-brand-accent)] mt-3 font-medium">Falta analizar tu CV</p>
        </div>

        {/* Card Placeholder */}
        <div className="md:col-span-2 bg-[var(--color-brand-bg)] p-6 rounded-xl border border-gray-100 flex items-center justify-center">
          <p className="text-[var(--color-brand-subtext)] text-center">Aquí irán las misiones y el breakdown del CV. ¡Prepárate para conectar Claude!</p>
        </div>
      </div>
    </div>
  );
}
