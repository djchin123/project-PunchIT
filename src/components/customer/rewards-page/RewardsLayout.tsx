import React, { useState } from "react";
import Tiers from "./tiers";
import Referrals from "./referrals";
import RedeemItem from "./reward-cards";
import StampsTable from "./stamps-table";
import "../../../styles/customer/rewards/tiers.css";
import "../../../styles/customer/rewards/referrals.css";
import "../../../styles/customer/rewards/cards.css";
import "../../../styles/customer/rewards/stamps.css";
import "../../../styles/customer/rewards/layout.css";

export default function RewardsPage() {
  const [redeemed, setRedeemed] = useState<string[]>([]);

  const handleRedeem = (title: string) => {
    if (!redeemed.includes(title)) {
      setRedeemed((prev) => [...prev, title]);
    }
  };

  const rewards = [
    { title: "One Free Photo", stamps: 5 },
    { title: "One Free Photo Album", stamps: 10 },
    { title: "Free Custom Keychain", stamps: 15 },
  ];

  return (
    <div className="rewards-page">
      <div className="container">
        <div className="top-section">
          <Tiers />
          <Referrals />
        </div>

        <div className="rewards-section">
          <h3 className="section-title">Redeem Stamps For Rewards</h3>
          <div className="rewards-grid">
            {rewards.map((reward) => (
              <RedeemItem
                key={reward.title}
                title={reward.title}
                stamps={reward.stamps}
                redeemed={redeemed.includes(reward.title)}
                onRedeem={handleRedeem}
              />
            ))}
          </div>
        </div>

        <div className="activity-section">
          <h3 className="section-title">Stamp Activity</h3>
          <StampsTable />
        </div>
      </div>
    </div>
  );
}
