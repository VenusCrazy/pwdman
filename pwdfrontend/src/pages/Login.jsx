import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaCheck, FaGoogle, FaApple } from "react-icons/fa6";
import { useState } from "react";
import api from "../api";
import Toast from "../components/Toast";
import { useUser } from "../../context/userContext";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [cardError, setCardError] = useState("");
  const [toastError, setToastError] = useState("");
  const [toastToken, setToastToken] = useState(0);

  async function handleLogin(e) {
    e.preventDefault();
    setCardError("");

    try {
      const res = await api.post("/login", {
        email: data.email,
        password: data.password,
      });
      setUser(res.data);
      navigate("/");
    } catch (err) {
      const status = err.response?.status;
      if (status === 401 || status === 404) {
        setCardError(err.response?.data?.error || "Invalid email or password");
      } else {
        setToastError(err.response?.data?.error || "Could not reach the server");
        setToastToken((n) => n + 1);
      }
    }
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-10rem)] lg:min-h-[calc(100vh-12rem)] flex items-center justify-center px-4 py-8 md:py-10">
      <div className="grid w-full max-w-4xl grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-green-900/10">
        <div className="relative hidden md:flex flex-col justify-center gap-8 overflow-hidden p-10 lg:p-12">
          <div className="pointer-events-none absolute -top-24 -right-16 h-80 w-80 rounded-full bg-green-600/20 blur-3xl" />
          <div className="pointer-events-none absolute top-1/3 -left-24 h-96 w-96 rounded-full bg-green-600/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full border border-green-500/15" />
          <div className="pointer-events-none absolute -bottom-12 left-0 h-48 w-48 rounded-full border border-green-500/10" />

          <div className="relative flex flex-col gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-green-500/25 bg-green-600/15 text-green-500">
              <FaLock className="text-2xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold leading-tight">
                Your secrets,
                <br />
                <span className="text-green-500">locked.</span>
              </h2>
              <p className="mt-2 text-sm text-stone-400">
                Sign in to open your digital vault.
              </p>
            </div>
            <div className="mt-2 space-y-2.5">
              <div className="flex items-center gap-2 text-sm text-stone-300">
                <FaCheck className="shrink-0 text-xs text-green-500" />
                Bank-grade encryption
              </div>
              <div className="flex items-center gap-2 text-sm text-stone-300">
                <FaCheck className="shrink-0 text-xs text-green-500" />
                One-time share links
              </div>
              <div className="flex items-center gap-2 text-sm text-stone-300">
                <FaCheck className="shrink-0 text-xs text-green-500" />
                Saved only in this browser
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center p-8 lg:p-10">
          <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
          <p className="text-stone-400 text-sm mb-6">Sign in to your vault</p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <button className="flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-green-500 hover:bg-white/10 hover:text-green-400 transition-colors">
              <FaGoogle />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-green-500 hover:bg-white/10 hover:text-green-400 transition-colors">
              <FaApple />
              Apple
            </button>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-stone-500">or sign in with email</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <form className="card" onSubmit={handleLogin}>
            <div className="input-box">
              <FaUser className="input-icon" />
              <input type="email" placeholder="Email" required value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
            </div>

            <div className="input-box">
              <FaLock className="input-icon" />
              <input type="password" placeholder="Password" required value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
            </div>

            <div className="remember-forgot">
              <label className="flex items-center gap-2 text-stone-400 text-sm">
                <input type="checkbox" className="accent-green-600" />
                Remember me
              </label>
              <a href="#" className="text-stone-400 text-sm hover:text-green-500 transition-colors">
                Forgot password?
              </a>
            </div>

            {cardError && <p className="text-sm text-red-500">{cardError}</p>}

            <button type="submit" className="login-btn">
              Sign in
            </button>

            <p className="text-center text-sm text-stone-400 mt-2">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-green-500 hover:text-green-400 transition-colors">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>

      <Toast token={toastToken} message={toastError} variant="error" duration={3000} />
    </div>
  );
}

export default Login;