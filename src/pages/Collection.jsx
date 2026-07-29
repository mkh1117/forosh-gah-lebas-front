import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import emptyAnimation from "/src/animations/Error 404.json";
import PriceRangeSlider from "../components/PriceRangeBar";
import Sitefooter from "../components/footer";

const API_BASE = "http://127.0.0.1:8000/api";
const IMG_BASE = "http://127.0.0.1:8000/picture/";

const CATEGORIES = ["همه", "مردانه", "زنانه", "کفش", "اکسسوری"];
const ALL_SIZES = ["S", "M", "L", "XL", "2XL"];
const ALL_COLORS = ["black", "white", "red", "blue", "green"];

const CATEGORY_MAP = {
  همه: null,
  مردانه: "men",
  زنانه: "women",
  کفش: "shoes",
  اکسسوری: "accessories",
};

const categoryBanner = {
  همه: "/images/clark-street-mercantile-P3pI6xzovu0-unsplash.jpg",
  مردانه: "/images/mnz-ToLMORRb97Q-unsplash.jpg",
  زنانه: "/images/pexels-lum3n-44775-167703.jpg",
  کفش: "/images/joel-muniz-ZnSAwVMJ13Y-unsplash.jpg",
  اکسسوری: "/images/yasara-hansani-p8BxOM6j_ec-unsplash.jpg",
};

