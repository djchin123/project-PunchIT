import { NavLink } from 'react-router-dom';
import '../../styles/business/BottomNav.css';

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/business/home" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Home
      </NavLink>
      <NavLink to="/business/messages" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Messages
      </NavLink>
      <NavLink 
        to="/business/scan-page" 
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      >
        Scan
      </NavLink>
      <NavLink to="/business/account" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Account
      </NavLink>
    </nav>
  );
};

export default BottomNav;
