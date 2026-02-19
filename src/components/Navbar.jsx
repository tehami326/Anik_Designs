import { useState } from "react";
import { Search, CircleUser, ShoppingCart, Info, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { cartCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/search?q=${query}`);
    setShowSearch(false);
    setQuery("");
  };

  return (
    <div className="relative flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white shadow-md w-full">

      {/* CENTER BRAND */}
      <h1
        onClick={() => navigate("/")}
        className="
    absolute sm:left-1/2 left-4
    sm:-translate-x-1/2 translate-x-0
    text-lg sm:text-xl md:text-3xl
    font-medium uppercase tracking-[0.35em]
    font-[Playfair_Display] text-gray-900
    whitespace-nowrap
    cursor-pointer
  "
      >
        ANIK DESIGNS
      </h1>


      {/* RIGHT ICONS */}
      <div className="ml-auto flex items-center gap-3 sm:gap-6 relative z-10">

        {/* SEARCH ICON */}
        <Search
          onClick={() => setShowSearch(true)}
          className="text-red-500 cursor-pointer hover:scale-110 transition w-5 h-5 sm:w-6 sm:h-6"
        />

        {/* ROLE BASED USER ICON */}
        {!user && (
          <Link to="/login">
            <CircleUser className="text-red-500 cursor-pointer hover:scale-110 transition w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
        )}

        {user && user.role === "user" && (
          <Link to="/orders">
            <CircleUser className="text-red-500 cursor-pointer hover:scale-110 transition w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
        )}

        {user && user.role === "admin" && (
          <Link to="/admin/dashboard">
            <CircleUser className="text-red-500 cursor-pointer hover:scale-110 transition w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
        )}

        {/* CART */}
        <Link to="/cart" className="relative">
          <ShoppingCart className="text-red-500 cursor-pointer hover:scale-110 transition w-5 h-5 sm:w-6 sm:h-6" />

          <AnimatePresence>
            {cartCount > 0 && (
              <motion.span
                key="badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute -top-2 -right-2 bg-black text-white text-[10px] px-2 py-[2px] rounded-full tracking-wide"
              >
                {cartCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        <Link to="/about">
          <Info className="text-red-500 cursor-pointer hover:scale-110 transition w-5 h-5 sm:w-6 sm:h-6" />
        </Link>

      </div>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 bg-white flex items-center justify-center z-50 px-4"
          >
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-4 w-full max-w-2xl"
            >
              <input
                autoFocus
                type="text"
                placeholder="Search handcrafted products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 border-b border-black py-2 sm:py-3 text-base sm:text-lg outline-none font-playfair"
              />

              <button type="submit">
                <Search className="text-black cursor-pointer" />
              </button>

              <X
                onClick={() => setShowSearch(false)}
                className="cursor-pointer text-black"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Navbar;
