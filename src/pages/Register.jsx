import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(form);
            toast.success("Account created successfully");
            navigate("/checkout");
        } catch (error) {
            toast.error("Registration failed");
        }
    };

    return (
        <section className="min-h-screen bg-[#f8f6f3] font-playfair flex items-center justify-center px-6">

            <div className="w-full max-w-lg">

                {/* Heading */}
                <div className="mb-16 text-center">
                    <h1 className="text-5xl tracking-[0.2em] uppercase mb-4">
                        Create Account
                    </h1>
                    <div className="w-16 h-[1px] bg-black/40 mx-auto"></div>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-10"
                >

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-600">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full border-b border-black/30 bg-transparent py-3 focus:outline-none focus:border-black transition"
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full border-b border-black/30 bg-transparent py-3 focus:outline-none focus:border-black transition"
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            className="w-full border-b border-black/30 bg-transparent py-3 focus:outline-none focus:border-black transition"
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full border border-black py-4 uppercase tracking-[0.25em] text-sm hover:bg-black hover:text-white transition duration-500"
                    >
                        Register
                    </button>

                </form>

                <div className="mt-12 text-center text-sm tracking-wide">
                    Already have an account?{" "}
                    <Link to="/login" className="underline hover:opacity-70">
                        Login
                    </Link>
                </div>

            </div>

        </section>
    );
};

export default Register;
