import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const footerVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
};

const Footer = () => {
  return (
    <motion.footer
      className="bg-[#0b0b0b] text-gray-300 font-playfair"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Top divider */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#e6c28b]/40 to-transparent" />

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">

        {/* Brand */}
        <div className="space-y-6">
          <h2 className="text-2xl tracking-[0.35em] font-medium text-[#e6c28b]">
            ANIK DESIGN
          </h2>

          <div className="w-12 h-[1px] bg-[#e6c28b]/60" />

          <p className="text-sm leading-loose text-gray-400 max-w-sm">
            Handcrafted elegance for refined living. Premium textile décor inspired by timeless craftsmanship and modern sophistication.
          </p>
        </div>

        {/* Products */}
        <div className="space-y-6">
          <h3 className="text-sm uppercase tracking-widest text-[#e6c28b]">
            Products
          </h3>

          <ul className="space-y-3 text-sm text-gray-400">
            {[
              { name: "Home Decor (Embroidered)", href: "/homeDecor" },
              { name: "Cushion Covers", href: "/cushionCovers" },
              { name: "Curtains", href: "/curtains" },
              { name: "Quilts", href: "/quilts" },
              { name: "Wall Hangings", href: "/wallHangings" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="hover:text-[#e6c28b] transition-all duration-300 block"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-6">
          <h3 className="text-sm uppercase tracking-widest text-[#e6c28b]">
            Contact
          </h3>

          <div className="space-y-3 text-sm text-gray-400">
            <p>+91 8800621770</p>
            <p>+91 9350005010</p>
            <p className="hover:text-[#e6c28b] transition">
              anikdesigns342@gmail.com
            </p>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-white/5 py-6 text-center text-[11px] tracking-widest text-gray-500 uppercase">
        © {new Date().getFullYear()} Anik Design — Crafted with Care
      </div>
    </motion.footer>
  );
};

export default Footer;