import React from "react";

const DeleteConfirmModal = ({ offer, onCancel, onConfirm }) => {
  if (!offer) return null;

  return (
    <div className="flex items-center justify-center py-16 px-4">
      <div className="bg-white rounded-2xl p-7 w-full max-w-sm shadow-sm border border-gray-100">

        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4 text-2xl">
          🗑
        </div>

        {/* Heading */}
        <p className="text-[15px] font-medium text-[#1C1C1C] mb-2">
          ¿Eliminar esta oferta?
        </p>

        {/* Body */}
        <p className="text-sm text-[#5F6368] leading-relaxed mb-3">
          Estás a punto de eliminar{" "}
          <span className="font-medium text-[#1C1C1C]">"{offer.title}"</span>.
          Esta acción no se puede deshacer y se perderán todos los postulantes asociados.
        </p>

        {/* Warning si tiene postulantes */}
        {offer.applicants > 0 && (
          <div className="bg-amber-50 text-amber-800 text-xs rounded-lg px-3 py-2 mb-5">
            ⚠ Esta oferta tiene{" "}
            <strong>{offer.applicants} postulante{offer.applicants !== 1 ? "s" : ""}</strong> activos.
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="h-9 px-4 rounded-lg border border-gray-200 bg-white text-sm text-[#5F6368] hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="h-9 px-4 rounded-lg bg-[#ED7B32] text-sm text-white hover:bg-[#d94f53] transition-colors"
          >
            Sí, eliminar
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteConfirmModal;
