import React, { useState, useEffect } from "react";
import useCrud from "../../../hooks/useCrud";

const TOKENS_PER_CHALLENGE = 10;

export default function ChallengeAIModal({ offer, applicants = [], onClose, onChallengeSponsored }) {
  const [loading, setLoading] = useState(false);
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [challengeData, setChallengeData] = useState(null);
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState('La Empresa');

  const [tokenBalance, setTokenBalance] = useState(null);
  const [maxWinners, setMaxWinners] = useState(1);

  const activeApplicants = applicants.filter((a) => a.status !== "rechazado").length;
  const totalCost = maxWinners * TOKENS_PER_CHALLENGE;
  const canAfford = tokenBalance !== null && tokenBalance >= totalCost;

  const { insertModel, getModel } = useCrud("");

  useEffect(() => {
    const fetchBalance = async () => {
      setLoadingBalance(true);
      try {
        const result = await getModel("/api/recruiter/dashboard");
        if (result?.recruiter_info) {
          if (result.recruiter_info.tokens_available !== undefined) {
            setTokenBalance(result.recruiter_info.tokens_available);
          } else {
            setTokenBalance(0);
          }
          if (result.recruiter_info.company_name) {
            setCompanyName(result.recruiter_info.company_name);
          }
        } else {
          setTokenBalance(0);
        }
      } catch {
        setTokenBalance(0);
      } finally {
        setLoadingBalance(false);
      }
    };
    fetchBalance();
  }, []);

  useEffect(() => {
    if (activeApplicants > 0) setMaxWinners(activeApplicants);
  }, [activeApplicants]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const url = `/api/recruiter/jobs/${offer.id}/generate_challenge`;
      const result = await insertModel({}, url);
      if (result.status === "success" && result.data) {
        setChallengeData(result.data);
        setStep(2);
      }
    } catch (error) {
      console.error("Error generando reto AI:", error);
      alert("Hubo un error al generar el reto. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleSponsor = async () => {
    if (!canAfford) return;
    setLoading(true);
    try {
      const url = `/api/recruiter/jobs/${offer.id}/sponsor_ai_challenge`;
      const body = {
        title: challengeData.title,
        description: challengeData.description,
        deliverables: challengeData.deliverables,
        reward_coins: challengeData.reward_coins,
        reward_xp: challengeData.reward_xp,
        max_winners: maxWinners,
        tokens_cost: totalCost
      };
      const result = await insertModel(body, url);
      if (result.status === "success") {
        localStorage.setItem('careeron_demo_challenge', 'true');
        localStorage.setItem('careeron_demo_job_title', offer.title || 'Diseñador UX/UI #1');
        localStorage.setItem('careeron_demo_company', companyName);
        localStorage.setItem('careeron_demo_desc', challengeData.description || '');
        localStorage.setItem('careeron_demo_deliverables', challengeData.deliverables || '');
        
        onChallengeSponsored();
        onClose();
      }
    } catch (error) {
      console.error("Error patrocinando reto AI:", error);
      alert(error.response?.data?.detail || "Hubo un error al patrocinar el reto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="bg-[#1C6B72] text-white p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-200 text-lg font-bold">
            ✕
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">✨</span>
              <div>
                <h2 className="text-xl font-bold">Generador de Retos AI</h2>
                <p className="text-sm opacity-90">Evalúa a tus postulantes con desafíos técnicos a medida</p>
              </div>
            </div>
            {/* Saldo de monedas */}
            <div className="bg-white/20 rounded-2xl px-4 py-2 text-center min-w-[80px]">
              {loadingBalance ? (
                <div className="text-lg font-bold animate-pulse">...</div>
              ) : (
                <div className="text-2xl font-bold">{tokenBalance}</div>
              )}
              <div className="text-xs opacity-80">🪙 monedas</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 1 ? (
            <div className="text-center py-6">
              {/* Info de postulantes */}
              <div className="flex justify-center gap-6 mb-6">
                <div className="bg-gray-50 rounded-2xl px-5 py-3 text-center">
                  <div className="text-2xl font-bold text-[#1C6B72]">{activeApplicants}</div>
                  <div className="text-xs text-gray-500">postulantes activos</div>
                </div>
                <div className="bg-[#fff8ee] rounded-2xl px-5 py-3 text-center border border-[#F5A844]/30">
                  <div className="text-2xl font-bold text-[#F5A844]">{activeApplicants * TOKENS_PER_CHALLENGE}</div>
                  <div className="text-xs text-gray-500">monedas estimadas</div>
                </div>
              </div>

              <p className="text-gray-600 mb-2">
                Tu Coach IA analizará la oferta <strong>{offer?.title}</strong> y generará un
                caso práctico realista para evaluar a los candidatos.
              </p>
              <p className="text-xs text-gray-400 mb-6">
                Costo: <strong className="text-[#F5A844]">{TOKENS_PER_CHALLENGE} monedas</strong> por cupo habilitado
              </p>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="bg-[#F5A844] hover:bg-[#e0983c] text-white px-8 py-3 rounded-xl font-bold text-lg transition disabled:opacity-50"
              >
                {loading ? "Generando con IA..." : "✨ Generar Reto ahora"}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <label className="block text-sm font-semibold text-gray-500 mb-1">Título del reto</label>
                <input
                  type="text"
                  value={challengeData?.title || ""}
                  onChange={(e) => setChallengeData({ ...challengeData, title: e.target.value })}
                  className="w-full font-bold text-lg bg-transparent outline-none border-b focus:border-[#1C6B72] pb-1"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <label className="block text-sm font-semibold text-gray-500 mb-1">Descripción y Problema</label>
                <textarea
                  value={challengeData?.description || ""}
                  onChange={(e) => setChallengeData({ ...challengeData, description: e.target.value })}
                  className="w-full text-gray-700 bg-transparent outline-none min-h-[90px] resize-y"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <label className="block text-sm font-semibold text-gray-500 mb-1">Entregables esperados</label>
                <input
                  type="text"
                  value={challengeData?.deliverables || ""}
                  onChange={(e) => setChallengeData({ ...challengeData, deliverables: e.target.value })}
                  className="w-full text-gray-700 bg-transparent outline-none border-b focus:border-[#1C6B72] pb-1"
                />
              </div>

              {/* Patrocinar */}
              <div className={`p-5 rounded-2xl border-2 ${canAfford ? "bg-[#f0f9fa] border-[#b2e0e5]" : "bg-red-50 border-red-200"}`}>
                <h3 className="font-bold text-[#1C6B72] mb-4">Patrocinar Reto</h3>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-sm font-semibold text-gray-700">Cupos habilitados</span>
                    <p className="text-xs text-gray-400">= postulantes que recibirán el reto</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMaxWinners(Math.max(1, maxWinners - 1))}
                      className="w-8 h-8 rounded-lg bg-white border font-bold text-gray-600 hover:bg-gray-50"
                    >−</button>
                    <span className="w-10 text-center font-bold text-lg">{maxWinners}</span>
                    <button
                      onClick={() => setMaxWinners(maxWinners + 1)}
                      className="w-8 h-8 rounded-lg bg-white border font-bold text-gray-600 hover:bg-gray-50"
                    >+</button>
                  </div>
                </div>

                {/* Desglose del costo */}
                <div className="bg-white rounded-xl p-3 space-y-2 text-sm mb-1">
                  <div className="flex justify-between text-gray-600">
                    <span>{maxWinners} cupos × {TOKENS_PER_CHALLENGE} monedas</span>
                    <span className="font-semibold">{totalCost} 🪙</span>
                  </div>
                  <div className="flex justify-between text-gray-600 border-t pt-2">
                    <span>Tu saldo actual</span>
                    <span className="font-semibold">{tokenBalance ?? "..."} 🪙</span>
                  </div>
                  <div className={`flex justify-between border-t pt-2 font-bold ${canAfford ? "text-[#1C6B72]" : "text-red-500"}`}>
                    <span>Saldo tras patrocinar</span>
                    <span>{tokenBalance !== null ? tokenBalance - totalCost : "..."} 🪙</span>
                  </div>
                </div>

                {!canAfford && (
                  <p className="text-xs text-red-500 mt-1 font-semibold">
                    ⚠️ Saldo insuficiente. Necesitas {totalCost} monedas, tienes {tokenBalance}.
                  </p>
                )}
              </div>

              <button
                onClick={handleSponsor}
                disabled={loading || !canAfford}
                className="w-full bg-[#1C6B72] hover:bg-[#155359] text-white py-3 rounded-xl font-bold transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? "Procesando..." : `Patrocinar por ${totalCost} monedas 🪙`}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

