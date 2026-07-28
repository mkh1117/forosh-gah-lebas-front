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

  const initialCategory = new URLSearchParams(location.search).get("category") || "همه";

  const [filter, setFilter] = useState(initialCategory);
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

 
  useEffect(() => {
    const cat = new URLSearchParams(location.search).get("category") || "همه";
    setFilter(cat);
  }, [location.search]);

  
  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();

        const categoryEn = CATEGORY_MAP[filter];
        if (categoryEn) params.set("category", categoryEn);

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
  }, [filter, selectedSizes, selectedColors, saleOnly, priceRange]);

  const toggleSize = (s) =>
    setSelectedSizes((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
  const toggleColor = (c) =>
    setSelectedColors((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  const handleCategoryClick = (cat) => {
    setFilter(cat);
    navigate(`/collection?category=${cat}`, { replace: true });
  };

  return (
    <div className="w-full px-2 md:px-8 lg:px-16" dir="rtl">
      {/* بنر */}
      <img
        src={categoryBanner[filter] ?? categoryBanner["همه"]}
        alt={filter}
        className="w-full h-48 md:h-100 object-cover rounded-2xl shadow-lg"
      />

      <h1 className="text-4xl font-bold my-8 text-gray-900">محصولات</h1>

      {/* دسته‌بندی */}
      <div className="flex gap-4 flex-wrap mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`px-4 py-2 rounded-xl font-semibold border shadow-sm transition ${
              filter === cat
                ? "bg-pink-600 text-white shadow-md border-pink-700 scale-105"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* فیلترها */}
      <div className="w-full md:w-64 bg-gray-50 rounded-2xl shadow-lg p-4 border flex flex-col top-4 h-fit mb-10">
        <h2 className="text-xl font-bold mb-4 text-gray-800">فیلترها</h2>
        <div className="space-y-3">
          <details className="group border rounded-xl p-3 bg-white shadow-md">
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

          <details className="group border rounded-xl p-3 bg-white shadow-md">
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
                      : "border-gray-400"
                  }`}
                  style={{ background: color }}
                />
              ))}
            </div>
          </details>

          <details className="group border rounded-xl p-3 bg-white shadow-md">
            <summary className="cursor-pointer flex justify-between font-semibold text-gray-700">
              وضعیت تخفیف <span className="transition group-open:rotate-180">⌄</span>
            </summary>
            <div className="mt-3 flex items-center gap-2">
              <input
                type="checkbox"
                checked={saleOnly}
                onChange={(e) => setSaleOnly(e.target.checked)}
                className="w-5 h-5 accent-pink-600"
              />
              <label className="text-gray-700">فقط محصولات حراجی</label>
            </div>
          </details>

          {/* فیلتر قیمت دینامیک */}
          <details className="group border rounded-xl p-3 bg-white shadow-md" open>
            <summary className="cursor-pointer flex justify-between font-semibold text-gray-700">
              قیمت <span className="transition group-open:rotate-180">⌄</span>
            </summary>
            <div className="mt-5" dir="ltr">
              <PriceRangeSlider
                min={absoluteMinPrice}
                max={absoluteMaxPrice}
                onChange={(range) => setPriceRange(range)}
              />
              <p className="text-gray-600 text-center mt-2 text-sm">
                {priceRange[0].toLocaleString()} تومان – {priceRange[1].toLocaleString()} تومان
              </p>
            </div>
          </details>
        </div>
      </div>

      {/* محصولات */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <p className="text-center text-red-500 mt-10">{error}</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} fromCollection />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center text-center mt-16">
          <Lottie animationData={emptyAnimation} className="w-64 h-64" />
          <p className="text-gray-600 text-xl mt-4">محصولی در این دسته‌بندی پیدا نشد!</p>
        </div>
      )}

      <Sitefooter />
    </div>
  );
};

export default Collection;

