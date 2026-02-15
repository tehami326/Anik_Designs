import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const query = new URLSearchParams(useLocation().search).get("q");

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/products`
            );

            const filtered = data.filter((product) =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );

            setResults(filtered);
        };

        if (query) fetchProducts();
    }, [query]);

    return (
        <section className="bg-white min-h-screen px-6 py-20">
            <h1 className="text-3xl uppercase tracking-widest mb-12">
                Search Results for "{query}"
            </h1>

            {results.length === 0 ? (
                <p className="text-gray-500">No products found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {results.map((product) => (
                        <Link key={product._id} to={`/product/${product._id}`}>
                            <div className="group">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-80 w-full object-cover rounded-md group-hover:scale-105 transition"
                                />
                                <h3 className="mt-4 uppercase tracking-widest text-sm">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-500 capitalize">
                                    {product.category.replace("-", " ")}
                                </p>
                                <p className="mt-1 font-medium">₹{product.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
};

export default SearchResults;