const Collection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "همه";
  const initialSearch = queryParams.get("search") || "";

  const [filter, setFilter] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [saleOnly, setSaleOnly] = useState(false);

  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [absoluteMinPrice, setAbsoluteMinPrice] = useState(0);
  const [absoluteMaxPrice, setAbsoluteMaxPrice] = useState(10000000);
  const [isPriceLoaded, setIsPriceLoaded] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce برای ورودی سرچ جهت جلوگیری از Fetchهای پشت سر هم
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // سینک با URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category") || "همه";
    const search = params.get("search") || "";
    setFilter(cat);
    setSearchTerm(search);
  }, [location.search]);

  // دریافت اطلاعات از سرور
  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();

        const categoryEn = CATEGORY_MAP[filter];
        if (categoryEn) params.set("category", categoryEn);
        if (debouncedSearch.trim()) params.set("search", debouncedSearch.trim());
        if (selectedSizes.length) params.set("sizes", selectedSizes.join(","));
        if (selectedColors.length) params.set("colors", selectedColors.join(","));
        if (saleOnly) params.set("sale_only", "true");

        if (isPriceLoaded) {
          params.set("min_price", priceRange[0]);
          params.set("max_price", priceRange[1]);
        }

        const res = await fetch(`${API_BASE}/products?${params}`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`خطا در دریافت محصولات (${res.status})`);
        const data = await res.json();

        if (!isPriceLoaded && data.max_price) {
          setAbsoluteMinPrice(data.min_price);
          setAbsoluteMaxPrice(data.max_price);
          setPriceRange([data.min_price, data.max_price]);
          setIsPriceLoaded(true);
        }

        const productList = data.products || data;

        setProducts(
          productList.map((p) => ({
            ...p,
            image: IMG_BASE + p.picture,
          }))
        );
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, [filter, debouncedSearch, selectedSizes, selectedColors, saleOnly, priceRange]);

  const toggleSize = (s) =>
    setSelectedSizes((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
  const toggleColor = (c) =>
    setSelectedColors((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  const handleCategoryClick = (cat) => {
    setFilter(cat);
    updateURL(cat, searchTerm);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    updateURL(filter, val);
  };

  const updateURL = (cat, search) => {
    const params = new URLSearchParams();
    if (cat && cat !== "همه") params.set("category", cat);
    if (search.trim()) params.set("search", search.trim());
    navigate(`/collection?${params.toString()}`, { replace: true });
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-16 my-6" dir="rtl">
      {/* بنر اصلی */}
      <img
        src={categoryBanner[filter] ?? categoryBanner["همه"]}
        alt={filter}
        className="w-full h-48 md:h-80 object-cover rounded-2xl shadow-lg mb-8"
      />

      {/* سربرگ و باکس جستجو */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">محصولات</h1>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="جستجوی نام یا مشخصات محصول..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition shadow-sm"
          />
          <svg
  className="w-5 h-5 absolute left-3 top-3 text-gray-400"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  />
</svg>
        </div>
      </div>

      {/* دکمه‌های دسته‌بندی */}
      <div className="flex gap-3 flex-wrap mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`px-5 py-2 rounded-xl font-medium border transition duration-200 ${
              filter === cat
                ? "bg-pink-600 text-white border-pink-600 shadow-md scale-105"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* بخش اصلی: فیلترها و لیست محصولات کنار هم */}
      <div className="flex flex-col lg:flex-row gap-8 items-start mb-16">
        {/* فیلترها (سمت راست در حالت دسکتاپ) */}
        <aside className="w-full lg:w-72 bg-gray-50 rounded-2xl shadow-sm p-4 border border-gray-200 lg:sticky lg:top-4">
          <h2 className="text-lg font-bold mb-4 text-gray-800">فیلترها</h2>
          <div className="space-y-3">
            {/* سایز */}
            <details className="group border border-gray-200 rounded-xl p-3 bg-white shadow-sm">
              <summary className="cursor-pointer flex justify-between items-center font-semibold text-gray-700">
                سایز <span className="transition group-open:rotate-180">⌄</span>
              </summary>
              <div className="mt-3 flex gap-2 flex-wrap">
                {ALL_SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1 rounded-lg text-sm border transition ${
                      selectedSizes.includes(size)
                        ? "bg-pink-600 text-white border-pink-700 shadow"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </details>

            {/* رنگ */}
            <details className="group border border-gray-200 rounded-xl p-3 bg-white shadow-sm">
              <summary className="cursor-pointer flex justify-between font-semibold text-gray-700">
                رنگ <span className="transition group-open:rotate-180">⌄</span>
              </summary>
              <div className="mt-3 flex gap-3 flex-wrap">
                {ALL_COLORS.map((color) => (
                  <div
                    key={color}
                    onClick={() => toggleColor(color)}
                    className={`w-7 h-7 rounded-full cursor-pointer border-2 shadow transition ${
                      selectedColors.includes(color)
                        ? "border-pink-600 scale-110"
                        : "border-gray-300"
                    }`}
                    style={{ background: color }}
                  />
                ))}
              </div>
            </details>

            {/* حراجی */}
            <details className="group border border-gray-200 rounded-xl p-3 bg-white shadow-sm">
              <summary className="cursor-pointer flex justify-between font-semibold text-gray-700">
                وضعیت تخفیف <span className="transition group-open:rotate-180">⌄</span>
              </summary>
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={saleOnly}
                  onChange={(e) => setSaleOnly(e.target.checked)}
                  className="w-5 h-5 accent-pink-600 rounded"
                />
                <label className="text-gray-700 text-sm">فقط محصولات حراجی</label>
              </div>
            </details>

            {/* قیمت */}
            <details className="group border border-gray-200 rounded-xl p-3 bg-white shadow-sm" open>
              <summary className="cursor-pointer flex justify-between font-semibold text-gray-700">
                قیمت <span className="transition group-open:rotate-180">⌄</span>
              </summary>
              <div className="mt-5" dir="ltr">
                <PriceRangeSlider
                  min={absoluteMinPrice}
                  max={absoluteMaxPrice}
                  onChange={(range) => setPriceRange(range)}
                />
                <p className="text-gray-600 text-center mt-3 text-xs" dir="rtl">
                  {priceRange[0].toLocaleString()} تومان – {priceRange[1].toLocaleString()} تومان
                </p>
              </div>
            </details>
          </div>
        </aside>

        {/* لیست محصولات (سمت چپ) */}
        <main className="flex-1 w-full">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <p className="text-center text-red-500 mt-10">{error}</p>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} fromCollection />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center text-center mt-12">
              <Lottie animationData={emptyAnimation} className="w-56 h-56" />
              <p className="text-gray-600 text-lg mt-4">محصولی با این مشخصات یافت نشد!</p>
            </div>
          )}
        </main>
      </div>

      <Sitefooter />
    </div>
  );
};

export default Collection;