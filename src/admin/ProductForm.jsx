import { useState, useEffect } from "react";
import axios from "axios";

const categories = [
    "home-decor",
    "cushion-covers",
    "curtains",
    "quilts",
    "wall-hangings",
];

const ProductForm = ({ editingProduct, closeModal }) => {
    const user = JSON.parse(localStorage.getItem("anik_user"));

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: null,
    });

    useEffect(() => {
        if (editingProduct) {
            setForm({
                ...editingProduct,
                image: null,
            });
        }
    }, [editingProduct]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("category", form.category);
        formData.append("stock", form.stock);

        if (form.image) {
            formData.append("image", form.image);
        }

        if (editingProduct) {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/products/${editingProduct._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
        } else {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/products`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
        }

        closeModal();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            <input
                type="text"
                placeholder="Product Name"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <textarea
                placeholder="Description"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                    type="number"
                    placeholder="Price"
                    required
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                />

                <input
                    type="number"
                    placeholder="Stock"
                    required
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                />
            </div>

            <select
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            <input
                type="file"
                accept="image/*"
                className="w-full"
                onChange={(e) =>
                    setForm({ ...form, image: e.target.files[0] })
                }
            />

            <button
                type="submit"
                className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl transition"
            >
                {editingProduct ? "Update Product" : "Create Product"}
            </button>

        </form>
    );
};

export default ProductForm;
