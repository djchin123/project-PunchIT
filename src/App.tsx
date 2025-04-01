import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/customer/home'
import BottomNav from './components/customer/HomePage/BottomNav'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/rewards" element={<Rewards />} />
        <Route path="/scan" element={<QRScan />} />
        <Route path="/profile" element={<Profile />} /> */}
      </Routes>
      <BottomNav />
    </BrowserRouter>
  )
}

export default App
