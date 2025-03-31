import { RouteObject } from 'react-router-dom'
import CustomerHome from '../pages/customer/home'

const customerRoutes: RouteObject[] = [
  {
    path: '/', //this is the default path landing page
    element: <CustomerHome />,
  },
]

export default customerRoutes
