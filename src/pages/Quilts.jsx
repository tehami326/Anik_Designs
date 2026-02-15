import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api/productApi";

function Quilts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await getProducts();
                const filtered = data.filter(
                    (product) => product.category === "quilts"
                );
                setProducts(filtered);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="overflow-hidden">

            {/* HERO SECTION */}
            <section className="relative h-[60vh] w-full">
                <img
                    src="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1200&auto=format&fit=crop"
                    alt="Quilts"
                    className="h-full w-full object-cover"
                />

                <a
                    href="/"
                    className="absolute z-20 top-4 left-4 text-white text-2xl p-2 border border-white rounded-full hover:bg-white hover:text-black transition"
                >
                    <i className="ri-arrow-left-s-line text-4xl"></i>
                </a>

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-6">
                    <div className="flex w-full max-w-6xl text-white items-center">
                        <h1 className="text-4xl md:text-5xl uppercase tracking-widest flex-1">
                            Quilts
                        </h1>

                        <div className="hidden md:block w-px h-56 bg-white mx-6"></div>

                        <div className="flex-1 text-sm md:text-base">
                            <p className="mb-2">
                                Experience comfort and warmth with handcrafted quilts.
                            </p>
                            <p>
                                Designed to blend timeless artistry with modern elegance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* background svg */}
            <div
                className="relative"
                style={{
                    backgroundImage: "url('/circle.svg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-white/80"></div>

                <div className="relative z-10">

                    {/* FEATURED SECTION */}
                    <section className="mt-12 max-w-7xl mx-auto px-6 pb-20">
                        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
                            <div className="md:flex-1 text-center md:text-left">
                                <h2 className="text-3xl md:text-4xl uppercase tracking-wide mb-4">
                                    Featured Quilt Collection
                                </h2>
                                <p className="text-gray-700 mb-4">
                                    Premium embroidered quilts crafted with care and precision.
                                </p>
                                <p className="text-gray-700">
                                    Bringing warmth, luxury, and sophistication to your home.
                                </p>
                            </div>

                            <div className="md:flex-1">
                                <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
                                    <img
                                        src="https://images.unsplash.com/photo-1582582621959-48d27397dc69?q=80&w=2070&auto=format&fit=crop"
                                        alt="Featured Quilt"
                                        className="h-full w-full object-cover hover:scale-105 transition"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* PRODUCT GRID */}
                    <section className="max-w-7xl mx-auto px-6 pb-24">
                        <div className="text-center mb-12">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-16 h-px bg-gray-300"></div>
                                <span className="mx-4 text-gray-500 uppercase tracking-widest text-sm">
                                    Our Designs
                                </span>
                                <div className="w-16 h-px bg-gray-300"></div>
                            </div>
                            <h2 className="text-3xl md:text-4xl uppercase tracking-wide mb-2">
                                Explore the Collection
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Designs that elevate comfort and aesthetics in equal measure.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                            {products.map((product) => (
                                <div key={product._id} className="group cursor-pointer">
                                    <Link to={`/product/${product._id}`}>
                                        <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-md">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    </Link>
                                    <div className="mt-4 text-center">
                                        <h3 className="text-sm uppercase tracking-wide">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            ₹ {product.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>

            {/* FOOTER CTA */}
            <section className="bg-black text-white py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl uppercase tracking-wide">
                            Wrap Yourself in Comfort
                        </h2>
                        <p className="text-gray-300 mt-2">
                            Discover quilts that redefine warmth and elegance.
                        </p>
                    </div>

                    <div className="flex-1 flex justify-center md:justify-end">
                        <a
                            href="#"
                            className="border border-white px-8 py-3 uppercase tracking-widest hover:bg-white hover:text-black transition rounded"
                        >
                            Shop Now
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Quilts;
