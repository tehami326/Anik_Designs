import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const statusOptions = [
    "Pending",
    "Confirmed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
];

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    const user = JSON.parse(localStorage.getItem("anik_user"));

    const fetchOrders = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/orders`,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        setOrders(data);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id, status) => {
        await axios.put(
            `${import.meta.env.VITE_API_URL}/api/orders/${id}/status`,
            { status },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        fetchOrders();
    };

    const deleteOrder = async (id) => {
        await axios.delete(
            `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        fetchOrders();
    };

    return (
        <AdminLayout>

            <div className="mb-12">
                <h1 className="text-4xl font-semibold tracking-wide mb-3">
                    Orders Management
                </h1>
                <p className="text-gray-400 text-sm">
                    Manage customer orders and update status.
                </p>
            </div>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-300">

                    <thead className="border-b border-white/10 text-xs uppercase tracking-widest text-gray-400">
                        <tr>
                            <th className="px-6 py-4">Order</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order, index) => (
                            <motion.tr
                                key={order._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="border-b border-white/5 hover:bg-white/5 transition"
                            >
                                <td className="px-6 py-4 font-medium">
                                    #{order._id.slice(-6).toUpperCase()}
                                </td>

                                <td className="px-6 py-4">
                                    {order.user?.name || "User"}
                                    <div className="text-xs text-gray-500">
                                        {order.user?.email}
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    ₹ {order.totalAmount}
                                </td>

                                <td className="px-6 py-4">
                                    <select
                                        value={order.status}
                                        onChange={(e) =>
                                            updateStatus(order._id, e.target.value)
                                        }
                                        className="bg-black/40 border border-white/10 rounded px-3 py-2 text-xs"
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => deleteOrder(order._id)}
                                        className="text-red-400 hover:text-red-500 transition"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>

                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="md:hidden space-y-6">
                {orders.map((order, index) => (
                    <motion.div
                        key={order._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-6 border border-white/5 rounded-xl"
                    >
                        <div className="flex justify-between mb-4">
                            <span className="font-medium">
                                #{order._id.slice(-6).toUpperCase()}
                            </span>
                            <span>₹ {order.totalAmount}</span>
                        </div>

                        <div className="mb-4">
                            <p>{order.user?.name || "User"}</p>
                            <p className="text-xs text-gray-500">
                                {order.user?.email}
                            </p>
                        </div>

                        <div className="flex justify-between items-center">
                            <select
                                value={order.status}
                                onChange={(e) =>
                                    updateStatus(order._id, e.target.value)
                                }
                                className="bg-black/40 border border-white/10 rounded px-3 py-2 text-xs"
                            >
                                {statusOptions.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={() => deleteOrder(order._id)}
                                className="text-red-400 hover:text-red-500 transition"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

        </AdminLayout>
    );

};

export default AdminOrders;
