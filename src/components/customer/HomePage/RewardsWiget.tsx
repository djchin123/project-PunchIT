import { useNavigate } from 'react-router-dom'
import '../../../styles/customer/home/RewardsWiget.css'

const RewardsWidget = () => {
  const navigate = useNavigate()

  return (
    <div className="rewards-widget">
      <h1 className="section-title">Rewards Snapshot</h1>
      <div className="rewards-row">
        <div>
          <p>No rewards</p>
          <p className="subtext">Take more photos to earn stamps.</p>
        </div>
        <button onClick={() => navigate('/scan')}>Scan now</button>
      </div>
    </div>
  )
}

export default RewardsWidget
