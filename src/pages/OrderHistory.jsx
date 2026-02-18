import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const statusSteps = [
    "Pending",
    "Confirmed",
    "Shipped",
    "Out for Delivery",
    "Delivered"
];

const OrderHistory = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem("anik_user"));
                if (!storedUser?.token) return;

                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/orders/my-orders`,
                    {
                        headers: {
                            Authorization: `Bearer ${storedUser.token}`,
                        },
                    }
                );

                setOrders(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchOrders();
    }, []);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const getStepIndex = (status) => {
        return statusSteps.indexOf(status);
    };

    const handleLogout = () => {
        navigate("/", { replace: true });
        setTimeout(() => logout(), 0);
    };


    if (!orders.length) {
        return (
            <section className="bg-[#f7f5f2] min-h-screen flex items-center justify-center font-playfair px-4">
                <div className="text-center space-y-6">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl tracking-wide uppercase">
                        No Orders Yet
                    </h1>
                    <p className="text-gray-500">
                        Your handcrafted selections will appear here.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-[#f7f5f2] min-h-screen font-playfair">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">

                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 mb-12">

                    <h1 className="
                        text-2xl sm:text-3xl md:text-4xl
                        tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em]
                        uppercase text-center sm:text-left
                    ">
                        Order History
                    </h1>

                    <button
                        onClick={handleLogout}
                        className="
                            border px-5 py-2 sm:px-6 sm:py-2.5
                            text-xs sm:text-sm
                            uppercase tracking-widest
                            hover:bg-black hover:text-white
                            transition
                            w-full sm:w-auto
                        "
                    >
                        Logout
                    </button>

                </div>

                {/* ORDERS */}
                <div className="space-y-12">

                    {orders.map((order) => (
                        <motion.div
                            key={order._id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="bg-white p-6 sm:p-8 md:p-12 shadow-xl border border-black/5 space-y-8"
                        >

                            {/* Header */}
                            <div className="flex flex-col md:flex-row md:justify-between gap-6 text-center md:text-left">

                                <div>
                                    <p className="text-sm text-gray-400 uppercase tracking-widest">
                                        Order ID
                                    </p>
                                    <p className="text-lg font-medium">
                                        #{order._id.slice(-6).toUpperCase()}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400 uppercase tracking-widest">
                                        Date
                                    </p>
                                    <p className="text-lg">
                                        {formatDate(order.createdAt)}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400 uppercase tracking-widest">
                                        Current Status
                                    </p>
                                    <span className="px-4 py-1 border text-sm uppercase tracking-widest">
                                        {order.status}
                                    </span>
                                </div>

                            </div>

                            {/* Tracking Bar */}
                            <div className="pt-6">
                                <div className="flex justify-between items-center relative overflow-x-auto sm:overflow-visible">

                                    {statusSteps.map((step, index) => (
                                        <div key={step} className="flex-1 min-w-[70px] flex flex-col items-center relative">

                                            <div
                                                className={`w-4 h-4 rounded-full transition-all duration-500
                                                ${index <= getStepIndex(order.status)
                                                        ? "bg-black"
                                                        : "bg-gray-300"
                                                    }`}
                                            ></div>

                                            <span className="text-xs mt-3 text-gray-600 text-center">
                                                {step}
                                            </span>

                                            {index !== statusSteps.length - 1 && (
                                                <div
                                                    className={`absolute top-2 left-1/2 w-full h-[2px] -z-10 transition-all duration-500
                                                    ${index < getStepIndex(order.status)
                                                            ? "bg-black"
                                                            : "bg-gray-300"
                                                        }`}
                                                ></div>
                                            )}

                                        </div>
                                    ))}

                                </div>
                            </div>

                            {/* Items */}
                            <div className="space-y-4 border-t pt-8">

                                {order.items.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex justify-between text-sm"
                                    >
                                        <span>
                                            {item.name} × {item.quantity}
                                        </span>
                                        <span>
                                            ₹ {item.price * item.quantity}
                                        </span>
                                    </div>
                                ))}

                            </div>

                            {/* Footer */}
                            <div className="border-t pt-8 flex flex-col md:flex-row md:justify-between gap-6 text-center md:text-left">

                                <div>
                                    <p className="text-sm text-gray-400 uppercase tracking-widest">
                                        Payment
                                    </p>
                                    <p className="text-lg">
                                        {order.paymentMethod}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400 uppercase tracking-widest">
                                        Shipping
                                    </p>
                                    <p className="text-sm text-gray-600 leading-loose">
                                        {order.shippingDetails.fullName},
                                        <br />
                                        {order.shippingDetails.address},
                                        <br />
                                        {order.shippingDetails.city} - {order.shippingDetails.pincode}
                                    </p>
                                </div>

                                <div className="text-center md:text-right">
                                    <p className="text-sm text-gray-400 uppercase tracking-widest">
                                        Total
                                    </p>
                                    <p className="text-2xl font-semibold">
                                        ₹ {order.totalAmount}
                                    </p>
                                </div>

                            </div>

                        </motion.div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default OrderHistory;
