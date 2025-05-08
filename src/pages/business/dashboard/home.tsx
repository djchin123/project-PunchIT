import LoyaltyStats from '../../../components/business/LoyaltyStats';
import BusinessInfo from '../../../components/business/BusinessInfo';
import EditCardModal from '../../../components/business/EditCardModal';
import Home from '../../../pages/customer/home';
import '../../../styles/business/Home.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const BusinessHome = () => {
  const businessName = "Memory Shop";
  const activeCards = 548;
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();


  return (
    <div className="business-home">
      <h1 className="greeting">{businessName}</h1>
      <p>Welcome back! Here is your business overview:</p>

      {/* Active Cards Counter */}
      <LoyaltyStats activeCards={activeCards} />

      {/* Stamp Card Design Section */}
      <div className="stamp-card-design">
        <h3>Your Stamp Card Design(Customer View)</h3>

        {/* Actual Preview of Customer Home */}
        <div className="card-preview">
          <Home />
        </div>

        {/* Link and Actions */}
        <div className="link-section">
          <p>memoryshop.com/loyalty</p>

          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Card
          </button>
        </div>
      </div>
      {/* Business Info and Account Button */}
      <div className="business-info-container">
        <BusinessInfo />
        <button
          className="account-button"
          onClick={() => navigate('/business/account')}
        >
          Account Settings
        </button>
      </div>


      {/* Modal Window */}
      <EditCardModal isOpen={isEditing} onClose={() => setIsEditing(false)} />
    </div>
  );
};

export default BusinessHome;
