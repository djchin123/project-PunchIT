import BottomNav from './BottomNav'
import '../../../styles/customer/home/layout.css'
import PunchCard from './PunchCard'

const HomePageLayout = () => {
  return (
    <div className="customer-home">
      <h1 className="greeting">Welcome back, Brian</h1>
      <PunchCard total={10} filled={4} />

      <BottomNav />
    </div>
  )
}

export default HomePageLayout
