import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './pages/customer/auth';
import Home from './pages/customer/home';
import Rewards from './pages/customer/rewards';
import CustomerLayout from './components/customer/CustomerLayout';
import Profile from './pages/customer/profile';
import Scan from './pages/customer/scan';
import DashboardLayout from './pages/business/dashboard/DashboardLayout';
import BusinessHome from './pages/business/dashboard/Home';
import Messages from './pages/business/messages/Messages';
import ScanPage from './pages/business/scan/scan-page';
import Account from './pages/business/account/Account';

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
        <Route path="/business" element={<DashboardLayout />}>
          <Route index element={<BusinessHome />} />
          <Route path="dashboard" element={<BusinessHome />} />
          <Route path="home" element={<BusinessHome />} />
          <Route path="messages" element={<Messages />} />
          <Route path="scan-page" element={<ScanPage />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App