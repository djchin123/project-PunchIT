import LoyaltyCard from '../../../components/business/LoyaltyCard';
import LoyaltyStats from '../../../components/business/LoyaltyStats';
import BusinessInfo from '../../../components/business/BusinessInfo';
import '../../../styles/business/Home.css';

const BusinessHome = () => {
  // Temporary mock data (we will replace this with actual API calls later)
  const businessName = "Memory Shop";
  const activeCards = 548;

  return (
    <div className="business-home">
      {/* Business Name Display */}
      <h1 className="greeting">{businessName}</h1>
      <p>Welcome back! Here is your business overview:</p>

      {/* Loyalty Card Placeholder */}
      <LoyaltyCard />

      {/* Active Cards Counter */}
      <LoyaltyStats activeCards={activeCards} />

      {/* Business Info */}
      <BusinessInfo />
    </div>
  );
};

export default BusinessHome;
