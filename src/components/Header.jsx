import { Link } from "react-router-dom";
import heroImg from "../assets/hero.webp";


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
        style={{ backgroundImage: `url(${heroImg})` }}
      />


      {/* DARK OVERLAY */}
      <div className="absolute inset-0 -z-10 bg-black/40" />

      {/* CATEGORY BAR */}
      <div
        className="
    relative z-10
    mx-auto max-w-7xl
    px-4 sm:px-6 pt-6
    flex flex-wrap sm:flex-nowrap
    justify-center sm:justify-start
    gap-x-6 sm:gap-x-10 gap-y-3 sm:gap-y-4
    text-center sm:text-left
    font-[Playfair_Display]
    uppercase tracking-[0.35em]
    text-white
  "
      >
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={cat.href}
            className="text-xs sm:text-sm hover:text-rose-300 transition whitespace-nowrap"

          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* HERO CONTENT */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-32 lg:px-8 text-center sm:text-left">
        <h1
          className="
    font-[Playfair_Display]
    text-4xl sm:text-5xl md:text-6xl lg:text-7xl
    uppercase tracking-[0.25em] sm:tracking-[0.3em]
    text-white font-medium
    leading-tight
  "
        >
          crafted Home Décor
        </h1>
      </div>

    </div>
  )
}
