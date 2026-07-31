import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ full_name: '', email: '', password: '', confirmPassword: '', role: 'owner' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setSubmitting(true);
    try {
      const { confirmPassword, ...payload } = formData;
      await register(payload);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-harvest-50 px-4">
      <div className="card w-full max-w-md p-8">
        <h1 className="font-display text-3xl font-semibold text-harvest-800 mb-1">GreenHarvest</h1>
        <p className="text-sm text-harvest-600 mb-6">Create your farm owner account</p>

        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg px-4 py-2 text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-harvest-700 mb-1">Full name</label>
            <input
              required
              className="input-field"
              value={formData.full_name}
              onChange={handleChange}
              name="full_name"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-harvest-700 mb-1">Email</label>
            <input
              type="email"
              required
              className="input-field"
              value={formData.email}
              onChange={handleChange}
              name="email"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-harvest-700 mb-1">Password</label>
            <input
              type="password"
              required
              minLength={6}
              className="input-field"
              value={formData.password}
              onChange={handleChange}
              name="password"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-harvest-700 mb-1">Confirm password</label>
            <input
              type="password"
              required
              className="input-field"
              value={formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
            />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
            {submitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="text-sm text-harvest-600 mt-6 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-harvest-800 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
