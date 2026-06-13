import React from "react";
import OffersList from "./OffersList";
import OfferForm from "./OfferForm";
import DeleteConfirmModal from "./DeleteConfirmModal";
import "./OffersRightPanel.css";

const OffersRightPanel = ({ view, selectedOffer, onViewChange, onEdit, onDeletePick }) => {
  return (
    <div className="offers-right-panel">
      {view === "list" && (
        <OffersList
          onEdit={onEdit}
          onDeletePick={onDeletePick}
        />
      )}

      {view === "create" && (
        <OfferForm
          mode="create"
          onBack={() => onViewChange("list")}
        />
      )}

      {view === "edit" && (
        <OfferForm
          mode="edit"
          offer={selectedOffer}
          onBack={() => onViewChange("list")}
        />
      )}

      {view === "delete-confirm" && (
        <DeleteConfirmModal
          offer={selectedOffer}
          onCancel={() => onViewChange("list")}
          onConfirm={() => {
            console.log("Eliminar oferta:", selectedOffer?.id);
            onViewChange("list");
          }}
        />
      )}
    </div>
  );
};

export default OffersRightPanel;
