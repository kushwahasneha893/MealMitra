import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "token") {
        if (e.oldValue && !e.newValue) {
          alert("You were logged out 🍃");
          navigate("/login");
        } else if (e.oldValue && e.newValue && e.newValue !== e.oldValue) {
          alert("Another user logged in 🧐 Please login again.");
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate("/login");
        }
      }
    };

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const loginData = {
        email: email.trim().toLowerCase(),
        password,
      };

      const res = await axios.post(
        "http://localhost:9999/api/auth/login",
        loginData
      );

      const { token, role } = res.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        switch (role) {
          case "HOMEMAKER":
            navigate("/kitchen");
            break;
          case "DELIVERY":
            navigate("/delivery");
            break;
          case "ADMIN":
            navigate("/admin-panel");
            break;
          default:
            navigate("/meals");
        }
      } else {
        setError("Invalid response from server 😬");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed 🥲 Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 animate-fade">

        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Your food journey continues 🍽️
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg mb-4 text-center border border-red-200">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input-style"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* 🐵 FUNNY PASSWORD FIELD */}
          <div className="relative">
            <label className="text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Monkey is guarding 🙈"
              className="input-style pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-2xl cursor-pointer select-none"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙉" : "🙈"}
            </button>

            <p className="text-xs text-gray-400 mt-1">
              Click the monkey to peek 👀
            </p>
          </div>

          <button type="submit" disabled={loading} className="btn-primary mt-3">
            {loading ? "Checking kitchen... 👨‍🍳" : "Login 🍱"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          New here?{" "}
          <span
            className="text-orange-500 cursor-pointer hover:underline font-bold"
            onClick={() => navigate("/signup")}
          >
            Create account 🚀
          </span>
        </p>
      </div>

      <style jsx>{`
        @keyframes fade {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade {
          animation: fade 0.45s ease-out;
        }

        .input-style {
          width: 100%;
          margin-top: 6px;
          padding: 12px 14px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          outline: none;
          transition: 0.2s;
          font-size: 0.95rem;
          background: #f8fafc;
        }

        .input-style:focus {
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.2);
          background: #ffffff;
        }

        .btn-primary {
          width: 100%;
          background: #f97316;
          color: white;
          padding: 12px;
          border-radius: 14px;
          font-weight: 700;
          transition: 0.3s;
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }

        .btn-primary:hover {
          background: #ea580c;
          box-shadow: 0 8px 25px rgba(249, 115, 22, 0.35);
          transform: translateY(-1px);
        }

        .btn-primary:disabled {
          background: #fdba74;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export default Login;
