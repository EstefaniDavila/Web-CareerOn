import React from "react";
import { useNavigate } from "react-router-dom";
import OffersList from "./OffersList";
import OfferForm from "./OfferForm";
import DeleteConfirmModal from "./DeleteConfirmModal";

const OffersRightPanel = ({ view, selectedOffer, onViewChange, onEdit, onDeletePick }) => {
  const navigate = useNavigate();
  return (
    <div className="flex-1 bg-[#F3F3F3] rounded-xl p-5 min-w-0">
      {view === "list" && (
        <OffersList
          onEdit={onEdit}
          onDeletePick={onDeletePick}
        />
      )}

      {view === "create" && (
        <OfferForm
          mode="create"
          onBack={() => navigate("/recruiter/dashboard")}
        />
      )}

      {view === "edit" && (
        <OfferForm
          mode="edit"
          offer={selectedOffer}
          onBack={() => navigate("/recruiter/dashboard")}
        />
      )}

      {view === "delete-confirm" && (
        <DeleteConfirmModal
          offer={selectedOffer}
          onCancel={() => navigate("/recruiter/dashboard")}
          onConfirm={() => {
            console.log("Eliminar oferta:", selectedOffer?.id);
            navigate("/recruiter/dashboard");
          }}
        />
      )}
    </div>
  );
};

export default OffersRightPanel;
