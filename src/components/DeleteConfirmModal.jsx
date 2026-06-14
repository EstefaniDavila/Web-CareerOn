import React, { useState } from "react";
import useCrud from "../hooks/useCrud";

const DeleteConfirmModal = ({ offer, onCancel, onConfirm }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { deleteModel } = useCrud("/api/recruiter/jobs");

  if (!offer) return null;

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteModel(`/api/recruiter/jobs/${offer.id}`);
      onConfirm();
    } catch (err) {
      setError("No se pudo eliminar la oferta. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-16 px-4">
      <div className="bg-white rounded-2xl p-7 w-full max-w-sm shadow-sm border border-gray-100">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4 text-2xl">
          🗑
        </div>
        <p className="text-[15px] font-medium text-[#1C1C1C] mb-2">
          ¿Eliminar esta oferta?
        </p>
        <p className="text-sm text-[#5F6368] leading-relaxed mb-3">
          Estás a punto de eliminar{" "}
          <span className="font-medium text-[#1C1C1C]">"{offer.title}"</span>.
          Esta acción no se puede deshacer y se perderán todos los postulantes asociados.
        </p>

        {offer.applicants_count > 0 && (
          <div className="bg-amber-50 text-amber-800 text-xs rounded-lg px-3 py-2 mb-4">
            ⚠ Esta oferta tiene{" "}
            <strong>{offer.applicants_count} postulante{offer.applicants_count !== 1 ? "s" : ""}</strong> activos.
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-700 text-xs rounded-lg px-3 py-2 mb-4">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            disabled={loading}
            className="h-9 px-4 rounded-lg border border-gray-200 bg-white text-sm text-[#5F6368] hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="h-9 px-4 rounded-lg bg-[#F25F63] text-sm text-white hover:bg-[#d94f53] transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Eliminando...
              </>
            ) : (
              "Sí, eliminar"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;