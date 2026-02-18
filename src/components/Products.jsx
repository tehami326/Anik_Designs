import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api/productApi";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts();
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">

        <h2
          className="
            font-[Playfair_Display]
            text-2xl sm:text-3xl md:text-4xl
            uppercase tracking-[0.25em]
            text-gray-900
          "
        >
          Customers Also Purchased
        </h2>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-10 sm:gap-y-14">
          {products.map((product) => (
            <div key={product._id} className="group relative">

              {/* IMAGE */}
              <div className="overflow-hidden rounded-md bg-gray-100">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="
                      h-64 sm:h-72 md:h-80
                      w-full object-cover
                      transition-transform duration-500
                      group-hover:scale-105
                    "
                  />
                </Link>
              </div>

              {/* TEXT */}
              <div className="mt-4 flex justify-between items-start">
                <div>
                  <h3
                    className="
                      font-[Playfair_Display]
                      text-sm uppercase
                      tracking-widest
                      text-gray-800
                    "
                  >
                    <Link to={`/product/${product._id}`}>
                      {product.name}
                    </Link>
                  </h3>

                  <p
                    className="
                      mt-1 text-xs uppercase tracking-[0.2em]
                      text-gray-500
                      font-[Playfair_Display]
                    "
                  >
                    {product.category.replace("-", " ")}
                  </p>
                </div>

                <p
                  className="
                    font-[Playfair_Display]
                    text-sm font-medium
                    text-gray-900
                  "
                >
                  ₹{product.price}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
