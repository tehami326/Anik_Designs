import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, increaseQty, decreaseQty, removeItem } = useCart();

    const subtotal = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    if (cart.length === 0) {
        return (
            <section className="bg-[#f8f6f3] min-h-screen flex items-center justify-center font-playfair px-6">
                <div className="text-center space-y-8 max-w-xl">
                    <h1 className="text-5xl tracking-[0.15em] uppercase">
                        Your Cart is Empty
                    </h1>
                    <p className="text-gray-500 leading-relaxed">
                        Discover timeless handcrafted pieces designed to elevate your space.
                    </p>
                    <Link
                        to="/"
                        className="inline-block border border-black px-10 py-3 uppercase tracking-[0.25em] text-sm hover:bg-black hover:text-white transition duration-500"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-[#f8f6f3] min-h-screen font-playfair">
            <div className="max-w-7xl mx-auto px-6 py-24">

                {/* Page Heading */}
                <div className="mb-20">
                    <h1 className="text-5xl tracking-[0.2em] uppercase mb-4">
                        Shopping Cart
                    </h1>
                    <div className="w-20 h-[1px] bg-black/40"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">

                    {/* LEFT SIDE - PRODUCTS */}
                    <div className="lg:col-span-2 space-y-16">

                        {cart.map((item) => (
                            <div
                                key={item._id}
                                className="flex flex-col md:flex-row gap-10 border-b border-black/10 pb-12"
                            >

                                {/* Image */}
                                <div className="w-full md:w-60 h-72 overflow-hidden group">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="flex-1 flex flex-col justify-between">

                                    <div className="space-y-4">
                                        <h2 className="text-2xl uppercase tracking-wide">
                                            {item.name}
                                        </h2>

                                        <p className="text-gray-600 text-lg">
                                            ₹ {item.price}
                                        </p>
                                    </div>

                                    {/* Quantity Section */}
                                    <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-6">

                                        <div className="flex items-center border border-black/20">

                                            <button
                                                onClick={() => decreaseQty(item._id)}
                                                className="px-4 py-2 hover:bg-black hover:text-white transition duration-300"
                                            >
                                                −
                                            </button>

                                            <span className="px-6 text-lg">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() => increaseQty(item._id)}
                                                className="px-4 py-2 hover:bg-black hover:text-white transition duration-300"
                                            >
                                                +
                                            </button>

                                        </div>

                                        <button
                                            onClick={() => removeItem(item._id)}
                                            className="text-sm tracking-widest uppercase text-gray-500 hover:text-black transition"
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>

                    {/* RIGHT SIDE - SUMMARY */}
                    <div className="bg-white p-12 border border-black/10 shadow-sm h-fit sticky top-24">

                        <h2 className="text-3xl uppercase tracking-[0.2em] mb-10">
                            Summary
                        </h2>

                        <div className="flex justify-between text-lg mb-6">
                            <span>Subtotal</span>
                            <span>₹ {subtotal}</span>
                        </div>

                        <div className="flex justify-between text-lg mb-10">
                            <span>Shipping</span>
                            <span className="text-gray-500">Calculated at checkout</span>
                        </div>

                        <div className="border-t border-black/20 pt-8 mb-10 flex justify-between text-xl">
                            <span>Total</span>
                            <span>₹ {subtotal}</span>
                        </div>

                        <Link
                            to="/checkout"
                            className="block text-center border border-black py-4 uppercase tracking-[0.25em] text-sm hover:bg-black hover:text-white transition duration-500"
                        >
                            Proceed to Checkout
                        </Link>

                        <Link
                            to="/"
                            className="block text-center mt-6 text-sm tracking-widest uppercase text-gray-500 hover:text-black transition"
                        >
                            Continue Shopping
                        </Link>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Cart;
