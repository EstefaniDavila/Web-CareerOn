import React from 'react';
import './RecruiterCentral.css';
import { useNavigate } from "react-router-dom";
import OffersList from '../OffersList';

const RecruiterCentral = () => {
  const navigate = useNavigate();

  const handleEdit = (offer) => {
    navigate('/offers', { state: { view: 'edit', selectedOffer: offer } });
  };

  const handleDeletePick = (offer) => {
    navigate('/offers', { state: { view: 'delete-confirm', selectedOffer: offer } });
  };

  return (
    <div className="recruiter-central">

      <div className="glass-card jobs-published-card" style={{ padding: '24px' }}>
        <div className="card-header-flex" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#1C1C1C' }}>OFERTAS PUBLICADAS</h3>
          <button
            className="add-offer-btn"
            style={{ backgroundColor: '#1D9E75', color: 'white', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600' }}
            onClick={() => navigate('/offers', { state: { view: 'create' } })}>
            + Nueva oferta
          </button>
        </div>
<<<<<<< HEAD
        <OffersList
  onEdit={(offer) => navigate('/offers', { state: { view: 'edit', offer } })}
  onDeletePick={(offer) => navigate('/offers', { state: { view: 'delete-confirm', offer } })}
/>
=======
        <OffersList onEdit={handleEdit} onDeletePick={handleDeletePick} />
>>>>>>> master
      </div>
    </div>
  );
};

export default RecruiterCentral;
