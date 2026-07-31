import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: "", email: "", password: "", farm_name: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
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
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-harvest-700 mb-1">Farm name</label>
            <input
              className="input-field"
              placeholder="e.g. Green Valley Farm"
              value={form.farm_name}
              onChange={(e) => setForm({ ...form, farm_name: e.target.value })}
            />
          </div>
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
              minLength={6}
              className="input-field"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-sm text-harvest-600 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-harvest-800 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
