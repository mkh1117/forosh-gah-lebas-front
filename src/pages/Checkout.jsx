import React, { useState } from "react";
import { useCart } from "../components/CartContext";

const Checkout = () => {
  const { cartItems, subtotal, shipping, discount, total } = useCart();

  // استیت فرم آدرس
  const [addressData, setAddressData] = useState({
    fullName: "",
    phone: "",
    province: "",
    city: "",
    postalCode: "",
    address: "",
    note: "",
  });

  // استیت روش ارسال (پیش‌فرض: پیشتاز)
  const [shippingMethod, setShippingMethod] = useState("express");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    // کد مربوط به ارسال داده‌ها به API و انتقال به درگاه پرداخت
    console.log("اطلاعات سفارش:", { addressData, shippingMethod, cartItems, total });
    alert("در حال انتقال به درگاه پرداخت...");
  };

  return (
    <div className="w-full text-gray-800" dir="rtl">
      <section className="mt-10 grid lg:grid-cols-3 gap-8 items-start">
        
        {/* ── فرم اطلاعات آدرس و روش ارسال ── */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              ثبت آدرس و تحویل
            </h1>
            <span className="text-sm text-pink-600 font-medium">مرحله ۲ از ۲</span>
          </div>

          <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-6">
            {/* باکس اطلاعات گیرنده */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
                اطلاعات گیرنده و آدرس
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    نام و نام خانوادگی *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={addressData.fullName}
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
                  name="postalCode"
                  value={addressData.postalCode}
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
                  placeholder="خیابان، پلاک، واحد..."
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

            {/* انتخاب روش ارسال */}
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
                    <p className="text-xs text-gray-500 mt-0.5">تحویل ۲۴ تا ۴۸ ساعت آینده</p>
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
                    <p className="text-xs text-gray-500 mt-0.5">تحویل ۳ تا ۵ روز کاری</p>
                  </div>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* ── خلاصه سفارش و پرداخت ── */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">خلاصه سفارش</h2>

            {/* مروری کوتاه بر اقلام سبد خرید */}
            <div className="max-h-52 overflow-y-auto space-y-3 mb-4 pr-1">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center gap-3 text-xs">
                  <img src={item.image} alt={item.title} className="w-12 h-14 object-cover rounded-lg bg-gray-100 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">{item.title}</p>
                    <p className="text-gray-400 mt-0.5">
                      {item.qty} عدد | سایز: {item.size}
                    </p>
                  </div>
                  <span className="font-semibold text-gray-700 flex-shrink-0">
                    {(item.price * item.qty).toLocaleString("fa-IR")} تومان
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
                <span>مبلغ نهایی پرداخت</span>
                <span className="text-pink-600">{total.toLocaleString("fa-IR")} تومان</span>
              </div>
            </div>

            {/* دکمه ارسال فرم */}
            <button
              type="submit"
              form="checkout-form"
              disabled={cartItems.length === 0}
              className="w-full mt-6 py-3.5 rounded-full bg-pink-600 text-white font-semibold hover:-translate-y-0.5 transition transform shadow-lg shadow-pink-200 disabled:opacity-60 cursor-pointer"
            >
              پرداخت و ثبت نهایی سفارش
            </button>

            <p className="text-xs text-gray-500 mt-3 text-center">
              🔒 اتصال مستقیم به درگاه بانکی شاپرک (پرداخت امن)
            </p>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Checkout;