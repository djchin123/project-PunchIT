import '../../styles/business/LoyaltyCard.css';

const LoyaltyCard = () => {
  return (
    <div className="loyalty-card">
      <h3>Your Stamp Card Design</h3>
      <a href="https://memoryshop.com/loyalty" target="_blank" rel="noreferrer">
        memoryshop.com/loyalty
      </a>
      <div className="card-options">
        <button>Copy Link For Customers</button>
        <button>Save QR For Sharing</button>
      </div>
    </div>
  );
};

export default LoyaltyCard;
