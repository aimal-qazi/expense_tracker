import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerRequest } from '../services/authService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirm_password) {
      toast.warning('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };

      await registerRequest(payload);
      toast.success('Registration successful. Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err?.response?.data?.error || err?.response?.data?.message || 'Unable to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='auth-page'>
      <section className='auth-card'>
        <h1>Register</h1>
        <p>Create your account to start managing expenses.</p>

        <form className='auth-form' onSubmit={handleSubmit}>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            name='name'
            type='text'
            placeholder='Your full name'
            value={formData.name}
            onChange={handleChange}
            required
          />

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
            placeholder='Create a password'
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor='confirm_password'>Confirm Password</label>
          <input
            id='confirm_password'
            name='confirm_password'
            type='password'
            placeholder='Confirm your password'
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />

          <button type='submit' disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className='auth-footer'>
          Already have an account? <Link to='/login'>Login</Link>
        </p>

        <ToastContainer position='top-right' autoClose={2500} />
      </section>
    </main>
  );
};

export default Register