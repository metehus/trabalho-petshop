import { Routes as ReactRoutes, Route } from 'react-router-dom';
import Home from './pages/Home';

export default function Router() {
  return <ReactRoutes>
    <Route path='/' element={<Home />} />
  </ReactRoutes>
}