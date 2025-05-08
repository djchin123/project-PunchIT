import '../../styles/business/EditCardModal.css';
import { useState } from 'react';

interface EditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditCardModal: React.FC<EditCardModalProps> = ({ isOpen, onClose }) => {
  const [logoHeader, setLogoHeader] = useState<string | null>(null);
  const [logoIcon, setLogoIcon] = useState<string | null>(null);
  const [stampCount, setStampCount] = useState<number>(10);
  const [multiReward, setMultiReward] = useState<boolean>(false);
  const [tierReward, setTierReward] = useState<boolean>(false);
  const [terms, setTerms] = useState<string>("Customers earn 1 loyalty credit per photo purchased, redeemable at any time.");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Edit Card Details</h2>

        <div className="form-group">
          <label>Upload your Logo Header:</label>
          <input type="file" onChange={(e) => handleFileUpload(e, setLogoHeader)} />
          {logoHeader && <img src={logoHeader} alt="Logo Header Preview" className="image-preview" />}
        </div>

        <div className="form-group">
          <label>Upload your Logo Icon:</label>
          <input type="file" onChange={(e) => handleFileUpload(e, setLogoIcon)} />
          {logoIcon && <img src={logoIcon} alt="Logo Icon Preview" className="image-preview" />}
        </div>

        <div className="form-group">
          <label>Number of Stamps:</label>
          <select value={stampCount} onChange={(e) => setStampCount(Number(e.target.value))}>
            {[10, 15, 20].map((count) => (
              <option key={count} value={count}>{count} Stamp Card</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Multi Rewards:</label>
          <input type="checkbox" checked={multiReward} onChange={(e) => setMultiReward(e.target.checked)} />
        </div>

        <div className="form-group">
          <label>Tier Rewards:</label>
          <input type="checkbox" checked={tierReward} onChange={(e) => setTierReward(e.target.checked)} />
        </div>

        <div className="form-group">
          <label>Terms & Conditions:</label>
          <textarea value={terms} onChange={(e) => setTerms(e.target.value)} />
        </div>

        <div className="button-group">
          <button onClick={onClose} className="btn-cancel">Cancel</button>
          <button onClick={() => alert("Saved!")} className="btn-save">Save Changes</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default EditCardModal;
