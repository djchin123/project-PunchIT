import { useRoutes } from 'react-router-dom'
import customerRoutes from './routes/customerRoutes'
import businessRoutes from './routes/businessRoutes'

function App() {
  const routes = useRoutes([...customerRoutes, ...businessRoutes])
  return routes
}

export default App
