import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please enter both email and password.'); return; }
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Login failed. Please check your credentials.');
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

      {/* Centered form area */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem" }}>
        <div style={{ width: "100%", maxWidth: "380px" }}>

          {/* Heading */}
          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600, color: "#243325" }}>Sign in</h1>
            <p style={{ margin: "0.375rem 0 0", fontSize: "0.875rem", color: "#5B6B58" }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: "#2C5F2D", fontWeight: 500 }}>Create one</Link>
            </p>
          </div>

          {/* Error */}
          {error && <div className="alert-error">{error}</div>}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="email" className="form-label">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" required
                className="form-input"
                value={email} onChange={e => setEmail(e.target.value)} disabled={loading} />
            </div>

            <div className="form-field">
              <label htmlFor="password" className="form-label">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required
                className="form-input"
                value={password} onChange={e => setPassword(e.target.value)} disabled={loading} />
            </div>

            <button type="submit" disabled={loading} className="btn-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem", height: "2.5rem" }}>
              {loading ? (
                <>
                  <span className="spinner" style={{ width: "1rem", height: "1rem", borderWidth: "2px", borderTopColor: "#fff", borderColor: "rgba(255,255,255,0.3)" }} />
                  Signing in…
                </>
              ) : 'Sign in'}
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

export default Login;
