import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ۱. مقداردهی اولیه سبد خرید از localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("خطا در خواندن سبد خرید:", error);
      return [];
    }
  });

  
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("خطا در ذخیره سبد خرید:", error);
    }
  }, [cartItems]);

  
  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(
        p => p.id === item.id && p.size === item.size && p.color === item.color
      );
      if (existing) {
        return prev.map(p =>
          p.id === item.id && p.size === item.size && p.color === item.color
            ? { ...p, qty: p.qty + (item.qty ?? 1) }
            : p
        );
      }
      return [...prev, { ...item, qty: item.qty ?? 1 }];
    });
  };


  const handleQtyChange = (id, size, color, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };


  const handleRemove = (id, size, color) => {
    setCartItems(prev =>
      prev.filter(item => !(item.id === id && item.size === size && item.color === color))
    );
  };

  
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  
  const { subtotal, shipping, discount, total } = useMemo(() => {
    const sub  = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const ship = sub > 1500000 || cartItems.length === 0 ? 0 : 45000;
    const disc = Math.round(sub * 0.05);
    return { subtotal: sub, shipping: ship, discount: disc, total: sub + ship - disc };
  }, [cartItems]);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, handleQtyChange, handleRemove, clearCart,
      subtotal, shipping, discount, total,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);