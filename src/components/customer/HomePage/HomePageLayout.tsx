// HomePageLayout.tsx  – customer dashboard (live data)
import { useEffect, useState } from 'react';
import '../../../styles/customer/home/layout.css';
import PunchCard      from './PunchCard';
import RewardsWidget  from './RewardsWiget';
import BottomNav      from './BottomNav';

interface ActivityRow { date: string; activity: string; stamps: number; }

interface Summary {
  first_name:     string;
  current_stamps: number;
  total_stamps:   number;
  tier:           string;
  activity:       ActivityRow[];
}

const HomePageLayout = () => {
  const userId = localStorage.getItem('punchit_user');
  const [data, setData] = useState<Summary | null>(null);

  /* ────────────────────────── fetch on mount ────────────────────────── */
  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:3001/api/customer/${userId}/summary`)
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, [userId]);

  /* ────────────────────────── helpers ───────────────────────────────── */
  const nextRewardText = (stamps: number) => {
    if (stamps < 4)  return 'NEXT REWARD: Free Photo · 4 stamps';
    if (stamps < 8)  return 'NEXT REWARD: Free Photo Album · 8 stamps';
    if (stamps < 12) return 'NEXT REWARD: Free Custom Keychain · 12 stamps';
    return 'You can redeem now!';
  };

  const lastScanDate = () => {
    const d = data?.activity?.[0]?.date;
    if (!d) return '-';
    const dt = new Date(d);
    return dt.toLocaleDateString(undefined,
      { year:'numeric', month:'short', day:'numeric' });
  };

  /* ────────────────────────── render ────────────────────────────────── */
  if (!data) return <p style={{ padding: 40 }}>Loading dashboard…</p>;

  return (
    <div className="customer-home">
      <h1 className="greeting">Welcome back, {data.first_name}</h1>
      <p>Last scan: {lastScanDate()}</p>

      <PunchCard
        filled={data.current_stamps}
        total={12}
        customerName={data.first_name}
        nextReward={nextRewardText(data.current_stamps)}
      />

      <RewardsWidget
        stamps={data.current_stamps}
        tier={data.tier}
      />

      <BottomNav />
    </div>
  );
};

export default HomePageLayout;
