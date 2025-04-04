//HomePageLayout.tsx
import BottomNav from './BottomNav'
import '../../../styles/customer/home/layout.css'
import PunchCard from './PunchCard'
import RewardsWidget from './RewardsWiget'

const HomePageLayout = () => {
  return (
    <div className="customer-home">
      <h1 className="greeting">Welcome back, Brian</h1>
      <p>We miss you! Last scan: March 28, 2025</p>

      <PunchCard total={12} filled={4} />
      <RewardsWidget />

      <BottomNav />
    </div>
  )
}

export default HomePageLayout
