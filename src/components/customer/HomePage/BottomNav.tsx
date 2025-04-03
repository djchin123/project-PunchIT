//BottomNav.tsx
import { NavLink } from 'react-router-dom'
import '../../../styles/customer/home/BottomNav.css'

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/customer/home" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Home
      </NavLink>
      <NavLink to="/customer/rewards" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Rewards
      </NavLink>
      <NavLink to="/customer/scan" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Scan
      </NavLink>
      <NavLink to="/customer/profile" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Account
      </NavLink>
    </nav>
  )
}

export default BottomNav
