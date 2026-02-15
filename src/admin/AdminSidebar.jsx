import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Package, Users, Settings, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();

    const navItems = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
        { name: "Orders", icon: ShoppingBag, path: "/admin/orders" },
        { name: "Products", icon: Package, path: "/admin/products" },
        { name: "Users", icon: Users, path: "/admin/users" },
        { name: "Settings", icon: Settings, path: "/admin/settings" },
    ];

    return (
        <>
            {/* ================= MOBILE SIDEBAR ================= */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                        />

                        {/* Sidebar */}
                        <motion.aside
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ duration: 0.3 }}
                            className="
                                fixed top-0 left-0 h-full w-72
                                bg-white/5 backdrop-blur-xl
                                border-r border-white/10
                                px-6 py-8
                                z-50 md:hidden
                            "
                        >
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-lg tracking-[0.4em] text-gray-400">
                                    ADMIN
                                </h2>

                                <button onClick={() => setSidebarOpen(false)}>
                                    <X size={20} />
                                </button>
                            </div>

                            <nav className="space-y-4">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const active = location.pathname === item.path;

                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
                                                ${active
                                                    ? "bg-white/10 text-white shadow-lg"
                                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                                }`}
                                        >
                                            <Icon size={18} />
                                            <span className="tracking-wide text-sm">
                                                {item.name}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* ================= DESKTOP SIDEBAR ================= */}
            <aside
                className="
                    hidden md:flex
                    md:w-64 lg:w-72 xl:w-80
                    flex-col
                    bg-white/5 backdrop-blur-xl
                    border-r border-white/10
                    px-6 lg:px-8
                    py-8 lg:py-10
                "
            >
                <h2 className="text-lg tracking-[0.4em] text-gray-400 mb-12">
                    ADMIN
                </h2>

                <nav className="space-y-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = location.pathname === item.path;

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
                                    ${active
                                        ? "bg-white/10 text-white shadow-lg"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <Icon size={18} />
                                <span className="tracking-wide text-sm">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
};

export default AdminSidebar;
