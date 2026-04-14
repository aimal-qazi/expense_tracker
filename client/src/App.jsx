import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './routes/ProtectedRoute';
import AuthLayout from './layouts/AuthLayout';
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';
import Transactions from './pages/Transactions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AuthLayout />}>
            <Route path='/' element={<Dashboard />} />          
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/add' element={<AddTransaction />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
