import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = "http://127.0.0.1:8000/api";

// خارج از کامپوننت — جلوگیری از re-mount در هر render
const Field = ({ label, children, error: fErr }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
    {children}
    {fErr && <p className="mt-1 text-xs text-red-500">{fErr}</p>}
  </div>
);

export default function Register() {
  const navigate = useNavigate();

  const [name,            setName]            = useState("");
  const [email,           setEmail]           = useState("");
  const [password,        setPassword]        = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPass,        setShowPass]        = useState(false);
  const [loading,         setLoading]         = useState(false);
  const [error,           setError]           = useState(null);
  const [fieldErrors,     setFieldErrors]     = useState({});

  // validation سمت کلاینت
  const validate = () => {
    const errs = {};
    if (!name.trim())              errs.name     = "نام الزامی است";
    if (!email.includes("@"))      errs.email    = "ایمیل معتبر وارد کنید";
    if (password.length < 8)       errs.password = "رمز عبور حداقل ۸ کاراکتر باشد";
    if (password !== passwordConfirm) errs.passwordConfirm = "رمزها با هم مطابقت ندارند";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const errs = validate();
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
    setFieldErrors({});
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method : "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body   : JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirm, // لاراول این نام رو انتظار داره
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          // خطاهای validation لاراول رو به فیلدها نسبت بده
          const mapped = {};
          if (data.errors.name)     mapped.name     = data.errors.name[0];
          if (data.errors.email)    mapped.email    = data.errors.email[0];
          if (data.errors.password) mapped.password = data.errors.password[0];
          setFieldErrors(mapped);
          return;
        }
        throw new Error(data.message || "خطا در ثبت‌نام");
      }

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
            ✨
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">ثبت‌نام</h2>
          <p className="text-gray-500 text-sm mt-1">یه حساب جدید بساز.</p>
        </div>

        {/* خطای کلی */}
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

        <form onSubmit={handleSubmit} className="space-y-4">

          <Field label="نام و نام خانوادگی" error={fieldErrors.name}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl outline-none shadow-sm transition text-sm focus:ring-2 focus:ring-pink-400 ${
                fieldErrors.name ? "border-red-400 bg-red-50" : "border-gray-200"
              }`}
              placeholder="علی احمدی"
              autoComplete="name"
            />
          </Field>

          <Field label="ایمیل" error={fieldErrors.email}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl outline-none shadow-sm transition text-sm focus:ring-2 focus:ring-pink-400 ${
                fieldErrors.email ? "border-red-400 bg-red-50" : "border-gray-200"
              }`}
              placeholder="example@email.com"
              autoComplete="email"
            />
          </Field>

          <Field label="رمز عبور" error={fieldErrors.password}>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl outline-none shadow-sm transition text-sm focus:ring-2 focus:ring-pink-400 pl-10 ${
                  fieldErrors.password ? "border-red-400 bg-red-50" : "border-gray-200"
                }`}
                placeholder="حداقل ۸ کاراکتر"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPass((p) => !p)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
            {/* نوار قدرت رمز */}
            {password && (
              <div className="mt-2 flex gap-1">
                {[1,2,3,4].map((i) => (
                  <div
                    key={i}
                    className={`flex-1 h-1 rounded-full transition-all ${
                      password.length >= i * 3
                        ? i <= 1 ? "bg-red-400"
                          : i <= 2 ? "bg-yellow-400"
                          : i <= 3 ? "bg-blue-400"
                          : "bg-green-400"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            )}
          </Field>

          <Field label="تکرار رمز عبور" error={fieldErrors.passwordConfirm}>
            <input
              type={showPass ? "text" : "password"}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl outline-none shadow-sm transition text-sm focus:ring-2 focus:ring-pink-400 ${
                fieldErrors.passwordConfirm ? "border-red-400 bg-red-50" : "border-gray-200"
              }`}
              placeholder="رمز عبور را تکرار کنید"
              autoComplete="new-password"
            />
          </Field>

          <motion.button
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-bold text-base transition shadow-lg shadow-pink-200 mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                در حال ثبت‌نام...
              </span>
            ) : "ثبت‌نام"}
          </motion.button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          قبلاً حساب داری؟
          <Link to="/login" className="text-pink-600 font-bold mr-1 hover:underline">وارد شو</Link>
        </p>
      </motion.div>
    </motion.div>
  );
}