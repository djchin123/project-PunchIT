import { RouteObject } from 'react-router-dom'
import Home from '../pages/customer/home'

// Future pages (not used yet)
// import Rewards from '../pages/customer/Rewards'
// import QRScan from '../pages/customer/QRScan'
// import Profile from '../pages/customer/Profile'

const customerRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Home />, 
  },
  // {
  //   path: '/rewards',
  //   element: <Rewards />,
  // },
  // {
  //   path: '/scan',
  //   element: <QRScan />,
  // },
  // {
  //   path: '/profile',
  //   element: <Profile />,
  // },
]

export default customerRoutes
