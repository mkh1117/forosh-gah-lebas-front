import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prev => {
      // محصول یکسان = همون id + سایز + رنگ
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

  const { subtotal, shipping, discount, total } = useMemo(() => {
    const sub  = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const ship = sub > 1500000 || cartItems.length === 0 ? 0 : 45000;
    const disc = Math.round(sub * 0.05);
    return { subtotal: sub, shipping: ship, discount: disc, total: sub + ship - disc };
  }, [cartItems]);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, handleQtyChange, handleRemove,
      subtotal, shipping, discount, total,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);