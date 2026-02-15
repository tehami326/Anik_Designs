import { Link } from "react-router-dom";

const categories = [
  { name: 'Home Decor (Embroidered)', href: '/homeDecor' },
  { name: 'Cushion Covers', href: '/cushionCovers' },
  { name: 'Curtains', href: '/curtains' },
  { name: 'Quilts', href: '/quilts' },
  { name: 'Wall Hangings', href: '/wallHangings' },
]


export default function Header() {
  return (
    <div className="relative isolate overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url(/modern-styled-entryway.jpg)" }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 -z-10 bg-black/40" />

      {/* CATEGORY BAR */}
      <div
        className="
            relative z-10
            mx-auto max-w-7xl
            px-6 pt-6
            flex flex-wrap gap-x-10 gap-y-4
            font-[Playfair_Display]
            uppercase tracking-[0.35em]
            text-white
          "
      >
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={cat.href}
            className="text-sm hover:text-rose-300 transition"
          >
            {cat.name}
          </Link>

        ))}
      </div>

      {/* HERO CONTENT */}
      <div className="relative mx-auto max-w-7xl px-6 py-32 lg:px-8">
        <h1
          className="
              font-[Playfair_Display]
              text-5xl sm:text-7xl
              uppercase tracking-[0.3em]
              text-white font-medium
            "
        >
          Handcrafted Home Décor
        </h1>
      </div>

    </div>
  )
}
