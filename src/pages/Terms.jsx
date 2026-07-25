import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sitefooter from '../components/footer';

const TERMS_DATA = [
  {
    id: 'orders',
    icon: '🛍️',
    title: 'شرایط ثبت و پردازش سفارش',
    content: (
      <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm leading-relaxed">
        <li>امکان ثبت سفارش در تمام ۲۴ ساعت شبانه‌روز و ۷ روز هفته وجود دارد.</li>
        <li>پس از ثبت نهایی، پیامک تایید سفارش همراه با کد پیگیری برای شما ارسال خواهد شد.</li>
        <li>افزودن کالا به سبد خرید به معنی رزرو آن نیست و تا پیش از ثبت نهایی و پرداخت، هیچ حقی برای خریدار ایجاد نمی‌کند.</li>
        <li>در صورت بروز مشکل در پردازش نهایی سبد خرید (مانند اتمام موجودی هم‌زمان)، مبلغ پرداختی حداکثر ظرف ۲۴ ساعت کاری به حساب خریدار عودت داده می‌شود.</li>
      </ul>
    ),
  },
  {
    id: 'shipping',
    icon: '🚚',
    title: 'روش‌ها و هزینه‌های ارسال',
    content: (
      <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm leading-relaxed">
        <li><strong>ارسال در تهران:</strong> از طریق پیک اختصاصی ظرف مدت ۲۴ ساعت کاری انجام می‌پذیرد.</li>
        <li><strong>ارسال به سراسر کشور:</strong> از طریق پست پیشتاز/تیپاکس انجام شده و معمولاً بین ۲ تا ۴ روز کاری به دست شما می‌رسد.</li>
        <li>هزینه ارسال بر اساس وزن و مقصد در مرحله نهایی تسویه حساب محاسبه و به اطلاع شما می‌رسد.</li>
        <li>مسئولیت صحت آدرس، کد پستی و شماره تماس درج‌شده بر عهده خریدار است.</li>
      </ul>
    ),
  },
  {
    id: 'returns',
    icon: '🔄',
    title: 'شرایط تعویض و مرجوعی (۷ روز ضمانت)',
    content: (
      <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
        <p>شما می‌توانید تا <strong>۷ روز پس از تحویل کالا</strong>، تحت شرایط زیر درخواست مرجوعی یا تعویض دهید:</p>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li>کالا باید در حالت اولیه باشد؛ اتیکت یا تگ آن جدا نشده باشد و بوی عطر، دود یا شستشو نگرفته باشد.</li>
          <li>کالاهایی که در وضعیت «تخفیف ویژه/حراج آخر فصل» خریده می‌شوند، تنها در صورت وجود آسیب فیزیکی یا مغایرت قابل مرجوعی هستند.</li>
          <li>در صورت انصراف از خرید (بدون ایراد در کالا)، هزینه بازگشت بر عهده مشتری است.</li>
          <li>در صورت وجود آسیب فیزیکی یا مغایرت با سایت، تمام هزینه‌های تعویض/مرجوعی بر عهده فروشگاه خواهد بود.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'payment',
    icon: '🔒',
    title: 'پرداخت و امنیت اطلاعات',
    content: (
      <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm leading-relaxed">
        <li>تمامی پرداخت‌های اینترنتی از طریق درگاه‌های رسمی، امن و شتابی کشور انجام می‌شوند.</li>
        <li>فروشگاه به هیچ‌عنوان اطلاعات بانکی شما (مانند شماره کارت، رمز دوم و...) را ذخیره نمی‌کند.</li>
        <li>اطلاعات شخصی شما (نام، آدرس و شماره تماس) صرفاً جهت پردازش سفارش استفاده شده و نزد ما کاملاً محفوظ است.</li>
      </ul>
    ),
  },
  {
    id: 'copyright',
    icon: '⚖️',
    title: 'حقوق مالکیت معنوی',
    content: (
      <p className="text-gray-600 text-sm leading-relaxed">
        تمامی محتوای متنی، تصاویر اختصاصی محصولات، لوگو و گرافیک‌های موجود در وب‌سایت متعلق به برند فوروش است. هرگونه کپی‌برداری تجاری از آن‌ها بدون کسب اجازه کتبی، پیگرد قانونی دارد.
      </p>
    ),
  },
];

const Terms = () => {
  const [openAccordion, setOpenAccordion] = useState('orders'); // آیتم اول به‌صورت پیش‌فرض باز است

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="w-full text-gray-800 antialiased selection:bg-pink-500 selection:text-white" dir="rtl">
      
      {/* ── HERO SECTION ── */}
      <section className="mt-6 bg-gradient-to-l from-pink-50 via-white to-pink-100 rounded-[2.5rem] p-8 md:p-14 shadow-sm relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 bg-pink-300/30 blur-3xl rounded-full" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-block text-xs md:text-sm font-semibold text-pink-600 bg-pink-100/80 px-3 py-1 rounded-full">
            شفافیت و اعتماد
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
            قوانین و مقررات استفاده از فوروش
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            ورود شما به فروشگاه و ثبت سفارش به معنای آگاهی و پذیرش این قوانین است. ما تمام تلاش خود را می‌کنیم تا خریدی شفاف، امن و لذت‌بخش داشته باشید.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT (ACCORDION) ── */}
      <section className="mt-12 max-w-4xl mx-auto px-2">
        <div className="space-y-4">
          {TERMS_DATA.map((item) => {
            const isOpen = openAccordion === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2.5xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-pink-200 shadow-lg shadow-pink-500/5 ring-1 ring-pink-100'
                    : 'bg-white border-gray-100 shadow-sm hover:border-gray-200'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full p-6 flex items-center justify-between text-right gap-4 transition-colors focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl p-2.5 bg-gray-50 rounded-2xl flex items-center justify-center">
                      {item.icon}
                    </span>
                    <h2 className="text-base md:text-lg font-bold text-gray-900">
                      {item.title}
                    </h2>
                  </div>

                  {/* آیکون فلش باز/بسته */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-pink-500 border-pink-500 text-white' : 'text-gray-400'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* محتوای آکاردئون */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-50 animate-fadeIn">
                    {item.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SUPPORT / CONTACT BANNER ── */}
      <section className="mt-16 max-w-4xl mx-auto px-2">
        <div className="rounded-3xl bg-gray-900 text-white p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="pointer-events-none absolute -bottom-20 -right-20 w-60 h-60 bg-pink-500/20 blur-3xl rounded-full" />
          
          <div className="space-y-2 text-center sm:text-right relative z-10">
            <h3 className="text-xl md:text-2xl font-bold">سوالی درباره قوانین داريد؟</h3>
            <p className="text-sm text-gray-400">
              تیم پشتیبانی فوروش همواره آماده پاسخگویی به ابهامات شماست.
            </p>
          </div>

          <Link
            to="/contact"
            className="relative z-10 flex-shrink-0 px-6 py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-sm font-bold rounded-full transition-all duration-300 shadow-lg shadow-pink-500/20 active:scale-95"
          >
            تماس با پشتیبانی
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <div className="mt-24">
        <Sitefooter />
      </div>
    </div>
  );
};

export default Terms;