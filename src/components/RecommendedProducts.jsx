import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = "http://127.0.0.1:8000/api";
const IMG_BASE = "http://127.0.0.1:8000/picture/";

export default function RecommendedProducts({ currentProductId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (!currentProductId) return;

    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/products/${currentProductId}/recommendations`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("خطا در دریافت پیشنهادها:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [currentProductId]);

  if (loading) {
    return (
      <div className="px-4 md:px-12 py-8" dir="rtl">
        <h2 className="text-xl font-bold text-gray-800 mb-6">محصولات پیشنهادی</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-200 animate-pulse h-64 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="px-4 md:px-12 py-8" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          خریداران این محصول، این کالاها را هم دیده‌اند
        </h2>
        <div className="h-1 flex-1 bg-pink-100 mr-4 rounded-full hidden md:block" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col justify-between"
          >
            <div className="relative h-48 bg-gray-50 flex items-center justify-center p-3 overflow-hidden">
              <img
                src={IMG_BASE + item.picture.replace(/^posts\//,'')}
                alt={item.title}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
              />
            </div>

            <div className="p-4">
              <span className="text-[11px] font-semibold text-pink-500 bg-pink-50 px-2 py-0.5 rounded-md">
                {item.category}
              </span>
              <h3 className="text-sm font-bold text-gray-800 mt-2 truncate group-hover:text-pink-600 transition">
                {item.title}
              </h3>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900">
                  {Number(item.default_price).toLocaleString()} <span className="text-xs font-normal">تومان</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}