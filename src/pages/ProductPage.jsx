import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/productApi";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";

const ProductPage = () => {
  const { id } = useParams();
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

  return (
    <section className="bg-[#f7f5f2] min-h-screen font-playfair">
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-[400px] h-[500px] object-cover border"
          />
          <div className="absolute inset-0 bg-black/5" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
          className="space-y-8"
        >
          <div className="space-y-3">
            <p className="text-xs tracking-widest uppercase text-gray-500">
              {product.category}
            </p>

            <h1 className="text-4xl tracking-wide text-[#111]">
              {product.name}
            </h1>

            <div className="w-16 h-[1px] bg-black/30" />
          </div>

          <p className="text-sm leading-loose text-gray-700 max-w-lg">
            {product.description}
          </p>

          <h2 className="text-2xl font-semibold">
            ₹ {product.price}
          </h2>

          <div className="pt-6 flex gap-6 flex-wrap">

            {/* ADD TO CART BUTTON */}
            <button
              onClick={handleAddToCart}
              className="px-10 py-3 text-xs tracking-widest uppercase border border-black hover:bg-black hover:text-white transition duration-500"
            >
              Add To Cart
            </button>

            {/* KEEP VIEW COLLECTION SAME */}
            <button className="px-10 py-3 text-xs tracking-widest uppercase text-gray-700 hover:text-black transition">
              View Collection
            </button>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ProductPage;
