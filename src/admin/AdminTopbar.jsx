import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const AdminTopbar = ({ setSidebarOpen }) => {
    const { user, logout } = useAuth();

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="
                w-full
                bg-white/5 backdrop-blur-xl
                border-b border-white/10
                px-4 sm:px-6 md:px-10 xl:px-16
                py-4 md:py-5
                flex items-center justify-between
            "
        >
            {/* Hamburger (mobile only) */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="md:hidden"
                >
                    <Menu size={22} />
                </button>

                <h1 className="text-xs sm:text-sm uppercase tracking-[0.4em] text-gray-400">
                    Admin Dashboard
                </h1>
            </div>

            <div className="flex items-center gap-6 md:gap-8">
                <div className="text-right hidden sm:block">
                    <p className="text-sm text-gray-300">
                        {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">
                        {user?.role}
                    </p>
                </div>

                <button
                    onClick={logout}
                    className="px-4 sm:px-5 py-2 text-xs uppercase tracking-widest border border-white/20 rounded-full hover:bg-red-600 hover:border-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </motion.header>
    );
};

export default AdminTopbar;
