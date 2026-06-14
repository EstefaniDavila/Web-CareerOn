import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import OffersLeftMenu from "../../components/OffersLeftMenu";
import OffersRightPanel from "../../components/OffersRightPanel";

export default function Offers() {
  const location = useLocation();
  const [view, setView] = useState(location.state?.view || "list");
  const [selectedOffer, setSelectedOffer] = useState(location.state?.offer || null);

  useEffect(() => {
    if (location.state?.view) {
      setView(location.state.view);
    }
    if (location.state?.selectedOffer) {
      setSelectedOffer(location.state.offer);
    }
  }, [location.state]);

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
        {view === "list" && <OffersLeftMenu activeView={view} onViewChange={setView} />}
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