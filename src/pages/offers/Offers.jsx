import { useState } from "react";
import OffersLeftMenu from "../../components/OffersLeftMenu";
import OffersRightPanel from "../../components/OffersRightPanel";

export default function Offers() {
  const [view, setView] = useState("list");
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleEdit = (offer) => {
    setSelectedOffer(offer);
    setView("edit");
  };

  const handleDeletePick = (offer) => {
    setSelectedOffer(offer);
    setView("delete-confirm");
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex gap-6 w-full items-start justify-center">
        <OffersLeftMenu activeView={view} onViewChange={setView} />
        <OffersRightPanel
          view={view}
          selectedOffer={selectedOffer}
          onViewChange={setView}
          onEdit={handleEdit}
          onDeletePick={handleDeletePick}
        />
      </div>
    </div>
  );
}