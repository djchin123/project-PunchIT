import { NavLink } from 'react-router-dom';

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/business/home" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Home
      </NavLink>
      <NavLink to="/business/messages" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Messages
      </NavLink>
      <NavLink to="/business/stamp" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Stamp
      </NavLink>
      <NavLink to="/business/account" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Account
      </NavLink>
    </nav>
  )
}

export default BottomNav;
