import React, { useState } from "react";
import Tiers from "./tiers";
import Referrals from "./referrals";
import RedeemItem from "./reward-cards";
import StampsTable from "./stamps-table";
import "../../../styles/customer/rewards/tiers.css";
import "../../../styles/customer/rewards/referrals.css";
import "../../../styles/customer/rewards/cards.css";
import "../../../styles/customer/rewards/stamps.css";

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
    <div className="rewards-page p-6 bg-blue-50 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <Tiers />
          <Referrals />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Redeem Stamps For Rewards</h3>
          <div className="grid md:grid-cols-3 gap-4">
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
        <StampsTable />
      </div>
    </div>
  );
}
