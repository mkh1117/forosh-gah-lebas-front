import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import emptyAnimation from "/src/animations/Error 404.json";
import Sitefooter from '../components/footer';
import { useCart } from '../components/CartContext';
import RecommendedProducts from "../components/RecommendedProducts";

const API_BASE = "http://127.0.0.1:8000/api";
const IMG_BASE = "http://127.0.0.1:8000/picture/";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct]         = useState(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [selectedSize, setSelectedSize]   = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity]       = useState(1);
  const [cartMsg, setCartMsg]         = useState(''); // '' | 'success' | 'warn'
  const [imgLoaded, setImgLoaded]     = useState(false);

  /* ── fetch ─────────────────────────────────────────────── */
  useEffect(() => {
    if (!productId) { setLoading(false); return; }

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      setImgLoaded(false);
      try {
        const res = await fetch(`${API_BASE}/products/${productId}`);
        if (!res.ok) throw new Error(`محصول پیدا نشد (${res.status})`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const { addToCart } = useCart();

  /* ── add to cart ────────────────────────────────────────── */
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      setCartMsg('warn');
      setTimeout(() => setCartMsg(''), 2500);
      return;
    }
    addToCart({
      id: product.id,
      title: product.title,
      price: finalPrice,  // قیمت variant انتخاب‌شده (با احتساب تخفیف)
      image: IMG_BASE + product.picture,
      size: selectedSize,
      color: selectedColor,
      qty: quantity,
    });
    setCartMsg('success');
    setTimeout(() => setCartMsg(''), 2500);
  };

  /* ── states ─────────────────────────────────────────────── */
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-14 h-14 rounded-full border-4 border-pink-500 border-t-transparent animate-spin" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" dir="rtl">
      <Lottie animationData={emptyAnimation} className="w-64 h-64" />
      <p className="text-gray-500 text-lg">{error}</p>
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition font-semibold"
      >
        بازگشت
      </button>
    </div>
  );

  if (!product) return null;

  /* ── helpers ─────────────────────────────────────────────── */
  const variants = product.variants || [];
  const sizes  = product.sizes  || [];
  const colors = product.colors || [];

  // variant انتخاب‌شده بر اساس رنگ + سایز
  const selectedVariant = (selectedSize && selectedColor)
    ? variants.find((v) => v.size === selectedSize && v.color === selectedColor)
    : null;

  // سایزهای موجود برای رنگ انتخاب‌شده (اگر رنگی انتخاب نشده همه رو نشون بده)
  const availableSizes = selectedColor
    ? variants.filter((v) => v.color === selectedColor && v.stock > 0).map((v) => v.size)
    : sizes;

  // رنگ‌های موجود برای سایز انتخاب‌شده
  const availableColors = selectedSize
    ? variants.filter((v) => v.size === selectedSize && v.stock > 0).map((v) => v.color)
    : colors;

  const hasSaleActive =
    product.has_discount &&
    product.discount_percent &&
    (() => {
      const today = new Date().toISOString().split('T')[0];
      const afterStart  = !product.discount_start || product.discount_start <= today;
      const beforeEnd   = !product.discount_end   || product.discount_end   >= today;
      return afterStart && beforeEnd;
    })();

  // قیمت پایه: اگه variant انتخاب شده قیمت خودش رو داره استفاده کن، وگرنه قیمت پیش‌فرض محصول
  const basePrice = selectedVariant?.price ?? product.price;
  const finalPrice = hasSaleActive
    ? Math.round(basePrice * (1 - product.discount_percent / 100))
    : basePrice;

  /* ── render ─────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">

      {/* ── breadcrumb ── */}
      <div className="px-4 md:px-12 pt-6 pb-2 text-sm text-gray-400 flex gap-2 items-center flex-wrap">
        <button onClick={() => navigate('/')} className="hover:text-pink-500 transition">خانه</button>
        <span>/</span>
        <button
          onClick={() => navigate(`/collection?category=${product.category}`)}
          className="hover:text-pink-500 transition"
        >
          {product.category}
        </button>
        <span>/</span>
        <span className="text-gray-700 font-medium">{product.title}</span>
      </div>

      {/* ── main card ── */}
