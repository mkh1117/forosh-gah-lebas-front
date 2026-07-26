import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = "http://127.0.0.1:8000/api";

export default function Login() {
  const navigate = useNavigate();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method : "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body   : JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // خطاهای validation لاراول
        if (data.errors) {
          const first = Object.values(data.errors)[0][0];
          throw new Error(first);
        }
        throw new Error(data.message || "خطا در ورود");
      }

      // ذخیره token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user",  JSON.stringify(data.user));
      window.dispatchEvent(new Event("authChange"));
      
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-pink-50 p-4"
      dir="rtl"
    >
      <motion.div
        initial={{ y: 32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55 }}
        className="bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/60"
      >
        {/* هدر */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-2xl mx-auto mb-4">
            👤
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">ورود به حساب</h2>
          <p className="text-gray-500 text-sm mt-1">خوش اومدی! وارد حسابت شو.</p>
        </div>

        {/* پیام خطا */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-5 flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
            >
              <span>⚠️</span> {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* ایمیل */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">ایمیل</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none shadow-sm transition text-sm"
              placeholder="example@email.com"
              required
              autoComplete="email"
            />
          </div>

          {/* رمز عبور */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-semibold text-gray-700">رمز عبور</label>
              <button type="button" className="text-xs text-pink-500 hover:text-pink-700">
                فراموش کردم
              </button>
            </div>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none shadow-sm transition text-sm pl-10"
                placeholder="رمز عبور"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass((p) => !p)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* دکمه ورود */}
          <motion.button
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-bold text-base transition shadow-lg shadow-pink-200"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                در حال ورود...
              </span>
            ) : "ورود"}
          </motion.button>
        </form>

        {/* جداکننده */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">یا</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* ورود با گوگل */}
        <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition shadow-sm">
          <img src="/google-icon.png" className="w-5 h-5" alt="Google" />
          ورود با گوگل
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          حساب ندارید؟
          <Link to="/register" className="text-pink-600 font-bold mr-1 hover:underline">ثبت‌نام کنید</Link>
        </p>
      </motion.div>
    </motion.div>
  );
}