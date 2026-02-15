import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const whatsappURL = location.state?.whatsappURL;

    useEffect(() => {
        // Only auto redirect if URL exists
        if (whatsappURL) {
            const timer = setTimeout(() => {
                window.open(whatsappURL, "_blank");
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [whatsappURL]);

    return (
        <section className="relative bg-[#f7f5f2] min-h-screen flex items-center justify-center font-playfair overflow-hidden">

            {/* Luxury Background Glow */}
            <div className="absolute w-[600px] h-[600px] bg-black/5 rounded-full blur-3xl top-[-200px] right-[-200px]" />
            <div className="absolute w-[500px] h-[500px] bg-black/5 rounded-full blur-3xl bottom-[-200px] left-[-200px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative bg-white shadow-2xl p-16 text-center max-w-xl w-full border border-black/5"
            >

                {/* Check Circle */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
                    className="mb-10"
                >
                    <div className="w-24 h-24 mx-auto rounded-full border border-black flex items-center justify-center text-3xl font-light">
                        ✓
                    </div>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="text-4xl tracking-[0.3em] uppercase mb-8"
                >
                    Order Confirmed
                </motion.h1>

                <div className="w-20 h-[1px] bg-black/30 mx-auto mb-8" />

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="text-gray-600 leading-loose mb-10"
                >
                    Thank you for choosing Anik Design.
                    <br />
                    Your handcrafted pieces are being prepared with care.
                    <br />
                    {whatsappURL
                        ? "You will be redirected to WhatsApp shortly."
                        : "If WhatsApp did not open automatically, click below."}
                </motion.p>

                {/* Manual WhatsApp Button */}
                {whatsappURL && (
                    <motion.a
                        href={whatsappURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="border border-black px-10 py-4 uppercase tracking-widest text-sm hover:bg-black hover:text-white transition duration-500"
                    >
                        Open WhatsApp
                    </motion.a>
                )}

                {/* Back Home */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 1 }}
                    className="mt-8"
                >
                    <button
                        onClick={() => navigate("/")}
                        className="text-xs tracking-widest uppercase text-gray-500 hover:text-black transition"
                    >
                        Back to Home
                    </button>
                </motion.div>

            </motion.div>
        </section>
    );
};

export default OrderSuccess;
