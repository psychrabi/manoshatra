import axios from "axios";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`/api/admin/login`, { password: pwd });
      console.log("Login response:", res.data);
      localStorage.setItem("admin_token", res.data.token);
      console.log("Token saved, navigating to admin...");
      navigate("/admin/appointments");
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.response) {
        setError(err.response.data?.detail || "Invalid credentials");
      } else if (err.request) {
        setError("Unable to connect to server. Please try again.");
      } else {
        setError("Invalid password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-beige flex items-center justify-center px-4 pt-20">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-brand-green" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-brand-text">
            Admin Access
          </h1>
          <p className="text-brand-muted text-sm mt-2">
            ManoShastra Management Portal
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="Enter admin password"
              className="input-field pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
