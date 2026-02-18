import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/productApi";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await getProductById(id);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Item added to cart");
  };

  const handleViewCollection = () => {
    const routeMap = {
      curtains: "/curtains",
      quilts: "/quilts",
      cushioncovers: "/cushionCovers",
      walldecor: "/wallHangings",
      homedecor: "/homeDecor"
    };

    const route = routeMap[product.category?.toLowerCase()];
    if (route) navigate(route);
    else navigate("/");
  };

  return (
    <section className="bg-[#f7f5f2] min-h-screen font-playfair">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full flex justify-center"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-[400px] h-[400px] sm:h-[450px] md:h-[500px] object-cover border"
          />
          <div className="absolute inset-0 bg-black/5" />
        </motion.div>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
          className="space-y-8 text-center lg:text-left"
        >
          <div className="space-y-3">
            <p className="text-xs tracking-widest uppercase text-gray-500">
              {product.category}
            </p>

            <h1 className="text-2xl sm:text-3xl md:text-4xl tracking-wide text-[#111]">
              {product.name}
            </h1>

            <div className="w-16 h-[1px] bg-black/30 mx-auto lg:mx-0" />
          </div>

          <p className="text-sm leading-loose text-gray-700 max-w-lg mx-auto lg:mx-0">
            {product.description}
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold">
            ₹ {product.price}
          </h2>

          <div className="pt-6 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">

            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              className="px-8 sm:px-10 py-3 text-xs tracking-widest uppercase border border-black hover:bg-black hover:text-white transition duration-500"
            >
              Add To Cart
            </button>

            {/* VIEW COLLECTION */}
            <button
              onClick={handleViewCollection}
              className="px-8 sm:px-10 py-3 text-xs tracking-widest uppercase text-gray-700 hover:text-black transition"
            >
              View Collection
            </button>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ProductPage;
