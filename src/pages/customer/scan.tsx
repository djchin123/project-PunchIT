// scan.tsx  – “Add Stamp” via secret key
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/customer/scan/scan.css';
import qrCode from '../../assets/qr_code.png';

const ScanPage = () => {
  const [secret, setSecret] = useState('');
  const nav = useNavigate();
  const userId = localStorage.getItem('punchit_user');

  const addStamp = async () => {
    if (!secret.trim()) {
      return alert('Please enter a secret key.');
    }
    if (!userId) {
      return alert('You are not logged in.');
    }

    try {
      const res = await fetch(
        `http://localhost:3001/api/customer/${userId}/add-stamp`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ secret_key: secret.trim() })
        }
      );
      const j = await res.json();
      if (res.ok) {
        alert('✅ Stamp recorded!');
        setSecret('');
        // go home so the punch-card reloads with new count
        nav('/customer/home');
      } else {
        alert(j.error || 'Could not add stamp.');
      }
    } catch (e) {
      console.error(e);
      alert('Server unreachable, please try again.');
    }
  };

  return (
    <div className="scan-page">
      <h1 className="scan-title">Scan Your QR Code</h1>

      {/* QR container (unchanged) */}
      <div className="qr-container">
        <img src={qrCode} alt="QR Code" className="qr-image" />
        <p className="qr-instructions">
          Show this QR code to the cashier to earn stamps and rewards.
        </p>

        {/* NEW: secret-key entry */}
        <div className="input-group" style={{ marginTop: 20 }}>
          <input
            type="text"
            placeholder="Enter secret key"
            className="pin-input"
            value={secret}
            onChange={e => setSecret(e.target.value)}
          />
          <button className="button-locate" onClick={addStamp}>
            Add Stamp
          </button>
        </div>
      </div>

      {/* store locator (unchanged) */}
      <div className="store-locator">
        <h2 className="section-title">Find Nearest Store</h2>
        <p className="locator-text">Enter your PIN code or use current location:</p>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter your PIN code"
            className="pin-input"
          />
          <button className="button-locate">Search</button>
        </div>
        <button className="button-locate" style={{ marginTop: '10px' }}>
          Use Current Location
        </button>
      </div>

      {/* help block (unchanged) */}
      <div className="scan-help">
        <h2 className="section-title">Need Help?</h2>
        <p>Ensure your screen’s brightness is high enough for an easy scan.</p>
        <p>
          Contact support at{' '}
          <a href="mailto:support@punchit.com">support@punchit.com</a> if you
          have any issues.
        </p>
      </div>
    </div>
  );
};

export default ScanPage;
