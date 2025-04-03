// scan.tsx
import React from 'react';
import '../../styles/customer/scan/scan.css';
import qrCode from '../../assets/qr_code.png'; 

const ScanPage: React.FC = () => {
  return (
    <div className="scan-page">
      <h1 className="scan-title">Scan Your QR Code</h1>

      <div className="qr-container">
        <img src={qrCode} alt="QR Code" className="qr-image" />
        <p className="qr-instructions">
          Show this QR code to the cashier to earn stamps and rewards.
        </p>
      </div>

      <div className="store-locator">
        <h2 className="section-title">Find Nearest Store</h2>
        <p className="locator-text">Enter your PIN code or use current location:</p>
        <div className="input-group">
          <input type="text" placeholder="Enter your PIN code" className="pin-input" />
          <button className="button-locate">Search</button>
        </div>
        <button className="button-locate" style={{ marginTop: '10px' }}>
          Use Current Location
        </button>
      </div>

      {/* help text */}
      <div className="scan-help">
        <h2 className="section-title">Need Help?</h2>
        <p>Ensure your screen’s brightness is high enough for an easy scan.</p>
        <p>Contact support at <a href="mailto:support@punchit.com">support@punchit.com</a> if you have any issues.</p>
      </div>
    </div>
  );
};

export default ScanPage;
