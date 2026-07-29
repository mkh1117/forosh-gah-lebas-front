import React, { useState, useEffect } from "react";
import { User, Mail, Phone, Lock, CheckCircle, AlertCircle, Loader2 } from "lucide-react"; // در صورت عدم نصب Lucide می‌توانید از آیکون‌های دیگر یا SVG استفاده کنید
import Sitefooter from "../components/footer";

const API_BASE = "http://127.0.0.1:8000/api";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // ۱. دریافت اطلاعات اولیه کاربر از ای‌پای‌آی
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/user`, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!res.ok) throw new Error("خطا در دریافت اطلاعات پروفایل");

        const data = await res.json();
        setFormData((prev) => ({
          ...prev,
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
        }));
      } catch (err) {
        setMessage({ type: "error", text: err.message });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // هندلر تغییرات اینپوت‌ها
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ۲. ارسال اطلاعات ویرایش‌شده به بک‌اند
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", text: "" });

    // اعتبارسنجی اولیه پسورد در فرانت
    if (formData.new_password && formData.new_password !== formData.new_password_confirmation) {
      setMessage({ type: "error", text: "رمز عبور جدید و تکرار آن یکسان نیستند." });
      setSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "خطا در بروزرسانی اطلاعات");
      }

      setMessage({ type: "success", text: "اطلاعات پروفایل با موفقیت بروزرسانی شد." });
      
      // پاک کردن فیلدهای پسورد پس از موفقیت
      setFormData((prev) => ({
        ...prev,
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      }));
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-14 h-14 rounded-full border-4 border-pink-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 text-gray-800">
        
        {/* عنوان صفحه */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">پروفایل کاربری</h1>
          <p className="text-sm text-gray-500 mt-1">مشاهده و ویرایش مشخصات شخصی و حساب کاربری</p>
        </div>

        {/* پیام‌های خطا یا موفقیت */}
        {message.text && (
          <div
            className={`p-4 rounded-2xl mb-6 flex items-center gap-3 text-sm font-medium border ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {message.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* بخش اطلاعات عمومی */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
              <User className="w-5 h-5 text-pink-600" />
              اطلاعات شخصی
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* نام و نام خانوادگی */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">نام و نام خانوادگی</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition text-sm"
                  placeholder="مثال: علی محمدی"
                />
              </div>

              {/* ایمیل */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">آدرس ایمیل</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition text-sm dir-ltr text-right"
                  placeholder="example@gmail.com"
                />
              </div>

              {/* شماره همراه */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">شماره همراه</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition text-sm dir-ltr text-right"
                  placeholder="09123456789"
                />
              </div>
            </div>
          </div>

          {/* بخش تغییر رمز عبور */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Lock className="w-5 h-5 text-pink-600" />
              تغییر رمز عبور
            </h2>
            <p className="text-xs text-gray-400 mb-6">در صورتی که قصدی برای تغییر رمز عبور ندارید، این بخش را خالی بگذارید.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* رمز فعلی */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">رمز عبور فعلی</label>
                <input
                  type="password"
                  name="current_password"
                  value={formData.current_password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition text-sm"
                />
              </div>

              {/* رمز جدید */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">رمز عبور جدید</label>
                <input
                  type="password"
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition text-sm"
                />
              </div>

              {/* تکرار رمز جدید */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">تکرار رمز عبور جدید</label>
                <input
                  type="password"
                  name="new_password_confirmation"
                  value={formData.new_password_confirmation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition text-sm"
                />
              </div>
            </div>
          </div>

          {/* دکمه ثبت تغییرات */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3.5 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-2xl transition shadow-lg shadow-pink-200 disabled:opacity-50 flex items-center gap-2"
            >
              {submitting && <Loader2 className="w-5 h-5 animate-spin" />}
              {submitting ? "در حال ثبت تغییرات..." : "ذخیره تغییرات"}
            </button>
          </div>
        </form>
      </div>

      <Sitefooter />
    </div>
  );
};

export default Profile;