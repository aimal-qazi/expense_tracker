import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login as loginRequest } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await loginRequest(formData);
      const token = response?.data?.token;

      if (token) {
        localStorage.setItem('token', token);
      }

      login(response.data.user);
      toast.success('Login successful.');
    } catch (err) {
      toast.error(err?.response?.data?.error || err?.response?.data?.message || 'Unable to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='auth-page'>
      <section className='auth-card'>
        <h1>Login</h1>
        <p>Sign in to continue tracking your expenses.</p>

        <form className='auth-form' onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='you@example.com'
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor='password'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            placeholder='Enter your password'
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type='submit' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className='auth-footer'>
          Do not have an account? <Link to='/register'>Register</Link>
        </p>

        <ToastContainer position='top-right' autoClose={2500} />
      </section>
    </main>
  );
};

export default Login