export function DemoSection() {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto border-t border-b border-white/10 my-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-jakarta font-bold text-white">
          Watch Planova in Action
        </h2>
      </div>

      <div className="bg-zinc-900 border-2 border-white rounded-3xl p-6 md:p-10 shadow-neo">
        <div className="flex gap-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-orange-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-start">
            <div className="bg-zinc-800 border border-white/20 text-white rounded-2xl rounded-tl-sm px-6 py-4 max-w-xl text-sm font-inter leading-relaxed">
              "Hey Planova, I want to take a surf trip to Bali next month.
              Budget $2k. Focus on Canggu."
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-primary/20 border border-primary/30 text-blue-100 rounded-2xl rounded-tr-sm px-6 py-4 max-w-xl text-sm font-inter leading-relaxed">
              "Got it. Pulling up the best surf-friendly villas in Canggu. I've
              also checked flight prices for April. Generating your 7-day
              wave-chaser itinerary now..."
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-zinc-800 border border-white/20 rounded-xl p-4 flex items-center gap-4">
              <div className="w-16 h-16 bg-zinc-700 rounded-lg overflow-hidden shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=200&auto=format&fit=crop"
                  alt="Villa"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Villa Senja</h4>
                <p className="text-zinc-400 text-xs mt-1">
                  $142/night • 3 rooms
                </p>
                <span className="text-primary text-xs font-bold mt-2 inline-block">
                  BOOK NOW
                </span>
              </div>
            </div>

            <div className="bg-zinc-800 border border-white/20 rounded-xl p-4 flex flex-col justify-center relative overflow-hidden">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-white font-bold text-sm uppercase tracking-wider">
                  FLIGHT LAX → DPS
                </h4>
                <span className="bg-secondary text-black text-[10px] font-bold px-2 py-1 rounded-md">
                  GOOD
                </span>
              </div>
              <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-blue-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
