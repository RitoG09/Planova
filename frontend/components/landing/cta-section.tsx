import { NeoButton } from "../ui/neo-button";

export function CTASection() {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <div className="rounded-3xl border-2 border-white/20 bg-gradient-to-br from-[#c1d3ff] to-[#e1d5ff] p-12 md:p-20 text-center shadow-neo">
        <h2 className="text-3xl md:text-5xl font-jakarta font-extrabold text-black mb-6">
          Start Planning Your Next Adventure
        </h2>
        <p className="text-black/70 font-inter max-w-xl mx-auto mb-10 text-lg">
          Join 50,000+ travelers using Planova to escape the ordinary. It's free to start.
        </p>
        <NeoButton className="bg-zinc-900 text-white hover:bg-black font-bold text-lg px-8 py-6 rounded-xl">
          Launch My Trip
        </NeoButton>
      </div>
    </section>
  );
}
