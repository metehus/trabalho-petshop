import { Routes as ReactRoutes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Checkout from './pages/Checkout';
import Produto from './pages/Produto';

export default function Router() {
  return <ReactRoutes>
    <Route path='/' element={<Home />} />
    <Route path='/produto/:id' element={<Produto />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Cadastro />} />
    <Route path='/checkout' element={<Checkout />} />
  </ReactRoutes>
}