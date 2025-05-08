import LoyaltyCard from '../../../components/business/LoyaltyCard';
import LoyaltyStats from '../../../components/business/LoyaltyStats';
import BusinessInfo from '../../../components/business/BusinessInfo';
import CardPreview from '../../../components/business/CardPreview';
import '../../../styles/business/Home.css';
import { useState } from 'react';

const BusinessHome = () => {
  // Temporary mock data (we will replace this with actual API calls later)
  const businessName = "Memory Shop";
  const activeCards = 548;
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="business-home">
      {/* Business Name Display */}
      <h1 className="greeting">{businessName}</h1>
      <p>Welcome back! Here is your business overview:</p>

      {/* Loyalty Card Section */}
      <LoyaltyCard />

      {/* Active Cards Counter */}
      <LoyaltyStats activeCards={activeCards} />

      {/* Business Info */}
      <BusinessInfo />

      {/* Card Preview */}
      <CardPreview />

      {/* Edit Button */}
      <div className="edit-button-container">
        <button className="edit-button" onClick={handleEditClick}>
          Edit Card
        </button>
      </div>

      {isEditing && <div className="edit-modal">Card Editing View Coming Soon...</div>}
    </div>
  );
};

export default BusinessHome;
