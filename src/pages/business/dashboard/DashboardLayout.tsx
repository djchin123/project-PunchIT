import { Outlet } from 'react-router-dom';
import BottomNav from '../../../components/business/BottomNav';

const DashboardLayout = () => {
  return (
    <div className="business-dashboard">
      <Outlet />
      <BottomNav />
    </div>
  );
};

export default DashboardLayout;
