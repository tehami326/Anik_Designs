import { motion } from "framer-motion";

const About = () => {
    return (
        <section className="bg-[#f7f5f2] text-[#111] font-playfair min-h-screen">

            {/* HERO */}
            <div className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-4xl md:text-5xl tracking-[0.25em] uppercase mb-6"
                >
                    About Anik Design
                </motion.h1>

                <div className="w-16 h-[1px] bg-black/30 mx-auto mb-8" />

                <p className="text-sm md:text-base text-gray-600 leading-loose max-w-3xl mx-auto">
                    At Anik Design, we create handcrafted textile décor that blends
                    timeless craftsmanship with modern sophistication. Every piece
                    reflects dedication, detail, and refined artistry.
                </p>
            </div>

            {/* STORY SECTION */}
            <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16 items-center">

                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl tracking-wide mb-6">
                        Our Craftsmanship
                    </h2>

                    <p className="text-gray-600 leading-loose text-sm">
                        Each product is thoughtfully designed and carefully crafted
                        using premium materials. From cushion covers to curtains,
                        our creations bring warmth, elegance, and personality to
                        every living space.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl tracking-wide mb-6">
                        Our Vision
                    </h2>

                    <p className="text-gray-600 leading-loose text-sm">
                        We believe interiors should feel curated, refined, and
                        timeless. Our mission is to deliver handcrafted décor
                        that elevates everyday living into a luxurious experience.
                    </p>
                </motion.div>

            </div>

            {/* CONTACT SECTION */}
            <div className="bg-white py-20 px-6">

                <div className="max-w-4xl mx-auto text-center">

                    <h2 className="text-3xl tracking-wide mb-6">
                        Contact Us
                    </h2>

                    <div className="w-12 h-[1px] bg-black/30 mx-auto mb-8" />

                    <div className="space-y-4 text-gray-600 text-sm">
                        <p>+91 8800621770</p>
                        <p>+91 9350005010</p>
                        <p className="hover:text-black transition">
                            anikdesigns342@gmail.com
                        </p>
                    </div>

                </div>

            </div>

        </section>
    );
};

export default About;
