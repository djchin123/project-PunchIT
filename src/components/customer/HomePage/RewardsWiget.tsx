// RewardsWiget.tsx  – mini-summary + shortcut to Scan
import { useNavigate } from 'react-router-dom';
import '../../../styles/customer/home/RewardsWiget.css';

interface Props {
  stamps: number;
  tier:   string;
}

const RewardsWidget = ({ stamps, tier }: Props) => {
  const navigate = useNavigate();

  const msg =
    stamps === 0
      ? 'Take more photos to earn stamps.'
      : `Only ${12 - stamps} more to fill your card!`;

  return (
    <div className="rewards-widget">
      <h1 className="section-title">Rewards Snapshot</h1>

      <div className="rewards-row">
        <div>
          <p style={{ fontWeight: 600 }}>{tier} tier · {stamps} stamp{stamps!==1?'s':''}</p>
          <p className="subtext">{msg}</p>
        </div>
        <button onClick={() => navigate('/customer/scan')}>Scan now</button>
      </div>
    </div>
  );
};

export default RewardsWidget;
