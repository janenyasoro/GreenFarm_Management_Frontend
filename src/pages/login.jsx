import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, loginAdmin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get('role') || 'owner';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (role === 'admin') {
        await loginAdmin(form.email, form.password);
      } else {
        await login(form.email, form.password);
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-harvest-50 px-4">
      <div className="card w-full max-w-md p-8">
        <h1 className="font-display text-3xl font-semibold text-harvest-800 mb-1">GreenHarvest</h1>
        <p className="text-sm text-harvest-600 mb-6">Log in to manage your farm</p>

        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg px-4 py-2 text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-harvest-700 mb-1">Email</label>
            <input
              type="email"
              required
              className="input-field"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-harvest-700 mb-1">Password</label>
            <input
              type="password"
              required
              className="input-field"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-sm text-harvest-600 mt-6 text-center">
          Don't have an account?{" "}
          <Link to={`/register?role=${role}`} className="text-harvest-800 font-medium hover:underline">
            Register
          </Link>
        </p>
        <div className="text-xs text-gray-500 mt-3 text-center">Signing in as: <strong>{role}</strong></div>
      </div>
    </div>
  );
}
