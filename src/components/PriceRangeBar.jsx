import React, { useEffect, useRef, useState } from "react";
import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";

const PriceRangeSlider = ({ min = 0, max = 10000000, onChange }) => {
  const sliderRef = useRef(null);
  const sliderInstanceRef = useRef(null); // نگهداری نمونه اسلایدر
  const onChangeRef = useRef(onChange);
  const [range, setRange] = useState([min, max]);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // ساخت اولیه اسلایدر
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    sliderInstanceRef.current = noUiSlider.create(slider, {
      start: [min, max],
      connect: true,
      range: { min, max },
      step: 10000,
      tooltips: false,
      format: {
        to: (v) => Math.round(v),
        from: (v) => parseFloat(v),
      },
    });

    sliderInstanceRef.current.on("change", (values) => {
      const parsed = values.map((v) => Math.round(Number(v)));
      setRange(parsed);
      onChangeRef.current?.(parsed);
    });

    sliderInstanceRef.current.on("update", (values) => {
      setRange(values.map((v) => Math.round(Number(v))));
    });

    return () => {
      if (sliderInstanceRef.current) {
        sliderInstanceRef.current.destroy();
      }
    };
  }, []); // فقط یک‌بار هنگام Mount ساخت اولیه انجام می‌شود

  // به‌روزرسانی دامنه اسلایدر وقتی min و max از بک‌اند دریافت می‌شوند
  useEffect(() => {
    if (sliderInstanceRef.current && min < max) {
      sliderInstanceRef.current.updateOptions({
        range: { min, max },
      });
    }
  }, [min, max]);

  return (
    <div className="w-full px-1">
      <div ref={sliderRef} className="my-2" />
      <div className="flex justify-between mt-3">
        <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium">
          {range[0]?.toLocaleString()} تومان
        </span>
        <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium">
          {range[1]?.toLocaleString()} تومان
        </span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;