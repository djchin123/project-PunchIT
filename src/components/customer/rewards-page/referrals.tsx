import React from "react";
import "../../../styles/customer/rewards/referrals.css";

export default function Referrals() {
  return (
    <div className="referral-container">
      <h3 className="title">Referral Rewards</h3>
      <p className="description">
        Invite your friends and earn 1 stamp for each successful referral!
      </p>
      <div className="referral-input-group">
        <input
          type="text"
          value="punchIT.com/referral/abc123"
          readOnly
          className="referral-input"
        />
        <button className="copy-button">COPY</button>
      </div>
      <p className="referral-summary">
        You’ve referred <span className="highlight">3</span> friends and earned
        <span className="highlight"> 3</span> stamps so far!
      </p>
    </div>
  );
}
