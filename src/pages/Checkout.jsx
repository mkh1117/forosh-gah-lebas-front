import React, { useState } from "react";
import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000/api";

const Checkout = () => {
  const { cartItems, subtotal, shipping, discount, total, clearCart } = useCart();
  const navigate = useNavigate();

  // استیت‌های فرم
  const [addressData, setAddressData] = useState({
    receiver_name: "",
    phone: "",
    province: "",
    city: "",
    postal_code: "",
    address: "",
    note: "",
  });

  const [shippingMethod, setShippingMethod] = useState("express");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (cartItems.length === 0) {
      alert("سبد خرید شما خالی است!");
      return;
    }

    setLoading(true);

   
    const fullAddress = `استان ${addressData.province}، شهر ${addressData.city}، ${addressData.address} ${
      addressData.postal_code ? `(کد پستی: ${addressData.postal_code})` : ""
    } ${addressData.note ? `- توضیحات: ${addressData.note}` : ""}`;

    
    const orderPayload = {
      receiver_name: addressData.receiver_name,
      phone: addressData.phone,
      address: fullAddress.trim(),
      items: cartItems.map((item) => ({
        product_variant_id: item.variant_id || item.product_variant_id || item.id,
        quantity: Number(item.qty || item.quantity || 1),
      })),
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (response.ok) {
        if (clearCart) clearCart();
        alert(data.message || "سفارش با موفقیت ثبت شد.");
        navigate(`/orders`);
      } else {
        // دریافت خطاهای Validation یا خطای عدم موجودی از لاراول
        if (data.errors) {
          const firstError = Object.values(data.errors)[0][0];
          setErrorMessage(firstError);
        } else {
          setErrorMessage(data.message || "خطا در ثبت سفارش.");
        }
      }
    } catch (error) {
      console.error("خطا در ارتباط با سرور:", error);
      setErrorMessage("اتصال به سرور برقرار نشد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full text-gray-800" dir="rtl">
      <section className="mt-10 grid lg:grid-cols-3 gap-8 items-start">
        {/* ── فرم دریافت آدرس ── */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              ثبت آدرس و تحویل
            </h1>
            <span className="text-sm text-pink-600 font-medium">مرحله ۲ از ۲</span>
          </div>

          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
              {errorMessage}
            </div>
          )}

          <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
                اطلاعات گیرنده و آدرس
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    نام و نام خانوادگی گیرنده *
                  </label>
                  <input
                    type="text"
                    name="receiver_name"
                    required
                    value={addressData.receiver_name}
                    onChange={handleInputChange}
                    placeholder="مثلاً: سارا احمدی"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    شماره موبایل *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={addressData.phone}
                    onChange={handleInputChange}
                    placeholder="۰۹۱۲XXXXXXX"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    استان *
                  </label>
                  <input
                    type="text"
                    name="province"
                    required
                    value={addressData.province}
                    onChange={handleInputChange}
                    placeholder="تهران"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    شهر *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={addressData.city}
                    onChange={handleInputChange}
                    placeholder="تهران"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  کد پستی (۱۰ رقمی)
                </label>
                <input
                  type="text"
                  name="postal_code"
                  value={addressData.postal_code}
                  onChange={handleInputChange}
                  placeholder="۱۲۳۴۵۶۷۸۹۰"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  آدرس دقیق پستی *
                </label>
                <textarea
                  rows="3"
                  name="address"
                  required
                  value={addressData.address}
                  onChange={handleInputChange}
                  placeholder="خیابان، کوچه، پلاک، واحد..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  توضیحات تکمیلی (اختیاری)
                </label>
                <input
                  type="text"
                  name="note"
                  value={addressData.note}
                  onChange={handleInputChange}
                  placeholder="مثلاً: تحویل به نگهبانی"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
                />
              </div>
            </div>

            {/* روش ارسال */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
                روش ارسال
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  onClick={() => setShippingMethod("express")}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${
                    shippingMethod === "express"
                      ? "border-pink-500 bg-pink-50/40"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === "express"}
                    onChange={() => {}}
                    className="accent-pink-600"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">ارسال اکسپرس / پیک</p>
                  </div>
                </label>

                <label
                  onClick={() => setShippingMethod("post")}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${
                    shippingMethod === "post"
                      ? "border-pink-500 bg-pink-50/40"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === "post"}
                    onChange={() => {}}
                    className="accent-pink-600"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">پست پیشتاز</p>
                  </div>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* ── خلاصه سفارش و دکمه پرداخت ── */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">خلاصه سفارش</h2>

            <div className="max-h-52 overflow-y-auto space-y-3 mb-4 pr-1">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center gap-3 text-xs">
                  {item.image && (
                    <img src={item.image} alt={item.title} className="w-12 h-14 object-cover rounded-lg bg-gray-100 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">{item.title}</p>
                    <p className="text-gray-400 mt-0.5">
                      {item.qty || item.quantity} عدد {item.size ? `| سایز: ${item.size}` : ""} {item.color ? `| رنگ: ${item.color}` : ""}
                    </p>
                  </div>
                  <span className="font-semibold text-gray-700 flex-shrink-0">
                    {((item.price) * (item.qty || item.quantity)).toLocaleString("fa-IR")} تومان
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-3 text-sm text-gray-700">
              <div className="flex items-center justify-between">
                <span>جمع کل اقلام</span>
                <span>{subtotal.toLocaleString("fa-IR")} تومان</span>
              </div>
              <div className="flex items-center justify-between">
                <span>هزینه ارسال</span>
                <span>{shipping === 0 ? "رایگان" : `${shipping.toLocaleString("fa-IR")} تومان`}</span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between text-pink-600 font-semibold">
                  <span>تخفیف</span>
                  <span>- {discount.toLocaleString("fa-IR")} تومان</span>
                </div>
              )}
              <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-base font-bold text-gray-900">
                <span>مبلغ نهایی</span>
                <span className="text-pink-600">{total.toLocaleString("fa-IR")} تومان</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={cartItems.length === 0 || loading}
              className="w-full mt-6 py-3.5 rounded-full bg-pink-600 text-white font-semibold hover:-translate-y-0.5 transition transform shadow-lg shadow-pink-200 disabled:opacity-60 cursor-pointer flex justify-center items-center gap-2"
            >
              {loading ? "در حال ثبت سفارش..." : "ثبت و پرداخت نهایی سفارش"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;