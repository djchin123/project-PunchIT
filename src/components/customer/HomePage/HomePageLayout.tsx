import BottomNav from './BottomNav'
import '../../../styles/customer/home/layout.css'

const HomePageLayout = () => {
  return (
    <div className="customer-home">
      <h1 className="greeting">Welcome back, Brian</h1>
      {/* Punch card + rewards + promo here */}

      <BottomNav />
    </div>
  )
}

export default HomePageLayout
