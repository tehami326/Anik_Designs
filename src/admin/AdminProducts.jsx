import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import ProductForm from "./ProductForm";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const user = JSON.parse(localStorage.getItem("anik_user"));

    const fetchProducts = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/products`
        );
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        await axios.delete(
            `${import.meta.env.VITE_API_URL}/api/products/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        fetchProducts();
    };

    return (
        <AdminLayout>

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-wide mb-2">
                        Products Management
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Add, edit and manage all products.
                    </p>
                </div>

                <button
                    onClick={() => {
                        setEditingProduct(null);
                        setShowModal(true);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl transition"
                >
                    <Plus size={18} />
                    Add Product
                </button>
            </div>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-300">
                    <thead className="border-b border-white/10 text-xs uppercase tracking-widest text-gray-400">
                        <tr>
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Stock</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product, index) => (
                            <motion.tr
                                key={product._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="border-b border-white/5 hover:bg-white/5 transition"
                            >
                                <td className="px-6 py-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-14 h-14 object-cover rounded-lg"
                                    />
                                </td>

                                <td className="px-6 py-4 font-medium">
                                    {product.name}
                                </td>

                                <td className="px-6 py-4 capitalize">
                                    {product.category}
                                </td>

                                <td className="px-6 py-4">
                                    ₹ {product.price}
                                </td>

                                <td className="px-6 py-4">
                                    {product.stock}
                                </td>

                                <td className="px-6 py-4 flex gap-4">
                                    <button
                                        onClick={() => {
                                            setEditingProduct(product);
                                            setShowModal(true);
                                        }}
                                        className="text-blue-400 hover:text-blue-500 transition"
                                    >
                                        <Pencil size={18} />
                                    </button>

                                    <button
                                        onClick={() => deleteProduct(product._id)}
                                        className="text-red-400 hover:text-red-500 transition"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="lg:hidden space-y-6">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="p-6 border border-white/10 rounded-xl"
                    >
                        <div className="flex gap-4">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-20 h-20 object-cover rounded-lg"
                            />

                            <div className="flex-1">
                                <h3 className="font-medium">
                                    {product.name}
                                </h3>

                                <p className="text-xs text-gray-400 capitalize">
                                    {product.category}
                                </p>

                                <p className="mt-2">
                                    ₹ {product.price}
                                </p>

                                <p className="text-xs text-gray-500">
                                    Stock: {product.stock}
                                </p>

                                <div className="flex gap-4 mt-3">
                                    <button
                                        onClick={() => {
                                            setEditingProduct(product);
                                            setShowModal(true);
                                        }}
                                        className="text-blue-400"
                                    >
                                        <Pencil size={18} />
                                    </button>

                                    <button
                                        onClick={() => deleteProduct(product._id)}
                                        className="text-red-400"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ================= PREMIUM MODAL ================= */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-2xl p-8 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-semibold mb-8">
                            {editingProduct
                                ? "Edit Product"
                                : "Add Product"}
                        </h2>

                        <ProductForm
                            editingProduct={editingProduct}
                            closeModal={() => {
                                setShowModal(false);
                                fetchProducts();
                            }}
                        />
                    </div>
                </div>
            )}

        </AdminLayout>
    );
};

export default AdminProducts;
