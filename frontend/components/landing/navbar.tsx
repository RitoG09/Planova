import Link from "next/link";
import { NeoButton } from "../ui/neo-button";

export function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 flex justify-between items-center px-6 py-3 bg-[#1d1f29] rounded-xl border-2 border-white/20 shadow-neo hover:shadow-neo-lg transition-all duration-200">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-jakarta font-black text-white tracking-tighter">
          Planova
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          <Link
            className="text-primary font-bold border-b-2 border-primary pb-1 font-inter text-sm transition-transform duration-200 hover:-translate-y-0.5"
            href="#explore"
          >
            Explore
          </Link>
          <Link
            className="text-zinc-400 hover:text-white font-inter text-sm transition-transform duration-200 hover:-translate-y-0.5"
            href="#community"
          >
            Community
          </Link>
          <Link
            className="text-zinc-400 hover:text-white font-inter text-sm transition-transform duration-200 hover:-translate-y-0.5"
            href="#guide"
          >
            Guide
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="hidden sm:block text-zinc-400 font-bold hover:text-white px-4 py-2 transition-all active:scale-95"
        >
          Log In
        </Link>
        <NeoButton className="bg-primary text-white font-bold px-6 py-2 rounded-lg border-2 border-white/20 shadow-neo active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
          Get Started
        </NeoButton>
      </div>
    </nav>
  );
}
