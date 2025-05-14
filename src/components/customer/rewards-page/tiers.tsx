import "../../../styles/customer/rewards/tiers.css";

interface Props { tier: string; available: number; }

export default function Tiers({ tier, available }: Props) {
  const tierClass =
    tier === "Gold"   ? "gold" :
    tier === "Silver" ? "silver" : "bronze";

  return (
    <div className={`tier-container ${tierClass}`}>
      <h2 className="label">Tier Status</h2>
      <p  className="value">{tier}</p>
      <h2 className="label">Available Stamps</h2>
      <p  className="value">{available}</p>
    </div>
  );
}
