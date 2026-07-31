import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ full_name: '', email: '', password: '', confirmPassword: '', role: 'owner' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) { setError('Passwords do not match.'); return; }
    if (formData.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      const { confirmPassword, ...data } = formData;
      await register(data);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#ffffff" }}>

      {/* Brand bar */}
      <div style={{ backgroundColor: "#1B3B1C", height: "56px", display: "flex", alignItems: "center", padding: "0 1.5rem" }}>
        <span style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.9375rem", letterSpacing: "0.01em" }}>
          GreenHarvest Farm Management
        </span>
      </div>

      {/* Centered form */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem" }}>
        <div style={{ width: "100%", maxWidth: "380px" }}>

          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600, color: "#243325" }}>Create account</h1>
            <p style={{ margin: "0.375rem 0 0", fontSize: "0.875rem", color: "#5B6B58" }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: "#2C5F2D", fontWeight: 500 }}>Sign in</Link>
            </p>
          </div>

          {error && <div className="alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="full_name" className="form-label">Full name</label>
              <input id="full_name" name="full_name" type="text" required
                className="form-input"
                value={formData.full_name} onChange={handleChange} />
            </div>

            <div className="form-field">
              <label htmlFor="email" className="form-label">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" required
                className="form-input"
                value={formData.email} onChange={handleChange} />
            </div>

            <div className="form-field">
              <label htmlFor="password" className="form-label">Password</label>
              <input id="password" name="password" type="password" required
                className="form-input"
                value={formData.password} onChange={handleChange} />
              <p style={{ fontSize: "0.75rem", color: "#5B6B58", marginTop: "0.25rem" }}>Minimum 6 characters</p>
            </div>

            <div className="form-field">
              <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" required
                className="form-input"
                value={formData.confirmPassword} onChange={handleChange} />
            </div>

            <button type="submit" disabled={loading} className="btn-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem", height: "2.5rem" }}>
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #e5e7eb", padding: "1rem 1.5rem", fontSize: "0.75rem", color: "#5B6B58", textAlign: "center" }}>
        © {new Date().getFullYear()} GreenHarvest Farm Management
      </div>
    </div>
  );
};

export default Register;
