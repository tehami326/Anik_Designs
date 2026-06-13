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
    const [selectedImage, setSelectedImage] = useState(0);  
    const [selectedSize, setSelectedSize] = useState("");     
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await getProductById(id);
            setProduct(data);
            setSelectedImage(0);
            setSelectedSize("");
        };
        fetchProduct();
    }, [id]);

    if (!product) return null;

    const imageList =
        product.images?.length ? product.images : product.image ? [product.image] : [];

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error("Please select a size");
            return;
        }
        addToCart({ ...product, selectedSize });
        toast.success("Item added to cart");
    };

    const handleViewCollection = () => {
        const routeMap = {
            curtains: "/curtains",
            quilts: "/quilts",
            "cushion-covers": "/cushionCovers",
            "wall-hangings": "/wallHangings",
            "home-decor": "/homeDecor",
            garments: "/garments",
        };
        const route = routeMap[product.category?.toLowerCase()];
        if (route) navigate(route);
        else navigate("/");
    };

    return (
        <section className="bg-[#f7f5f2] min-h-screen font-playfair">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-start">

                {/* IMAGE GALLERY */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="w-full flex flex-col items-center gap-4"
                >
                    {/* Main image */}
                    <div className="relative w-full flex justify-center">
                        <img
                            src={imageList[selectedImage]}
                            alt={product.name}
                            className="w-full max-w-[400px] h-[380px] sm:h-[430px] md:h-[480px] object-cover border"
                        />
                        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                    </div>

                    {imageList.length > 1 && (
                        <div className="flex gap-2 flex-wrap justify-center">
                            {imageList.map((src, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setSelectedImage(i)}
                                    className={`border-2 rounded transition ${
                                        selectedImage === i
                                            ? "border-black"
                                            : "border-transparent opacity-60 hover:opacity-90"
                                    }`}
                                >
                                    <img
                                        src={src}
                                        alt={`thumb-${i}`}
                                        className="h-14 w-14 sm:h-16 sm:w-16 object-cover rounded"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
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

                    {/*  SIZE SELECTOR — always visible */}
                    <div className="space-y-3">
                        <p className="text-xs tracking-widest uppercase text-gray-500">
                            Select Size
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                            {(product.sizes?.length > 0
                                ? product.sizes
                                : ["XS", "S", "M", "L", "XL", "XXL", "Free Size"]
                            ).map((size) => (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 text-xs tracking-widest uppercase border transition duration-300 ${
                                        selectedSize === size
                                            ? "bg-black text-white border-black"
                                            : "border-gray-400 text-gray-700 hover:border-black hover:text-black"
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
                        <button
                            onClick={handleAddToCart}
                            className="px-8 sm:px-10 py-3 text-xs tracking-widest uppercase border border-black hover:bg-black hover:text-white transition duration-500"
                        >
                            Add To Cart
                        </button>
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
