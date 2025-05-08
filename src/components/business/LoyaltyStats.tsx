import '../../styles/business/LoyaltyStats.css';

interface LoyaltyStatsProps {
  activeCards: number;
}

const LoyaltyStats: React.FC<LoyaltyStatsProps> = ({ activeCards }) => {
  return (
    <div className="loyalty-stats">
      <h3>Active Members: {activeCards}</h3>
    </div>
  );
};

export default LoyaltyStats;
