import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import emptyAnimation from "/src/animations/Error 404.json"; // یا هر انیمیشن متناسب با سبد/سفارش خالی
import Sitefooter from "../components/footer";

const API_BASE = "http://127.0.0.1:8000/api";
const IMG_BASE = "http://127.0.0.1:8000/picture/";

const STATUS_MAP = {
  pending: { label: "در انتظار پرداخت", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  processing: { label: "در حال پردازش", color: "bg-blue-50 text-blue-700 border-blue-200" },
  shipped: { label: "ارسال شده", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  delivered: { label: "تحویل شده", color: "bg-green-50 text-green-700 border-green-200" },
  cancelled: { label: "لغو شده", color: "bg-red-50 text-red-700 border-red-200" },
};

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        // دریافت توکن خریدار در صورت نیاز (اگر از لاگین استفاده می‌کنید)
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/orders`, {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!res.ok) throw new Error(`خطا در دریافت لیست سفارشات (${res.status})`);
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // فیلتر سفارش‌ها بر اساس تب انتخاب‌شده
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    return order.status === activeTab;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-14 h-14 rounded-full border-4 border-pink-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="w-full px-4 md:px-12 py-8 text-gray-800">
        
        {/* ── عنوان + تب‌ها ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">سفارش‌های من</h1>
            <p className="text-sm text-gray-500 mt-1">پیگیری و مشاهده تاریخچه تمام خریدها</p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {[
              { id: "all", label: "همه" },
              { id: "processing", label: "در حال پردازش" },
              { id: "completed", label: "تحویل شده" },
              { id: "canceled", label: "لغو شده" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition flex-shrink-0 border ${
                  activeTab === tab.id
                    ? "bg-pink-600 text-white border-pink-600 shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── نمایش خطا ── */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-200 text-center mb-8">
            {error}
          </div>
        )}

        {/* ── لیست سفارشات ── */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm flex flex-col items-center justify-center">
            <Lottie animationData={emptyAnimation} className="w-56 h-56" />
            <h3 className="text-xl font-bold text-gray-800 mt-4">سفارشی یافت نشد!</h3>
            <p className="text-sm text-gray-400 mt-1 max-w-sm">
              شما هنوز سفارشی در این بخش ثبت نکرده‌اید یا هیچ موردی مطابق با فیلتر یافت نشد.
            </p>
            <Link
              to="/collection"
              className="mt-6 px-6 py-3 bg-pink-600 text-white font-semibold rounded-2xl hover:bg-pink-700 transition shadow-lg shadow-pink-200"
            >
              مشاهده محصولات و خرید
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const statusInfo = STATUS_MAP[order.status] || {
                label: order.status,
                color: "bg-gray-100 text-gray-700 border-gray-200",
              };

              return (
                <div
                  key={order.id}
                  className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition duration-200"
                >
                  {/* هدر کارت سفارش */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-4">
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="text-sm font-bold text-gray-900">
                        کد سفارش: <span className="text-pink-600">#{order.id}</span>
                      </span>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-xs text-gray-500">
                        تاریخ: {new Date(order.created_at).toLocaleDateString("fa-IR")}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border ${statusInfo.color}`}
                      >
                        {statusInfo.label}
                      </span>
                    </div>
                  </div>

                  {/* اطلاعات تحویل‌گیرنده */}
                  {(order.receiver_name || order.address) && (
                    <div className="bg-gray-50 rounded-2xl p-3 mb-4 text-xs text-gray-600 flex flex-wrap gap-x-6 gap-y-1">
                      {order.receiver_name && (
                        <p>
                          <span className="font-semibold text-gray-700">تحویل‌گیرنده:</span>{" "}
                          {order.receiver_name} ({order.phone})
                        </p>
                      )}
                      {order.address && (
                        <p className="truncate max-w-full">
                          <span className="font-semibold text-gray-700">آدرس:</span> {order.address}
                        </p>
                      )}
                    </div>
                  )}

                  {/* اقلام سفارش */}
                  <div className="space-y-3">
                    {order.items?.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-2 rounded-2xl hover:bg-gray-50/80 transition"
                      >
                        {/* تصویر محصول */}
                        <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-100">
                          <img
                            src={
                              item.post?.picture
                                ? IMG_BASE + item.post.picture.replace(/^posts\//, "")
                                : "/placeholder.png"
                            }
                            alt={item.post?.title || "محصول"}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* عنوان و مشخصات */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-gray-800 truncate">
                            {item.post?.title || "محصول حذف شده"}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            {item.size && (
                              <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                                سایز: {item.size}
                              </span>
                            )}
                            {item.color && (
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-gray-300 inline-block"
                                style={{ background: item.color }}
                                title={item.color}
                              />
                            )}
                            <span className="text-[11px] text-gray-400">
                              تعداد: {item.quantity} عدد
                            </span>
                          </div>
                        </div>

                        {/* قیمت کل آیتم */}
                        <div className="text-left flex-shrink-0">
                          <span className="text-sm font-bold text-gray-900">
                            {(item.price * item.quantity).toLocaleString("fa-IR")}
                          </span>
                          <span className="text-xs text-gray-500 mr-1">تومان</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* فوتر کارت سفارش — مبلغ کل */}
                  <div className="border-t border-gray-100 mt-4 pt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-500">مبلغ کل پرداخت شده:</span>
                    <span className="text-lg font-extrabold text-pink-600">
                      {Number(order.total_price).toLocaleString("fa-IR")}{" "}
                      <span className="text-xs font-normal text-gray-500">تومان</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Sitefooter />
    </div>
  );
};

export default Orders;