import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='w-full text-gray-800' dir='rtl'>
      {/* Hero */}
      <section className='mt-6 bg-gradient-to-l from-pink-50 via-white to-pink-100 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 shadow-sm'>
        <div className='flex-1 space-y-4'>
          <p className='text-sm font-semibold tracking-[0.0em] text-pink-600'>
            درباره ما
          </p>
          <h1 className='text-3xl md:text-4xl font-black leading-tight text-gray-900'>
            فوروش، جایی که استایل روزمره به تجربه‌ای لوکس و در دسترس تبدیل می‌شود.
          </h1>
          <p className='text-base md:text-lg text-gray-600 leading-relaxed'>
            ما یک تیم کوچک اما پرانرژی هستیم که با عشق به مد و احترام به وقت مشتری، جدیدترین ترندها را با قیمت منصفانه
            و ارسال سریع ارائه می‌کنیم. هدف ما این است که خرید لباس برای شما ساده، شفاف و همیشه الهام‌بخش باشد.
          </p>
          <div className='flex flex-wrap gap-4 md:gap-6'>
            {[
              { title: '۱۰K+', desc: 'خریدار راضی در سراسر کشور' },
              { title: '۴.۸ ★', desc: 'میانگین رضایت از کیفیت و پشتیبانی' },
              { title: '۷ روز', desc: 'تضمین تعویض و بازگشت آسان' },
            ].map((item) => (
              <div key={item.title} className='bg-white/80 backdrop-blur border border-white/60 rounded-2xl px-5 py-4 shadow'>
                <p className='text-2xl font-bold text-gray-900'>{item.title}</p>
                <p className='text-sm text-gray-600 mt-1'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='flex-1 w-full'>
          <div className='relative'>
            <div className='absolute inset-0 bg-pink-200 blur-3xl opacity-70 animate-pulse' />
            <div className='relative rounded-[28px] overflow-hidden border border-white shadow-xl'>
              <img src={assets.about_img} alt='درباره فوروش' className='w-full h-full object-cover' />
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className='mt-14'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>چرا مشتری‌ها فوروش را انتخاب می‌کنند؟</h2>
          <span className='hidden md:inline-block text-pink-600 font-semibold text-sm'>شفافیت، سرعت، اصالت</span>
        </div>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[
            { title: 'کیفیت تضمین‌شده', desc: 'هر محصول پیش از عرضه کنترل کیفیت می‌شود تا دقیقا همان چیزی که می‌بینید دریافت کنید.' },
            { title: 'تجربه سریع و ساده', desc: 'فیلترهای دقیق، موجودی به‌روز و پرداخت امن تا خرید بدون دردسر پیش برود.' },
            { title: 'پشتیبانی واقعی', desc: 'تیم ما قبل و بعد از خرید پاسخ‌گوی شماست؛ از انتخاب سایز تا تعویض کالا.' },
            { title: 'الهام روزانه', desc: 'استایل‌بوردها و پیشنهاد ست روز برای اینکه همیشه ایده تازه داشته باشید.' },
            { title: 'مسئولیت‌پذیری', desc: 'بسته‌بندی کم‌پلاستیک و همکاری با تامین‌کنندگان مسئول برای کاهش ردپای محیطی.' },
            { title: 'ارسال هوشمند', desc: 'ارسال سریع در تهران و تحویل زمان‌بندی‌شده در سایر شهرها.' },
          ].map((item) => (
            <div key={item.title} className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:-translate-y-1 transition-transform duration-200'>
              <div className='w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-lg mb-4'>
                •
              </div>
              <h3 className='text-lg font-semibold mb-2 text-gray-900'>{item.title}</h3>
              <p className='text-sm text-gray-600 leading-relaxed'>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section className='mt-14 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div>
            <p className='text-sm text-pink-600 font-semibold tracking-[0.2em]'>مسیر رشد</p>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mt-2'>داستان کوتاه فوروش</h2>
          </div>
          <p className='text-sm md:text-base text-gray-600 md:max-w-xl'>
            از یک فروشگاه اینستاگرامی کوچک شروع کردیم و با اعتماد شما امروز به یک فروشگاه آنلاین کامل تبدیل شده‌ایم؛ با
            تامین‌کنندگان منتخب، انبار هوشمند و تیمی که عاشق خوشحالی مشتری است.
          </p>
        </div>

        <div className='mt-8 grid md:grid-cols-3 gap-6'>
          {[
            { year: '۱۳۹۹', title: 'شروع ماجرا', desc: 'اولین کالکشن محدود با ۵۰ محصول و ارسال در همان روز در تهران.' },
            { year: '۱۴۰۱', title: 'زیرساخت جدید', desc: 'انبار متمرکز، درگاه‌های امن و به‌روزرسانی لحظه‌ای موجودی.' },
            { year: 'اکنون', title: 'آینده نزدیک', desc: 'گسترش ارسال اکسپرس به ۱۰ شهر و ارائه سرویس استایلینگ شخصی.' },
          ].map((item) => (
            <div key={item.year} className='p-5 rounded-2xl bg-gray-50 border border-gray-100'>
              <p className=' font-semibold text-pink-600'>{item.year}</p>
              <h3 className='text-xl font-bold text-gray-900 mt-1'>{item.title}</h3>
              <p className='text-sm text-gray-600 mt-2 leading-relaxed'>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className='mt-14 mb-10'>
        <div className='rounded-3xl bg-gradient-to-r from-pink-600 via-rose-500 to-orange-400 text-white p-8 md:p-12 overflow-hidden relative'>
          <div className='absolute inset-0 bg-white/10 blur-3xl opacity-30' />
          <div className='relative flex flex-col md:flex-row items-center justify-between gap-6'>
            <div className='space-y-3'>
              <h3 className='text-2xl md:text-3xl font-bold'>همراه ما بمانید</h3>
              <p className='text-sm md:text-base text-white/90 max-w-xl'>
                هر هفته کالکشن‌های تازه، پیشنهادهای ویژه و راهنمای استایل منتشر می‌کنیم. اگر سوالی دارید، پشتیبانی همیشه کنار شماست.
              </p>
            </div>
            <div className='flex flex-wrap items-center gap-3'>
              <button className='bg-white text-pink-700 font-semibold px-5 py-3 rounded-full shadow-lg hover:-translate-y-0.5 transition'>
                مشاهده کالکشن‌ها
              </button>
              <button className='bg-white/10 border border-white/30 text-white font-semibold px-5 py-3 rounded-full hover:bg-white/15 transition'>
                صحبت با پشتیبانی
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
