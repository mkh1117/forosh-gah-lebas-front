import React, { useEffect, useRef, useState } from "react";
import noUiSlider from "nouislider";
import 'nouislider/dist/nouislider.css';

const PriceRangeSlider = ({ min = 0, max = 1000000, onChange }) => {
  const sliderRef  = useRef(null);
  const onChangeRef = useRef(onChange); // همیشه آخرین onChange رو داره بدون re-init
  const [range, setRange] = useState([min, max]);

  // onChangeRef رو همیشه آپدیت نگه‌دار
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // فقط یه بار slider می‌سازیم
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    noUiSlider.create(slider, {
      start    : [min, max],
      connect  : true,
      range    : { min, max },
      step     : 10000,
      tooltips : false,
      format   : {
        to   : (v) => Math.round(v),
        from : (v) => parseFloat(v),
      },
    });

    // "change" فقط وقتی کاربر رها کنه صدا می‌زنه (نه هر pixel)
    slider.noUiSlider.on("change", (values) => {
      const parsed = values.map((v) => Math.round(Number(v)));
      setRange(parsed);
      onChangeRef.current?.(parsed);
    });

    // "update" فقط برای نمایش live در UI (بدون fetch)
    slider.noUiSlider.on("update", (values) => {
      setRange(values.map((v) => Math.round(Number(v))));
    });

    return () => slider.noUiSlider?.destroy();
  }, []); // فقط mount/unmount

  return (
    <div className="w-full px-1">
      <div ref={sliderRef} className="my-2" />
      <div className="flex justify-between mt-3">
        <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium">
          {range[0].toLocaleString()} تومان
        </span>
        <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium">
          {range[1].toLocaleString()} تومان
        </span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;