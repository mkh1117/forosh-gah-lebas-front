import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Tag, Eye } from "lucide-react";
import { useCart } from "./CartContext";

const categoryPersian = {
  men         : "مردانه",
  women       : "زنانه",
  shoes       : "کفش",
  accessories : "اکسسوری",
  مردانه      : "مردانه",
  زنانه       : "زنانه",
  کفش         : "کفش",
  اکسسوری    : "اکسسوری",
};


const ProductCard = ({
  id, title, price, category, image,
  sale, discount_percent,
  fromCollection = false,
}) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (fromCollection) {
      // بدون سایز/رنگ نمی‌شه اضافه کرد — برو صفحه محصول
      navigate(`/product/${id}`);
    } else {
      addToCart({ id, title, price, category, image });
    }
  };

  const displayCategory = categoryPersian[category] ?? category;

  return (
    <Link
      to={`/product/${id}`}
      className="group relative rounded-2xl overflow-hidden shadow-sm border hover:shadow-lg transition bg-white flex flex-col"
    >
      {/* تصویر */}
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        {sale && discount_percent && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
            {discount_percent}٪ تخفیف
          </span>
        )}
      </div>

      {/* اطلاعات */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-xs text-pink-500 font-medium flex items-center gap-1">
          <Tag size={11} />
          {displayCategory}
        </p>
        <h3 className="font-semibold mt-1 text-base text-gray-900 line-clamp-1">{title}</h3>
        <p className="text-gray-800 mt-1 font-bold text-sm">
          {price?.toLocaleString()} تومان
        </p>

        <button
          onClick={handleCartClick}
          className="w-full mt-3 flex items-center justify-center gap-2 bg-gray-900 text-white py-2 rounded-xl hover:bg-black active:scale-95 transition text-sm font-semibold"
        >
          {fromCollection ? (
            <>
              <Eye size={16} />
              مشاهده محصول
            </>
          ) : (
            <>
              <ShoppingBag size={16} />
              افزودن به سبد
            </>
          )}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
