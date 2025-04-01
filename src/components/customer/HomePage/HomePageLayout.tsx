import BottomNav from './BottomNav'
import '../../../styles/customer/home/layout.css'
import PunchCard from './PunchCard'

const HomePageLayout = () => {
  return (
    <div className="customer-home">
      <h1 className="greeting">Welcome back, Brian</h1>
      <p>We miss you! Last scan: March 28, 2025</p>

      <PunchCard total={10} filled={4} />

      <BottomNav />
    </div>
  )
}

export default HomePageLayout
