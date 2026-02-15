import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api/productApi";

function HomeDecor() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts();

        // Filter only home-decor category
        const filtered = data.filter(
          (product) => product.category === "home-decor"
        );

        setProducts(filtered);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="relative h-[60vh] w-full">
        <img
          src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Home Decor"
          className="h-full w-full object-cover"
        />

        <a
          href="/"
          className="absolute z-10 top-4 left-4 text-white text-2xl p-2 border border-2-white rounded-full hover:bg-white hover:text-black transition"
        >
          <i className="ri-arrow-left-s-line text-4xl flex items-center"></i>
        </a>

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-6">
          <div className="flex flex-row w-full max-w-6xl text-white items-center">
            <h1 className="text-4xl md:text-5xl uppercase tracking-widest flex-1">
              Home Decor
            </h1>

            <div className="w-px h-56 bg-white mx-6"></div>

            <div className="flex-1 text-sm md:text-base">
              <p className="mb-2">
                Elevate your living space with elegance and warmth. Every
                embroidered piece tells a story, bringing comfort and style
                together.
              </p>
              <p>
                Discover unique designs that reflect your personality and make
                your home truly unforgettable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SECTION (UNCHANGED) */}
      <section className="max-w-7xl mx-auto px-6 pb-20 mt-12">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl uppercase tracking-wide mb-4">
              Featured Embroidered Collections
            </h2>
            <p className="text-gray-600 mb-4">
              Experience the artistry of hand-crafted home decor. Each piece is
              designed to bring warmth, elegance, and personality to your living
              space.
            </p>
            <p className="text-gray-600">
              From intricate patterns to timeless designs, our curated
              collection ensures your home tells a story of comfort and style.
            </p>
          </div>

          <div className="md:flex-1">
            <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1628152371231-936cf45eb8f3?q=80&w=387&auto=format&fit=crop"
                alt="Featured Collection"
                className="h-full w-full object-cover hover:scale-105 transition"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE */}
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
            Carefully crafted pieces that bring style, elegance, and personality
            to every corner of your home. Scroll through to discover details and
            inspirations behind each design.
          </p>
        </div>

        {/* shop now - untouched */}
        <div className="mb-5 flex-1 flex justify-center md:justify-end">
          <a
            href="#"
            className="bg-black text-white border border-black px-8 py-3 uppercase tracking-widest hover:bg-white hover:text-black transition rounded"
          >
            SHOP NOW
          </a>
        </div>

        {/* 🔥 DYNAMIC PRODUCT GRID (ONLY CHANGE) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {products.map((product) => (
            <div key={product._id} className="cursor-pointer group">
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

      {/* FOOTER CTA (UNCHANGED) */}
      <section className="bg-black text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl uppercase tracking-wide">
              Bring Elegance Home
            </h2>
            <p className="text-gray-300 mt-2">
              Discover more unique pieces that make your home a reflection of
              your style. Every embroidered detail tells a story of craftsmanship.
            </p>
          </div>

          <div className="flex-1 flex justify-center md:justify-end">
            <a
              href="#"
              className="border border-white px-8 py-3 uppercase tracking-widest hover:bg-white hover:text-black transition rounded"
            >
              Explore More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeDecor;
