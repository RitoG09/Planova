import { NeoCard } from "../ui/neo-card";

const reviews = [
  {
    text: "Planova isn't a shortcut. It works better than I could ever imagine. The weather alerts saved our Paris trip!",
    author: "Sarah Jenkins",
    role: "Digital Nomad",
    avatarColor: "bg-blue-200"
  },
  {
    text: "The collaboration features are unmatched. My group of 6 planned a Japan trip in record time without any arguments.",
    author: "Mark Chen",
    role: "Tech Reviewer",
    avatarColor: "bg-green-200"
  },
  {
    text: "It's like having a professional travel agent in your pocket who knows exactly what you like.",
    author: "Elena Rodriguez",
    role: "Adventure Blogger",
    avatarColor: "bg-orange-200"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-jakarta font-bold text-white">Loved by Adventurers</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, i) => (
          <NeoCard 
            key={i} 
            className={`p-8 bg-[#f5f5f5] text-black flex flex-col ${i === 0 ? '-rotate-2' : i === 2 ? 'rotate-2' : ''} transition-transform hover:rotate-0`}
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <svg key={j} className="w-4 h-4 text-orange-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <p className="text-sm font-inter text-zinc-700 italic flex-grow mb-6">"{review.text}"</p>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full border-2 border-white/20 ${review.avatarColor}`}></div>
              <div>
                <h4 className="font-bold text-sm leading-none">{review.author}</h4>
                <p className="text-xs text-zinc-500 mt-1">{review.role}</p>
              </div>
            </div>
          </NeoCard>
        ))}
      </div>
    </section>
  );
}
