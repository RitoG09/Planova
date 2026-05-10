import { NeoCard } from "../ui/neo-card";
import { Calendar, Bed, Thermometer, Users, WifiOff } from "lucide-react";

export function FeatureGrid() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-jakarta font-bold text-white">The Travel OS Features</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <NeoCard className="md:col-span-1 md:row-span-2 p-8 bg-[#f5f5f5] text-black relative overflow-hidden group">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '16px 16px' }} />
          <div className="relative z-10">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 border-2 border-white/20">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-jakarta font-bold mb-3">Smart Itinerary</h3>
            <p className="text-sm font-inter text-zinc-600 mb-8">Dynamic schedules that adjust automatically based on travel times, opening hours, and local traffic.</p>
            <div className="space-y-3">
              <div className="bg-zinc-900 text-white rounded-lg p-3 flex items-center gap-2 border-2 border-white/20">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <span className="text-xs font-semibold">Sightseeing Old Town Square (10:00 AM)</span>
              </div>
              <div className="bg-zinc-900 text-white rounded-lg p-3 flex items-center gap-2 border-2 border-white/20">
                <div className="w-2 h-2 bg-orange-400 rounded-full" />
                <span className="text-xs font-semibold">Lunch at Lokal (1:00 PM)</span>
              </div>
            </div>
          </div>
        </NeoCard>

        {/* Card 2 */}
        <NeoCard className="p-8 bg-[#f5f5f5] text-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '16px 16px' }} />
          <div className="relative z-10 h-full flex flex-col">
            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-6 border-2 border-white/20">
              <Bed className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-xl font-jakarta font-bold mb-3">Hotel Recs</h3>
            <p className="text-sm font-inter text-zinc-600 mb-6 flex-grow">AI agents finding stays based on your aesthetic preferences.</p>
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-blue-200"></div>
              <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-green-200"></div>
              <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-yellow-200"></div>
            </div>
          </div>
        </NeoCard>

        {/* Card 3 */}
        <NeoCard className="p-8 bg-[#f5f5f5] text-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '16px 16px' }} />
          <div className="relative z-10 h-full flex flex-col">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 border-2 border-white/20">
              <Thermometer className="h-6 w-6 text-orange-500" />
            </div>
            <h3 className="text-xl font-jakarta font-bold mb-3">Weather Guard</h3>
            <p className="text-sm font-inter text-zinc-600 mb-6 flex-grow">Smart local alerts with indoor plan alternatives.</p>
            <div className="bg-primary text-white text-xs font-bold py-2 px-4 rounded-lg border-2 border-white/20 inline-flex w-fit">
              RAIN IN 2 HRS
            </div>
          </div>
        </NeoCard>

        {/* Card 4 */}
        <NeoCard className="md:col-span-2 p-8 bg-[#f5f5f5] text-black relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '16px 16px' }} />
          <div className="relative z-10 flex-1">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 border-2 border-white/20">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-jakarta font-bold mb-3">Real-time Collaboration</h3>
            <p className="text-sm font-inter text-zinc-600">Share your workspace with friends. Vote on restaurants, split expenses, and chat instantly within the app canvas.</p>
          </div>
          <div className="relative z-10 bg-zinc-900 border-2 border-white/20 rounded-xl p-4 w-full md:w-64 shadow-neo">
             <div className="flex items-center gap-2 mb-4">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full border border-white/20 bg-red-400"></div>
                  <div className="w-6 h-6 rounded-full border border-white/20 bg-blue-400"></div>
                  <div className="w-6 h-6 rounded-full border border-white/20 bg-green-400"></div>
                </div>
                <span className="text-xs font-bold text-white ml-2 uppercase tracking-wider">Planova Live</span>
             </div>
             <div className="h-2 bg-zinc-800 rounded-full mb-2 overflow-hidden"><div className="h-full bg-secondary w-2/3"></div></div>
             <div className="h-2 bg-zinc-800 rounded-full w-1/2 overflow-hidden"><div className="h-full bg-primary w-full"></div></div>
          </div>
        </NeoCard>

        {/* Card 5 */}
        <NeoCard className="p-8 bg-[#f5f5f5] text-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '16px 16px' }} />
          <div className="relative z-10 h-full flex flex-col">
            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-6 border-2 border-white/20">
              <WifiOff className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="text-xl font-jakarta font-bold mb-3">Offline Access</h3>
            <p className="text-sm font-inter text-zinc-600 mb-8 flex-grow">Your OS works even when the signals drop. Full local-first storage.</p>
            <div className="flex items-center gap-2 text-xs font-bold text-green-600">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
               SYNC COMPLETE
            </div>
          </div>
        </NeoCard>
      </div>
    </section>
  );
}
