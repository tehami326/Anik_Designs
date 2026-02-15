import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const FooterCTA = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-[#f7f5f2] text-[#111] py-24 text-center px-6"
    >
      <h2 className="font-playfair text-3xl md:text-4xl tracking-wide mb-6">
        Elevate Your Living Spaces
      </h2>

      <p className="max-w-xl mx-auto text-sm text-gray-600 leading-loose mb-10">
        Discover handcrafted textile décor designed for timeless interiors
        and refined everyday living.
      </p>

      <button
        onClick={() => navigate("/homeDecor")}
        className="px-10 py-3 text-xs tracking-widest uppercase border border-black hover:bg-black hover:text-white transition duration-500"
      >
        Explore Collection
      </button>
    </motion.section>
  );
};

export default FooterCTA;
