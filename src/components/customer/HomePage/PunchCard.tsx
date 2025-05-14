// PunchCard.tsx  – visual loyalty card
import '../../../styles/customer/home/PunchCard.css';
import logo from '../../../assets/logo.png';

interface Props {
  total?:        number;   // default 12
  filled:        number;   // live stamp count
  customerName?: string;
  nextReward?:   string;
}

const PunchCard = ({
  total = 12,
  filled,
  customerName = '',
  nextReward = ''
}: Props) => {
  // build boolean array of which spots are punched
  const stamps = Array.from({ length: total }, (_, i) => i < filled);

  return (
    <div className="punch-card">
      {/* top row ----------------------------------------------------------- */}
      <div className="top-row">
        <img src={logo} alt="logo" className="logo" />
        <span className="stamp-count">STAMPS: {filled}</span>
      </div>

      {/* circles ----------------------------------------------------------- */}
      <div className="stamps">
        {stamps.map((on, i) => (
          <div key={i} className={on ? 'circle filled' : 'circle'} />
        ))}
      </div>

      {/* bottom row -------------------------------------------------------- */}
      <div className="bottom-row">
        <span className="reward">{nextReward}</span>
        <span className="name">{customerName && `Customer Name: ${customerName}`}</span>
      </div>
    </div>
  );
};

export default PunchCard;
