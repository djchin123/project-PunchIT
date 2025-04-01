import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/customer/home'
import BottomNav from './components/customer/HomePage/BottomNav'
import Rewards from './pages/customer/rewards'
import Profile from './pages/customer/profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/rewards" element={<Rewards />} />
        <Route path="/scan" element={<QRScan />} />
         */}
         
      </Routes>
      <BottomNav />
    </BrowserRouter>
  )
}

export default App
