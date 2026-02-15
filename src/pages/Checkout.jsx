import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Checkout = () => {
    const { cart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        fullName: user?.name || "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        paymentMethod: "COD",
    });

    const subtotal = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleOrder = async () => {
        try {
            setLoading(true);

            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/orders`,
                {
                    items: cart,
                    shippingDetails: {
                        fullName: form.fullName,
                        phone: form.phone,
                        address: form.address,
                        city: form.city,
                        pincode: form.pincode,
                    },
                    paymentMethod: form.paymentMethod,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            // ✅ Navigate FIRST
            navigate("/order-success", {
                state: { whatsappURL: data.whatsappURL }
            });


            setTimeout(() => {
                clearCart();
            }, 300);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (cart.length === 0) {
            navigate("/cart");
        }
    }, [cart, navigate]);


    return (
        <section className="bg-[#f7f5f2] min-h-screen font-playfair">
            <div className="max-w-7xl mx-auto px-6 py-20">

                <h1 className="text-4xl tracking-wide uppercase mb-16">
                    Secure Checkout
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                    {/* FORM SECTION */}
                    <div className="lg:col-span-2 bg-white p-12 shadow-lg space-y-10">

                        <div className="space-y-6">
                            <h2 className="text-2xl uppercase tracking-wide">
                                Shipping Details
                            </h2>

                            <input
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className="w-full border p-4 focus:outline-none"
                            />

                            <input
                                value={user?.email}
                                disabled
                                className="w-full border p-4 bg-gray-100 text-gray-500"
                            />

                            <input
                                name="phone"
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="w-full border p-4 focus:outline-none"
                            />

                            <input
                                name="address"
                                onChange={handleChange}
                                placeholder="Full Address"
                                className="w-full border p-4 focus:outline-none"
                            />

                            <div className="grid grid-cols-2 gap-6">
                                <input
                                    name="city"
                                    onChange={handleChange}
                                    placeholder="City"
                                    className="border p-4"
                                />
                                <input
                                    name="pincode"
                                    onChange={handleChange}
                                    placeholder="Pincode"
                                    className="border p-4"
                                />
                            </div>
                        </div>

                        {/* PAYMENT */}
                        <div className="space-y-6">
                            <h2 className="text-2xl uppercase tracking-wide">
                                Payment Method
                            </h2>

                            <div className="flex items-center gap-4">
                                <input
                                    type="radio"
                                    value="COD"
                                    checked={form.paymentMethod === "COD"}
                                    onChange={(e) =>
                                        setForm({ ...form, paymentMethod: e.target.value })
                                    }
                                />
                                <label>Cash on Delivery</label>
                            </div>

                            <div className="flex items-center gap-4 opacity-50">
                                <input type="radio" disabled />
                                <label>Pay Later (Coming Soon)</label>
                            </div>
                        </div>

                    </div>

                    {/* ORDER SUMMARY */}
                    <div className="bg-white p-12 shadow-lg h-fit space-y-8">

                        <h2 className="text-2xl uppercase tracking-wide">
                            Order Summary
                        </h2>

                        {cart.map((item) => (
                            <div key={item._id} className="flex justify-between text-sm">
                                <span>
                                    {item.name} × {item.quantity}
                                </span>
                                <span>₹ {item.price * item.quantity}</span>
                            </div>
                        ))}

                        <div className="border-t pt-6 flex justify-between text-lg font-semibold">
                            <span>Total</span>
                            <span>₹ {subtotal}</span>
                        </div>

                        <button
                            onClick={handleOrder}
                            disabled={loading}
                            className="w-full border border-black py-4 uppercase tracking-widest hover:bg-black hover:text-white transition"
                        >
                            {loading ? "Processing..." : "Place Order"}
                        </button>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Checkout;