<div className="px-4 md:px-12 py-6">
  <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">

    {/* تصویر - تغییرات در این دیو و تگ img اعمال شده است */}
    <div className="lg:w-1/2 bg-gray-100 relative h-[350px] md:h-[500px] lg:h-[600px] flex items-center justify-center overflow-hidden p-4">
      {!imgLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="w-10 h-10 rounded-full border-4 border-pink-300 border-t-transparent animate-spin" />
        </div>
      )}
      <img
        src={IMG_BASE + product.picture}
        alt={product.title}
        onLoad={() => setImgLoaded(true)}
        
        className={`max-w-full max-h-full object-contain transition-opacity duration-500 ${
          imgLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {hasSaleActive && (
        <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg z-20">
          {product.discount_percent}٪ تخفیف
        </div>
      )}
    </div>


          {/* اطلاعات */}
          <div className="lg:w-1/2 p-6 md:p-10 flex flex-col gap-6">

            {/* عنوان + دسته */}
            <div>
              <span className="inline-block text-xs font-semibold text-pink-600 bg-pink-50 border border-pink-200 px-3 py-1 rounded-full mb-3">
                {product.category}
              </span>
              <h1 className="text-3xl font-extrabold text-gray-900 leading-snug">
                {product.title}
              </h1>
            </div>

            {/* قیمت */}
            <div className="flex items-end gap-3 flex-wrap">
              <span className="text-3xl font-bold text-pink-600">
                {finalPrice.toLocaleString()}
                <span className="text-base font-normal mr-1">تومان</span>
              </span>
              {hasSaleActive && (
                <span className="text-lg text-gray-400 line-through">
                  {basePrice.toLocaleString()} تومان
                </span>
              )}
              {/* نشان موجودی variant */}
              {selectedVariant && (
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  selectedVariant.stock > 0
                    ? 'bg-green-50 text-green-600'
                    : 'bg-red-50 text-red-500'
                }`}>
                  {selectedVariant.stock > 0 ? `${selectedVariant.stock} عدد موجود` : 'ناموجود'}
                </span>
              )}
            </div>
            {/* راهنمای انتخاب */}
            {!selectedVariant && (
              <p className="text-xs text-gray-400 -mt-4">
                سایز و رنگ را انتخاب کنید تا قیمت دقیق نمایش داده شود
              </p>
            )}

            {/* توضیحات */}
            {product.content && (
              <p className="text-gray-500 leading-8 text-sm border-t border-b border-gray-100 py-4">
                {product.content}
              </p>
            )}

            {/* سایز */}
            {sizes.length > 0 && (
              <div>
                <p className="text-sm font-bold text-gray-700 mb-2">
                  سایز:
                  {selectedSize && (
                    <span className="mr-2 text-pink-500">{selectedSize}</span>
                  )}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map((size) => {
                    const isAvailable = availableSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => isAvailable && setSelectedSize(selectedSize === size ? null : size)}
                        disabled={!isAvailable}
                        className={`w-12 h-12 rounded-xl border-2 font-semibold text-sm transition ${
                          selectedSize === size
                            ? 'border-pink-600 bg-pink-600 text-white shadow-md'
                            : isAvailable
                            ? 'border-gray-200 bg-white text-gray-700 hover:border-pink-300'
                            : 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed line-through'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* رنگ */}
            {colors.length > 0 && (
              <div>
                <p className="text-sm font-bold text-gray-700 mb-2">رنگ:</p>
                <div className="flex gap-3">
                  {colors.map((color) => {
                    const isAvailable = availableColors.includes(color);
                    return (
                      <button
                        key={color}
                        title={color}
                        onClick={() => isAvailable && setSelectedColor(selectedColor === color ? null : color)}
                        disabled={!isAvailable}
                        className={`w-9 h-9 rounded-full border-4 shadow transition ${
                          selectedColor === color
                            ? 'border-pink-500 scale-110'
                            : isAvailable
                            ? 'border-white hover:scale-105'
                            : 'border-white opacity-30 cursor-not-allowed'
                        }`}
                        style={{
                          background: color,
                          outline: selectedColor === color ? '2px solid #ec4899' : '2px solid #e5e7eb',
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* تعداد */}
            <div className="flex items-center gap-4">
              <p className="text-sm font-bold text-gray-700">تعداد:</p>
              <div className="flex items-center rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 bg-gray-50 hover:bg-gray-100 text-xl font-bold text-gray-600 transition"
                >
                  −
                </button>
                <span className="w-12 text-center font-bold text-gray-800">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 bg-gray-50 hover:bg-gray-100 text-xl font-bold text-gray-600 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* پیام هشدار/موفقیت */}
            {cartMsg === 'warn' && (
              <div className="text-sm text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-2">
                ⚠️ لطفاً ابتدا سایز و رنگ را انتخاب کنید.
              </div>
            )}
            {cartMsg === 'success' && (
              <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-2">
                ✓ محصول با موفقیت به سبد خرید اضافه شد.
              </div>
            )}

            {/* دکمه سبد */}
            <button
              onClick={handleAddToCart}
              disabled={selectedVariant?.stock === 0}
              className={`w-full py-4 rounded-2xl text-lg font-bold transition-all shadow-md ${
                selectedVariant?.stock === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : cartMsg === 'success'
                  ? 'bg-green-500 text-white'
                  : 'bg-pink-600 hover:bg-pink-700 active:scale-95 text-white'
              }`}
            >
              {selectedVariant?.stock === 0
                ? '✕ این ترکیب ناموجود است'
                : cartMsg === 'success'
                ? '✓ اضافه شد!'
                : '🛒 افزودن به سبد خرید'}
            </button>

            {/* یادداشت تخفیف */}
            {hasSaleActive && product.discount_note && (
              <p className="text-xs text-gray-400 text-center">
                📌 {product.discount_note}
              </p>
            )}

          </div>
        </div>
      </div>
      <RecommendedProducts currentProductId={product.id} />
      <Sitefooter />
    </div>
  );
};

export default Product;