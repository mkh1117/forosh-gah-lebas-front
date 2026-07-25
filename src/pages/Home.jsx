import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Sitefooter from '../components/footer'
import Lottie from "lottie-react";
import emptyAnimation from "/src/animations/Error 404.json";

const IMG_BASE = "http://127.0.0.1:8000/picture/";

const CATEGORIES = [
  { title: "مردانه",   img: "/images/p_img2_1.png",                                   emoji: "👔" },
  { title: "زنانه",    img: "/images/Manteau-long.jpg",                               emoji: "👗" },
  { title: "کفش",      img: "/images/air-jordan-1-low-womens-aluminum-dc0774-141-1.jpg", emoji: "👟" },
  { title: "اکسسوری", img: "/images/accessory2.jpg",                                  emoji: "💍" },
];

const STATS = [
  { value: "+۵۰۰۰", label: "محصول متنوع" },
  { value: "+۱۲۰۰۰", label: "مشتری راضی" },
  { value: "۷ روز", label: "ضمانت بازگشت" },
];

// کامپوننت اسکلتون برای لودینگ جذاب‌تر محصولات
const ProductSkeleton = () => (
  <div className="animate-pulse bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col gap-3">
    <div className="w-full aspect-[3/4] bg-gray-200 rounded-xl" />
    <div className="h-4 bg-gray-200 rounded w-2/3 mt-2" />
    <div className="h-4 bg-gray-200 rounded w-1/3" />
    <div className="h-8 bg-gray-200 rounded-xl w-full mt-2" />
  </div>
);

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/off');
      if (!res.ok) throw new Error('خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
      setProducts(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full text-gray-800 antialiased selection:bg-pink-500 selection:text-white" dir="rtl">

      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white mt-6 shadow-2xl">
        {/* هاله های نوری بک‌گراند */}
        <div className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] bg-pink-600/20 blur-[120px] rounded-full" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-violet-600/15 blur-[120px] rounded-full" />

        <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12 px-6 sm:px-12 md:px-16 py-16 md:py-24">
          
          {/* محتوای متنی */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right max-w-xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-pink-300 backdrop-blur-md">
              🔥 کالکشن جدید تابستان 1405
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.15] tracking-tight text-white">
              استایل منحصربه‌فردت رو
              <br />
              <span className="bg-gradient-to-l from-pink-600 via-rose-400 to-violet-100 bg-clip-text text-transparent">
                امروز خلق کن
              </span>
            </h1>

            <p className="mt-6 text-gray-400 text-sm sm:text-base leading-8 max-w-md">
              مجموعه‌ای دست‌چین شده از پوشاک زنانه و مردانه با طراحی مدرن، بالاترین کیفیت پارچه و قیمتی که شگفت‌زده‌تان می‌کند.
            </p>

            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4 w-full sm:w-auto">
              <Link
                to="/collection"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-pink-500/20 active:scale-95"
              >
                مشاهده محصولات
              </Link>
              <Link
                to="/collection?sale_only=true"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-full border border-gray-700 hover:border-gray-500 hover:bg-white/5 text-gray-300 font-semibold transition-all duration-300 active:scale-95"
              >
                تخفیف‌های ویژه %
              </Link>
            </div>

            {/* آمار ارقام */}
            <div className="mt-12 flex gap-12 border-t border-gray-800/60 pt-8 w-full justify-center md:justify-start">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col items-center md:items-start">
                  <span className="text-2xl md:text-3xl font-black text-white tracking-tight">{s.value}</span>
                  <span className="text-xs text-gray-400 mt-1 font-medium">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* تصویر هیرو */}
          <div className="relative flex-shrink-0 w-full max-w-[320px] md:max-w-[420px]">
            <div className="absolute inset-0 m-auto w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-tr from-pink-500 to-violet-600 blur-[80px] opacity-30 animate-pulse" />
            <img
              src="/images/pngwing.com(20).png"
              alt="Fashion hero"
              className="relative w-full object-contain drop-shadow-[0_32px_50px_rgba(236,72,153,0.3)] hover:scale-[1.03] transition duration-700 ease-out select-none"
            />
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          TRUST BAR
      ══════════════════════════════════════════ */}
      <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: "🚚", title: "ارسال سریع و مطمئن", sub: "تهران زیر ۲۴ ساعت، شهرستان‌ها ۳ روزه" },
          { icon: "🔄", title: "۷ روز ضمانت بازگشت", sub: "تعویض یا مرجوعی بدون قید و شرط" },
          { icon: "🔒", title: "پرداخت امن آنلاین", sub: "اتصال به درگاه‌های رسمی و معتبر" },
          { icon: "🎁", title: "بسته‌بندی اختصاصی", sub: "امکان ارسال به صورت هدیه شکیل" },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-4 bg-white border border-gray-100/80 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <span className="text-3xl p-2 bg-gray-50 rounded-xl">{item.icon}</span>
            <div>
              <p className="text-sm font-bold text-gray-900">{item.title}</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{item.sub}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ══════════════════════════════════════════
          CATEGORIES
      ══════════════════════════════════════════ */}
      <section className="mt-20">
        <div className="flex items-end justify-between mb-8 px-1">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">خرید بر اساس دسته‌بندی</h2>
            <p className="text-xs text-gray-400 mt-1">دسته‌بندی مورد نظر خود را انتخاب کنید</p>
          </div>
          <Link to="/collection" className="text-sm text-pink-500 hover:text-pink-600 font-bold flex items-center gap-1 transition-colors">
            همه محصولات <span className="text-xs">←</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              to={`/collection?category=${cat.title}`}
              className="group relative rounded-2.5xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer aspect-[3/4]"
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-750 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/20 to-transparent flex flex-col items-center justify-end pb-6 gap-2 transition-all group-hover:via-gray-950/40">
                <span className="text-2xl p-2 bg-white/10 backdrop-blur-md rounded-full transform group-hover:scale-110 transition duration-300">{cat.emoji}</span>
                <span className="text-white text-lg font-bold tracking-wide drop-shadow-sm">{cat.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SALE PRODUCTS
      ══════════════════════════════════════════ */}
      <section className="mt-24">
        <div className="flex items-end justify-between mb-8 px-1">
          <div>
            <span className="text-xs font-bold text-pink-500 uppercase tracking-widest bg-pink-50 px-2.5 py-1 rounded-md">پیشنهاد ویژه امروز</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-2">تخفیف‌های داغ شگفت‌انگیز 🔥</h2>
          </div>
          <Link to="/collection?sale_only=true" className="text-sm text-pink-500 hover:text-pink-600 font-bold flex items-center gap-1 transition-colors">
            مشاهده همه <span className="text-xs">←</span>
          </Link>
        </div>

        {loading ? (
          // نمایش کارت های اسکلتون در زمان لودینگ
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => <ProductSkeleton key={n} />)}
          </div>
        ) : error ? (
          // استایل زیباتر همراه با دکمه تلاش مجدد برای ارور
          <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <Lottie animationData={emptyAnimation} className="w-44 h-44 opacity-80" />
            <p className="text-gray-600 font-medium mt-4">{error}</p>
            <button 
              onClick={fetchProducts}
              className="mt-4 px-6 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
            >
              تلاش مجدد 🔄
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard
                fromCollection
                key={p.id}
                id={p.id}
                title={p.title}
                price={p.price}
                category={p.category}
                image={IMG_BASE + p.picture}
                sale={p.has_discount}
                discount_percent={p.discount_percent}
              />
            ))}
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════
          FULL-WIDTH BANNER
      ══════════════════════════════════════════ */}
      <section className="mt-24 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white p-12 md:p-20 text-center shadow-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12),transparent_75%)]" />
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-pink-100 mb-4 bg-white/10 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
            جشنواره پایان فصل
          </p>
          <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">تا ۵۰٪ تخفیف واقعی</h2>
          <p className="text-sm md:text-base text-pink-50 leading-relaxed opacity-90 mb-8">
            روی تمام محصولات منتخب کالکشن بهار و تابستان. فرصت را از دست ندهید، موجودی محدود است!
          </p>
          <Link
            to="/collection"
            className="inline-block bg-white text-pink-600 px-10 py-4 rounded-full text-base font-bold hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-lg shadow-black/10 active:scale-95"
          >
            همین حالا خرید کنید
          </Link>
        </div>
      </section>

      <div className="mt-24">
        <Sitefooter />
      </div>
    </div>
  );
};

export default Home;