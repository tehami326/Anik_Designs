import { createContext, useContext, useEffect, useState } from "react";
const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    // Load from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("anik_cart");
        if (stored) setCart(JSON.parse(stored));
    }, []);
    // Save to localStorage
    useEffect(() => {
        localStorage.setItem("anik_cart", JSON.stringify(cart));
    }, [cart]);
    // 🟢 Total Cart Count (for badge)
    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );
    const addToCart = (product) => {
        setCart((prev) => {
            
            const existing = prev.find(
                (item) =>
                    item._id === product._id &&
                    item.selectedSize === product.selectedSize
            );
            if (existing) {
                return prev.map((item) =>
                    item._id === product._id &&
                    item.selectedSize === product.selectedSize
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };
    const increaseQty = (id, selectedSize) => {
        setCart((prev) =>
            prev.map((item) =>
                item._id === id && item.selectedSize === selectedSize
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };
    const decreaseQty = (id, selectedSize) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item._id === id && item.selectedSize === selectedSize
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };
    const removeItem = (id, selectedSize) => {
        setCart((prev) =>
            prev.filter(
                (item) =>
                    !(item._id === id && item.selectedSize === selectedSize)
            )
        );
    };
    const clearCart = () => setCart([]);
    return (
        <CartContext.Provider
            value={{
                cart,
                cartCount,
                addToCart,
                increaseQty,
                decreaseQty,
                removeItem,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
export const useCart = () => useContext(CartContext);
