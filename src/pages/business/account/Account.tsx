import '../../../styles/business/Account.css';
import { useState } from 'react';

const Account = () => {
  const [businessName, setBusinessName] = useState("Memory Shop");
  const [email, setEmail] = useState("info@memoryshop.com");
  const [phone, setPhone] = useState("555-1234");
  const [address, setAddress] = useState("230 Newbury St, Boston, MA");
  const [storeHours, setStoreHours] = useState("Mon-Sun: 12:00 PM - 8:00 PM");

  const handleSave = () => {
    console.log({
      businessName,
      email,
      phone,
      address,
      storeHours
    });
    alert('Business information updated successfully!');
  };

  return (
    <div className="account-container">
      <h1>Account Settings</h1>

      <div className="form-group">
        <label>Business Name:</label>
        <input
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Phone Number:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Store Hours:</label>
        <input
          type="text"
          value={storeHours}
          onChange={(e) => setStoreHours(e.target.value)}
        />
      </div>

      <button className="save-button" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default Account;
