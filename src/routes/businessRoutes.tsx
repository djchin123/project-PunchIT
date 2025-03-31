import { RouteObject } from 'react-router-dom'
import BusinessDashboard from '../pages/business/dashboard'

const businessRoutes: RouteObject[] = [
  {
    path: '/business', //nothing connected to this path yet
    element: <BusinessDashboard />,
  },
]

export default businessRoutes
