import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './pages/customer/auth';
import Home from './pages/customer/home';
import Rewards from './pages/customer/rewards';
import CustomerLayout from './components/customer/CustomerLayout';
import Profile from './pages/customer/profile';
import Scan from './pages/customer/scan';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* default page (to be changed to landing page later): */}
        <Route path="/" element={<Auth />} />

        {/* logged in as customer: */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="profile" element={<Profile />} />
          <Route path="scan" element={<Scan />} /> 

        </Route>

        {/* logged in as business: */}
        {/* <Route path="/business/dashboard" element={<BusinessDashboard />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App