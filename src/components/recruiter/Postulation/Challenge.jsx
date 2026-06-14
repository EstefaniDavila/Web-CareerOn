import React, { useState, useEffect } from "react";
import useCrud from "../../../hooks/useCrud";
import ChallengeAIModal from "./ChallengeAIModal";

export default function Challenge({ offer, applicants = [] }) {
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [sponsoredChallenges, setSponsoredChallenges] = useState([]);

  const { getModel } = useCrud("");

  const fetchSponsoredChallenges = async () => {
    if (offer?.id) {
      try {
        const result = await getModel(`/api/recruiter/jobs/${offer.id}/sponsored_challenges`);
        if (result && result.challenges) {
          setSponsoredChallenges(result.challenges);
        }
      } catch (error) {
        console.error("Error fetching sponsored challenges:", error);
      }
    }
  };

  useEffect(() => {
    fetchSponsoredChallenges();
  }, [offer?.id]);

  const handleChallengeSponsored = () => {
    fetchSponsoredChallenges();
  };

  return (
    <div className="sticky top-6">
      <div className="bg-white rounded-3xl shadow-md p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-[#1C6B72] text-white rounded-xl p-2 text-xl">🏆</div>
          <div>
            <h3 className="font-bold text-lg">Challenge</h3>
            <p className="text-xs text-gray-500">Evalúa el talento</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-5">
          Asigna un reto a tus postulantes para conocer sus habilidades ocultas y evaluar su desempeño antes de la entrevista.
        </p>

        <button 
          onClick={() => setShowChallengeModal(true)}
          className="w-full bg-[#1C6B72] hover:bg-[#155359] text-white py-2 rounded-xl font-bold mb-4 transition"
        >
          + Nuevo reto con IA ✨
        </button>

        <div className="space-y-3">
          {sponsoredChallenges.map((sc) => (
            <div key={sc.sponsored_id} className="border border-[#1C6B72] text-[#1C6B72] bg-[#f0f9fa] rounded-xl p-3 flex justify-between items-center text-sm font-semibold">
              <span className="truncate pr-2">Reto: {sc.title}</span>
              <span className="bg-white px-2 py-0.5 rounded-md shadow-sm shrink-0">{sc.max_winners} cupos</span>
            </div>
          ))}

          {sponsoredChallenges.length === 0 && (
            <>
              <div className="border border-dashed border-gray-300 rounded-xl p-3 text-center text-gray-400 text-sm">
                + Reto disponible
              </div>
              <div className="border border-dashed border-gray-300 rounded-xl p-3 text-center text-gray-400 text-sm">
                + Reto disponible
              </div>
            </>
          )}
        </div>
      </div>

      {showChallengeModal && (
        <ChallengeAIModal 
          offer={offer}
          applicants={applicants}
          onClose={() => setShowChallengeModal(false)} 
          onChallengeSponsored={handleChallengeSponsored}
        />
      )}
    </div>
  );
}
