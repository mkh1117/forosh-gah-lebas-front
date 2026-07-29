import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from "../components/CartContext";
import { assets } from '../assets/assets';

const NAV_LINKS = [
  { to: '/',          label: 'خانه' },
  { to: '/collection', label: 'محصولات' },
  { to: '/about',      label: 'درباره ما' },
  { to: '/contact',    label: 'تماس' },
];

const Navbar = () => {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn,  setIsLoggedIn]  = useState(false);
  const [user,        setUser]        = useState(null);

  const [searchParams] = useSearchParams();
  const { cartItems } = useCart();
  const navigate      = useNavigate();
  const profileRef    = useRef(null);
  const searchInputRef = useRef(null);

  // همگام‌سازی اینپوت سرچ با URL
  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  useEffect(() => {
    const checkAuth = () => {
      const token    = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      setIsLoggedIn(!!token);
      setUser(userData ? JSON.parse(userData) : null);
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    window.addEventListener('authChange', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth); 
    };
  }, []);

  // بستن dropdown پروفایل با کلیک بیرون
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // فوکوس روی اینپوت سرچ هنگام باز شدن و کلید Esc برای بستن
  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await fetch('http://127.0.0.1:8000/api/logout', {
          method : 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
        });
      } catch (_) {}
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setProfileOpen(false);
    navigate('/');
  };

  // مدیریت ارسال فرم سرچ
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collection?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    } else {
      navigate('/collection');
      setSearchOpen(false);
    }
  };

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').slice(0, 2)
    : '؟';

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-6">

          {/* لوگو */}
          <Link to="/">
            <img src={assets.logo} className='w-32 h-12 object-contain' alt='Logo' />
          </Link>

          {/* منوی دسکتاپ */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-sm transition-colors pb-0.5 ${
                    isActive
                      ? 'text-gray-900 font-medium border-b-2 border-pink-500'
                      : 'text-gray-500 hover:text-gray-800'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* آیکون‌ها */}
          <div className="flex items-center gap-3">

            {/* دکمه باز کردن جستجو */}
            <button 
              onClick={() => setSearchOpen(prev => !prev)}
              aria-label="جستجو"
              className={`p-2 rounded-lg transition ${
                searchOpen 
                  ? 'bg-pink-50 text-pink-600' 
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <circle cx="11" cy="11" r="7"/><path strokeLinecap="round" d="M16.5 16.5l4 4"/>
              </svg>
            </button>

            {/* سبد خرید */}
            <Link to="/cart" className="relative p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-pink-500 text-white text-[10px] font-medium flex items-center justify-center">
                  {cartItems.length > 9 ? '۹+' : cartItems.length}
                </span>
              )}
            </Link>

            {/* پروفایل — دسکتاپ */}
            {isLoggedIn ? (
              <div className="relative hidden md:block" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(p => !p)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 hover:border-gray-300 transition"
                >
                  <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-[11px] font-medium text-pink-700">
                    {initials}
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`w-3.5 h-3.5 text-gray-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" d="M6 9l6 6 6-6"/>
                  </svg>
                </button>

                {profileOpen && (
                  <div className="absolute left-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-lg py-1.5 overflow-hidden">
                    {user?.name && (
                      <div className="px-4 py-2 border-b border-gray-50 mb-1">
                        <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                    )}
                    <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="8" r="4"/><path strokeLinecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                      پروفایل
                    </Link>
                    <Link to="/orders" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                      سفارش‌ها
                    </Link>
                    <div className="border-t border-gray-50 mt-1 pt-1">
                      <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"/></svg>
                        خروج
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl border border-gray-200 transition">
                  ورود
                </Link>
                <Link to="/register" className="px-4 py-1.5 text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 rounded-xl transition">
                  ثبت‌نام
                </Link>
              </div>
            )}

            {/* همبرگر — موبایل */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition"
              aria-label="باز کردن منو"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── باکس سرچ (کشویی) ── */}
        {searchOpen && (
          <div className="bg-gray-50 border-t border-b border-gray-100 py-3 px-4 transition-all duration-300">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="نام محصول، دسته‌بندی یا برند مورد نظر را بنویسید..."
                  className="w-full pl-10 pr-12 py-2.5 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition shadow-sm"
                />
                
                {/* آیکون سرچ داخل اینپوت (دکمه Submit) */}
                <button
                  type="submit"
                  className="absolute right-3 text-gray-400 hover:text-pink-500 p-1 transition"
                  aria-label="جستجو"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <circle cx="11" cy="11" r="7"/><path strokeLinecap="round" d="M16.5 16.5l4 4"/>
                  </svg>
                </button>

                {/* دکمه بستن باکس سرچ */}
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute left-3 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition"
                  aria-label="بستن"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* ── منوی کشویی موبایل ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex" dir="rtl">
          {/* overlay */}
          <div className="absolute inset-0 bg-black/30" onClick={() => setMenuOpen(false)} />

          {/* پنل */}
          <div className="relative mr-auto w-72 max-w-full bg-white h-full flex flex-col shadow-2xl">

            {/* هدر پنل */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-pink-500 flex items-center justify-center">
                  <img src={assets.logo} alt="" className="w-4 h-4 object-contain brightness-0 invert" />
                </div>
                <span className="font-semibold text-gray-900">استایل</span>
              </div>
              <button onClick={() => setMenuOpen(false)} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* اطلاعات کاربر */}
            {isLoggedIn && user && (
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-50 bg-pink-50/50">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-sm font-medium text-pink-700 flex-shrink-0">
                  {initials}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
              </div>
            )}

            {/* لینک‌ها */}
            <nav className="flex-1 py-2 overflow-y-auto">
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-5 py-3 text-sm transition ${
                      isActive
                        ? 'text-pink-600 font-medium bg-pink-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* پایین پنل */}
            <div className="border-t border-gray-100 p-4">
              {isLoggedIn ? (
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm text-red-500 border border-red-100 rounded-xl hover:bg-red-50 transition"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"/></svg>
                  خروج
                </button>
              ) : (
                <div className="flex gap-2">
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center py-2.5 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                    ورود
                  </Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)} className="flex-1 text-center py-2.5 text-sm font-medium bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition">
                    ثبت‌نام
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;