import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Transactions', to: '/transactions' },
  { label: 'Analytics', to: '/analytics' },
  { label: 'Add', to: '/add' }
];

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const name = user?.name || 'User';
  const email = user?.email || 'user@email.com';
  const initial = name?.charAt(0)?.toUpperCase() || 'U';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className='navbar'>
      <div className='navbar-logo'>Expense Tracker</div>

      <nav className='navbar-links'>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className='navbar-user'>
        <span className='navbar-avatar'>{initial}</span>
        <div className='navbar-user-text'>
          <strong>{name}</strong>
          <small>{email}</small>
        </div>
        <button type='button' className='logout-btn' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar