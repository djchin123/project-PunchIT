import React from 'react';
import QRCode from "react-qr-code";
import "../../../styles/business/scan-page/scan-style.css";


const QRCodePage = () => {
    const url = "http://localhost:5173/customer/rewards"; // rewards page url

    return (
        <div className="qr-code-page">
            <h1 className="qr-code-title">Scan to Redeem</h1>
            <div className="qr-code-container">
                <QRCode value={url} size={256} level={"H"}/>
            </div>
        </div>

    );

}

export default QRCodePage;