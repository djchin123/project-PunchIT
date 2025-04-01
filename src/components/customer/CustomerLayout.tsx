import { Outlet } from 'react-router-dom';
import BottomNav from './HomePage/BottomNav';

const CustomerLayout = () => {
  return (
    <div className="customer-layout">
      <Outlet />
      <BottomNav />
    </div>
  );
};

export default CustomerLayout;
