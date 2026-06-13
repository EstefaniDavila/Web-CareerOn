import React from "react";

const DeleteConfirmModal = ({ offer, onCancel, onConfirm }) => {
  if (!offer) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-icon">🗑</div>

        <div className="modal-heading">¿Eliminar esta oferta?</div>

        <div className="modal-body">
          Estás a punto de eliminar{" "}
          <span className="modal-offer-name">"{offer.title}"</span>.
          Esta acción no se puede deshacer y se perderán todos los
          postulantes asociados.
        </div>

        {offer.applicants > 0 && (
          <div className="modal-warning">
            ⚠ Esta oferta tiene <strong>{offer.applicants} postulante{offer.applicants !== 1 ? "s" : ""}</strong> activos.
          </div>
        )}

        <div className="modal-actions">
          <button className="btn" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
