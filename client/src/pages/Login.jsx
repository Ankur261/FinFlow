import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://localhost:7261/api/auth/login", {
        email,
        password
      });
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("id", res.data.id);

      if (res.data.role === "admin") navigate("/admin/dashboard");
      else if (res.data.role === "merchant") navigate("/merchant/dashboard");
      else navigate("/customer/dashboard");

    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your financial account</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
          />

          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            
          />

          <button type="submit" className="login-btn">
            Sign In
          </button>

          {error && <p className="error-message">{error}</p>}

          <div className="auth-footer">
            Don't have an account?{" "}
            <Link to="/register" className="auth-link">
              Create one
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}