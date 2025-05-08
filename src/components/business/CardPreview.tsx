import '../../styles/business/CardPreview.css';
import Home from '../../pages/customer/home';

const CardPreview = () => {
    return (
      <div className="card-preview">
        <h3>Your Card Design (Customer View)</h3>
        <div className="card-frame">
          <Home />
        </div>
      </div>
    );
  };

export default CardPreview;
