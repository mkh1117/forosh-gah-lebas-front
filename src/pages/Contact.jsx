import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='w-full text-gray-800' dir='rtl'>
      {/* Hero */}
      <section className='mt-6 bg-gradient-to-l from-pink-50 via-white to-pink-100 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 shadow-sm'>
        <div className='flex-1 space-y-4'>
          <p className='text-sm font-semibold tracking-[0.35em] text-pink-600'>
            ارتباط با ما
          </p>
          <h1 className='text-3xl md:text-4xl font-black leading-tight text-gray-900'>
            هر سوالی دارید، تیم فوراور اینجاست تا سریع و صادقانه پاسخ بدهد.
          </h1>
          <p className='text-base md:text-lg text-gray-600 leading-relaxed'>
            از انتخاب سایز تا وضعیت سفارش و پیگیری مرسوله؛ کانال‌های زیر همیشه در دسترس شماست. پیام بدهید، تماس بگیرید یا فرم را پر کنید تا در کوتاه‌ترین زمان پاسخ بگیرید.
          </p>
          <div className='flex flex-wrap gap-4'>
            {[
              { label: 'شنبه تا چهارشنبه', value: '۹:۰۰ تا ۲۰:۰۰' },
              { label: 'پنجشنبه', value: '۹:۰۰ تا ۱۴:۰۰' },
              { label: 'پشتیبانی فوری', value: 'کمتر از ۲ ساعت' },
            ].map((item) => (
              <div key={item.label} className='bg-white/80 backdrop-blur border border-white/60 rounded-2xl px-5 py-4 shadow'>
                <p className='text-xs text-gray-500'>{item.label}</p>
                <p className='text-lg font-semibold text-gray-900'>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='flex-1 w-full'>
          <div className='relative'>
            <div className='absolute inset-0 bg-pink-200 blur-3xl opacity-70 animate-pulse' />
            <div className='relative rounded-[28px] overflow-hidden border border-white shadow-xl'>
              <img src={assets.contact_img} alt='ارتباط با فوروش' className='w-full h-full object-cover' />
            </div>
          </div>
        </div>
      </section>

      {/* Contact channels */}
      <section className='mt-14 grid md:grid-cols-3 gap-6'>
        {[
          { title: 'پشتیبانی تلفنی', desc: 'برای پرسش فوری یا پیگیری سفارش با ما تماس بگیرید.', action: '021-1234-5678' },
          { title: 'ایمیل و تیکت', desc: 'اگر مدارک یا جزئیات بیشتری نیاز دارید، ایمیل بهترین گزینه است.', action: 'support@forosh.shop' },
          { title: 'چت آنلاین', desc: 'در ساعات کاری با پشتیبان آنلاین گفتگو کنید.', action: 'پاسخ در کمتر از ۱۰ دقیقه' },
        ].map((item) => (
          <div key={item.title} className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:-translate-y-1 transition-transform duration-200'>
            <div className='w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-lg mb-4'>
              •
            </div>
            <h3 className='text-lg font-semibold mb-2 text-gray-900'>{item.title}</h3>
            <p className='text-sm text-gray-600 leading-relaxed mb-3'>{item.desc}</p>
            <p className='text-sm font-semibold text-pink-600'>{item.action}</p>
          </div>
        ))}
      </section>

      {/* Form + info */}
      <section className='mt-14 grid lg:grid-cols-3 gap-8 items-start'>
        <div className='lg:col-span-2 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm'>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>پیام بگذارید</h2>
          <p className='text-sm text-gray-600 mb-6'>برای پشتیبانی محصول، وضعیت سفارش یا همکاری تجاری فرم زیر را پر کنید.</p>
          <form className='grid md:grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <label className='text-sm text-gray-700'>نام و نام خانوادگی</label>
              <input type='text' className='h-11 rounded-xl border border-gray-200 px-3 focus:outline-none focus:ring-2 focus:ring-pink-200' placeholder='مثال: سارا رضایی' />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-sm text-gray-700'>ایمیل</label>
              <input type='email' className='h-11 rounded-xl border border-gray-200 px-3 focus:outline-none focus:ring-2 focus:ring-pink-200' placeholder='you@example.com' />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-sm text-gray-700'>شماره تماس</label>
              <input type='tel' className='h-11 rounded-xl border border-gray-200 px-3 focus:outline-none focus:ring-2 focus:ring-pink-200' placeholder='09xx xxx xxxx' />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-sm text-gray-700'>موضوع</label>
              <select className='h-11 rounded-xl border border-gray-200 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-pink-200'>
                <option>پیگیری سفارش</option>
                <option>انتخاب سایز</option>
                <option>مرجوعی یا تعویض</option>
                <option>همکاری و تامین</option>
                <option>سایر</option>
              </select>
            </div>
            <div className='md:col-span-2 flex flex-col gap-2'>
              <label className='text-sm text-gray-700'>توضیحات</label>
              <textarea rows='4' className='rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200' placeholder='جزئیات سوال یا سفارش خود را بنویسید...' />
            </div>
            <div className='md:col-span-2 flex flex-col md:flex-row md:items-center justify-between gap-4'>
              <label className='inline-flex items-center gap-2 text-sm text-gray-600'>
                <input type='checkbox' className='w-4 h-4 rounded border-gray-300 text-pink-600 focus:ring-pink-200' />
                خبرنامه هفتگی شامل پیشنهادها و کالکشن‌های جدید را برایم بفرست.
              </label>
              <button type='button' className='px-8 py-3 rounded-full bg-pink-600 text-white font-semibold hover:-translate-y-0.5 transition transform shadow-lg'>
                ارسال پیام
              </button>
            </div>
          </form>
        </div>

        <div className='space-y-4'>
          <div className='bg-white border border-gray-100 rounded-2xl p-6 shadow-sm'>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>آدرس دفتر</h3>
            <p className='text-sm text-gray-600 leading-relaxed'>
              تهران، خیابان مثال، پلاک ۱۲۳، واحد ۵<br />
              حضوری فقط با هماهنگی قبلی.
            </p>
          </div>
          <div className='bg-white border border-gray-100 rounded-2xl p-6 shadow-sm'>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>حمایت پس از خرید</h3>
            <p className='text-sm text-gray-600 leading-relaxed'>
              تعویض سایز تا ۷ روز پس از تحویل امکان‌پذیر است. برای مرجوعی، شماره سفارش و عکس محصول را ارسال کنید.
            </p>
          </div>
          <div className='bg-gradient-to-r from-pink-600 via-rose-500 to-orange-400 text-white rounded-2xl p-6 shadow-lg'>
            <h3 className='text-lg font-bold mb-2'>نیاز به راهنمای استایل دارید؟</h3>
            <p className='text-sm text-white/90 leading-relaxed mb-3'>استایلیست ما بر اساس سلیقه و موقعیت شما چند پیشنهاد آماده می‌کند.</p>
            <button className='bg-white text-pink-700 font-semibold px-5 py-2 rounded-full hover:-translate-y-0.5 transition'>
              درخواست مشاوره
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
