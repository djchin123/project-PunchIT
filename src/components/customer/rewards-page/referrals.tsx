// referrals.tsx  – live referral code & count
import { useState } from "react";
import "../../../styles/customer/rewards/referrals.css";

interface Props {
  code: string;
  count: number;
}
export default function Referrals({ code, count }: Props) {
  const [copied, setCopied] = useState(false);
  const safeCode = code || "not-available";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* ignore */ }
  };

  return (
    <div className="referral-container">
      <h3 className="title">Referral Rewards</h3>
      <p className="description">
        Invite friends - earn 1 stamp for each successful referral!
      </p>

      <div className="referral-input-group">
        <input type="text" value={safeCode} readOnly className="referral-input" />
        <button className="copy-button" onClick={copy}>
          {copied ? "COPIED" : "COPY"}
        </button>
      </div>

      <p className="referral-summary">
        You’ve referred <span className="highlight">{count}</span> friends and
        earned <span className="highlight">{count}</span> stamp
        {count !== 1 && 's'} so far!
      </p>
    </div>
  );
}
