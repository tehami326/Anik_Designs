import { useState, useEffect } from "react";
import axios from "axios";

const categories = [
    "home-decor",
    "cushion-covers",
    "curtains",
    "quilts",
    "wall-hangings",
    "garments",         
];

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"];

const ProductForm = ({ editingProduct, closeModal }) => {
    const user = JSON.parse(localStorage.getItem("anik_user"));

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        sizes: [],
        images: [],
    });

    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        if (editingProduct) {
            setForm({
                ...editingProduct,
                images: [],
                sizes: editingProduct.sizes || [],
            });
            // show existing images as previews
            if (editingProduct.images?.length) {
                setPreviews(editingProduct.images);
            } else if (editingProduct.image) {
                setPreviews([editingProduct.image]);
            }
        }
    }, [editingProduct]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 6);
        setForm({ ...form, images: files });
        setPreviews(files.map((f) => URL.createObjectURL(f)));
    };

    const toggleSize = (size) => {
        setForm((prev) => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter((s) => s !== size)
                : [...prev.sizes, size],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("category", form.category);
        formData.append("stock", form.stock);
        formData.append("sizes", JSON.stringify(form.sizes));

        form.images.forEach((img) => formData.append("image", img));

        const headers = { Authorization: `Bearer ${user.token}` };
        const url = `${import.meta.env.VITE_API_URL}/api/products`;

        if (editingProduct) {
            await axios.put(`${url}/${editingProduct._id}`, formData, { headers });
        } else {
            await axios.post(url, formData, { headers });
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
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            {/* ✅ SIZES */}
            <div>
                <p className="text-xs uppercase tracking-widest text-white/60 mb-2">
                    Sizes (select all that apply)
                </p>
                <div className="flex flex-wrap gap-2">
                    {ALL_SIZES.map((size) => (
                        <button
                            type="button"
                            key={size}
                            onClick={() => toggleSize(size)}
                            className={`px-3 py-1 rounded-lg border text-sm transition ${
                                form.sizes.includes(size)
                                    ? "bg-white text-black border-white"
                                    : "bg-white/5 border-white/20 text-white/70 hover:border-white/50"
                            }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* ✅ MULTI-IMAGE UPLOAD */}
            <div>
                <p className="text-xs uppercase tracking-widest text-white/60 mb-2">
                    Product Images (up to 6)
                </p>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full text-sm"
                    onChange={handleImageChange}
                />
                {previews.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {previews.map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                alt={`preview-${i}`}
                                className="h-16 w-full object-cover rounded-lg border border-white/10"
                            />
                        ))}
                    </div>
                )}
            </div>

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


