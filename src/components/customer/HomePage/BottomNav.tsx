import '../../../styles/customer/home/BottomNav.css'
import { NavLink } from 'react-router-dom'

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/rewards">Rewards</NavLink>
      <NavLink to="/scan">Scan</NavLink>
      <NavLink to="/profile">Account</NavLink>
    </nav>
  )
}

export default BottomNav
