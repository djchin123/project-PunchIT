// reward-cards.tsx  – clickable only when allowed
import "../../../styles/customer/rewards/cards.css";

interface Props {
  title:      string;
  stamps:     number;
  redeemed:   boolean;
  canRedeem:  boolean;   // passed from parent
  onRedeem:   () => void;
}

export default function RedeemItem({
  title, stamps, redeemed, canRedeem, onRedeem
}: Props) {
  const isDisabled = redeemed || !canRedeem;

  const handleClick = () => {
    if (isDisabled) return;     // guard – shouldn’t fire
    onRedeem();
  };

  return (
    <div className="redeem-item">
      <h4 className="item-title">{title}</h4>
      <p  className="item-stamps">{stamps} Stamps</p>

      {/* no HTML “disabled” attribute – instead we guard in JS */}
      <button
        onClick={handleClick}
        className={`redeem-button ${
          redeemed ? "redeemed"
                   : isDisabled ? "disabled"
                                 : "active"
        }`}
      >
        {redeemed ? "REDEEMED" : "REDEEM"}
      </button>
    </div>
  );
}
