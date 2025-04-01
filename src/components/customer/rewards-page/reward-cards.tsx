import React from "react";
import "../../../styles/customer/rewards/cards.css";

interface RedeemItemProps {
    title: string;
    stamps: number;
    redeemed: boolean;
    onRedeem: (title: string) => void;
  }
  
  export default function RedeemItem({ title, stamps, redeemed, onRedeem }: RedeemItemProps) {
    return (
      <div className="redeem-item">
        <h4 className="item-title">{title}</h4>
        <p className="item-stamps">{stamps} Stamps </p>
        <button
          onClick={() => onRedeem(title)}
          disabled={redeemed}
          className={`redeem-button ${redeemed ? "redeemed" : "active"}`}
        >
          {redeemed ? "REDEEMED" : "REDEEM"}
        </button>
      </div>
    );
  }
  