import { motion } from "framer-motion";
import AdminLayout from "./AdminLayout";
import { ShoppingBag, IndianRupee, Package, Users } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("anik_user"));

                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/admin/stats`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );

                setStats(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStats();
    }, []);

    if (!stats) return null;

    const dashboardStats = [
        {
            title: "Total Orders",
            value: stats.totalOrders,
            icon: ShoppingBag,
        },
        {
            title: "Revenue",
            value: `₹ ${stats.totalRevenue}`,
            icon: IndianRupee,
        },
        {
            title: "Products",
            value: stats.totalProducts,
            icon: Package,
        },
        {
            title: "Users",
            value: stats.totalUsers,
            icon: Users,
        },
    ];

    return (
        <AdminLayout>

            <div className="mb-14">
                <h1 className="text-4xl font-semibold tracking-wide mb-3">
                    Overview
                </h1>
                <p className="text-gray-400 text-sm">
                    Monitor platform performance and activity.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">

                {dashboardStats.map((stat, index) => {
                    const Icon = stat.icon;

                    return (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -6 }}
                            className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300"
                        >

                            <div className="absolute top-6 right-6 opacity-10">
                                <Icon size={60} />
                            </div>

                            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">
                                {stat.title}
                            </p>

                            <h2 className="text-3xl font-semibold">
                                {stat.value}
                            </h2>

                        </motion.div>
                    );
                })}

            </div>

        </AdminLayout>
    );
};

export default AdminDashboard;
