import React from "react";
import { assets } from '../assets/assets';

const footer = () => {
return(
<footer className="mt-24 bg-white border-t pt-16 pb-10">
  <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

    {/* برند / لوگو */}
    <div>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4">
        <img src={assets.logo} className='w-32 h-12' alt='Logo' />
      </h2>
      <p className="text-gray-500 leading-7 text-sm">
        انتخاب خاص برای سلیقه‌های خاص.  
        کیفیت، اصالت، و تجربه‌ای متفاوت در خرید آنلاین.
      </p>
    </div>

    {/* لینک‌ها */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">دسترسی سریع</h3>
      <ul className="space-y-3 text-gray-600 text-sm">
        <li className="hover:text-gray-900 cursor-pointer"><a href="/">صفحه اصلی</a></li>
        <li className="hover:text-gray-900 cursor-pointer"><a href="/collection">محصولات</a></li>
        <li className="hover:text-gray-900 cursor-pointer"><a href="/terms">قوانین و مقررات</a></li>
        <li className="hover:text-gray-900 cursor-pointer"><a href="/contact">تماس با ما</a></li>
      </ul>
    </div>

    {/* دسته‌بندی‌ها */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">دسته‌بندی‌ها</h3>
      <ul className="space-y-3 text-gray-600 text-sm">
        <li className="hover:text-gray-900 cursor-pointer"><a href="/collection?category=مردانه">مردانه</a></li>
        <li className="hover:text-gray-900 cursor-pointer"><a href="/collection?category=زنانه">زنانه</a></li>
        <li className="hover:text-gray-900 cursor-pointer"><a href="/collection?category=کفش">کفش</a></li>
        <li className="hover:text-gray-900 cursor-pointer"><a href="/collection?category=اکسسوری">اکسسوری</a></li>
      </ul>
    </div>

    {/* شبکه‌های اجتماعی */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">ما را دنبال کنید</h3>

      <div className="flex gap-4">
        {["IG", "YT", "TG"].map((item) => (
          <div
            key={item}
            className="w-12 h-12 bg-gray-100 border rounded-full flex items-center justify-center
                       text-gray-600 hover:bg-gray-200 hover:border-gray-400 cursor-pointer transition"
          >
            {item}
          </div>
        ))}
      </div>
    </div>

  </div>

  {/* کپی‌رایت */}
  <div className="text-center text-gray-400 text-sm mt-16">
    © 2025 forever — تمامی حقوق محفوظ است.
  </div>
</footer>
      );
};

export default footer;