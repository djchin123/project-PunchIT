//PunchCard.tsx
import '../../../styles/customer/home/PunchCard.css'
import logo from '../../../assets/logo.png'

const PunchCard = ({ total = 10, filled = 4 }) => {
  const stamps = Array.from({ length: total }, (_, i) => i < filled)

  return (
    <div className="punch-card">
      <div className="top-row">
        <img src={logo} alt="logo" className="logo" />
        <span className="stamp-count">STAMPS: {filled}</span>
      </div>

      <div className="stamps">
        {stamps.map((filled, i) => (
          <div key={i} className={filled ? 'circle filled' : 'circle'}></div>
        ))}
      </div>

      <div className="bottom-row">
        <span className="reward">NEXT REWARD: Free Photo: 1 stamp</span>
        <span className="name">Customer Name: Brian Cheung</span>
      </div>
    </div>
  )
}

export default PunchCard
