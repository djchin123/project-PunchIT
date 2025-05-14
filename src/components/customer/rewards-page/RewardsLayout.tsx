// RewardsLayout.tsx  – live tiers, redeem, activity, referral
import { useEffect, useState } from 'react';
import Tiers        from './tiers';
import Referrals    from './referrals';
import RedeemItem   from './reward-cards';
import StampsTable  from './stamps-table';
import "../../../styles/customer/rewards/layout.css";
import "../../../styles/customer/rewards/tiers.css";
import "../../../styles/customer/rewards/referrals.css";
import "../../../styles/customer/rewards/cards.css";
import "../../../styles/customer/rewards/stamps.css";

interface ActivityRow { date: string; activity: string; stamps: number; }
interface Summary {
  current_stamps: number;
  tier: string;
  referral_code: string;
  referral_count: number;
  activity: ActivityRow[];
}

const RewardsPage = () => {
  const userId = localStorage.getItem('punchit_user');
  const [data, setData] = useState<Summary | null>(null);
  const [redeemed, setRedeemed] = useState<string[]>([]);
  const [coupon,  setCoupon] = useState<string | null>(null);

  /* ─────────────── fetch summary ─────────────── */
  const fetchSummary = () => {
    if (!userId) return;
    fetch(`http://localhost:3001/api/customer/${userId}/summary`)
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  };

  useEffect(fetchSummary, [userId]);

  /* ─────────────── reward list ─────────────── */
  const rewards = [
    { title: "One Free Photo",      stamps: 4 },
    { title: "One Free Photo Album",stamps: 8 },
    { title: "Free Custom Keychain",stamps: 12 },
  ];

  /* ─────────────── redeem handler ─────────────── */
  const handleRedeem = async (title: string, cost: number) => {
    if (!userId || !data) return;
    if (data.current_stamps < cost) {
      alert(`You need ${cost - data.current_stamps} more stamp${cost - data.current_stamps!==1?'s':''} to redeem.`);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3001/api/customer/${userId}/redeem`,
        {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({ reward_title:title, reward_cost:cost })
        });
      const j = await res.json();
      if (!res.ok) { alert(j.error || 'Redeem failed'); return; }

      // success → update UI
      setRedeemed(p => [...p, title]);
      fetchSummary();

      // generate 16-char coupon & show modal
      const code = Math.random().toString(36).slice(2,18).toUpperCase();
      setCoupon(code);
      try { await navigator.clipboard.writeText(code); } catch(_) {}
    } catch (e) {
      console.error(e);
      alert('Server error.');
    }
  };

  /* ─────────────── render ─────────────── */
  if (!data) return <p style={{padding:40}}>Loading rewards…</p>;

  return (
    <div className="rewards-page">
      <div className="container">
        <div className="top-section">
          <Tiers tier={data.tier} available={data.current_stamps} />
          <Referrals
            code={`punchIT.com/referral/${data.referral_code}`}
            count={data.referral_count}
          />
        </div>

        <div className="rewards-section">
          <h3 className="section-title">Redeem Stamps For Rewards</h3>
          <div className="rewards-grid">
            {rewards.map(r => (
              <RedeemItem
                key={r.title}
                title={r.title}
                stamps={r.stamps}
                redeemed={redeemed.includes(r.title)}
                canRedeem={data.current_stamps >= r.stamps}
                onRedeem={() => handleRedeem(r.title, r.stamps)}
              />
            ))}
          </div>
        </div>

        <div className="activity-section">
          <h3 className="section-title">Stamp Activity</h3>
          <StampsTable rows={data.activity} />
        </div>
      </div>

      {/* coupon modal */}
      {coupon && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>🎉 Reward Coupon</h2>
            <p
              style={{
                fontFamily:'monospace',
                letterSpacing:'2px',
                fontSize:'1.2rem',
                margin:'20px 0'
              }}
            >
              {coupon}
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(coupon);
                alert('Code copied!');
              }}
            >
              Copy
            </button>
            <p style={{marginTop:10}}>Present to cashier</p>
            <button
              style={{marginTop:20}}
              onClick={() => setCoupon(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsPage;
