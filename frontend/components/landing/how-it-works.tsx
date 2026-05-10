"use client";

import { MessageSquare, Settings, Map, ArrowRight } from "lucide-react";
import { NeoCard } from "../ui/neo-card";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <MessageSquare className="h-6 w-6 text-white" />,
    iconBg: "bg-primary",
    title: "Chat",
    description: "Describe your vibe, budget, and dream destinations in chat.",
  },
  {
    icon: <Settings className="h-6 w-6 text-black" />,
    iconBg: "bg-secondary",
    title: "Agent Sync",
    description:
      "Specialized agents book flights, find hotels, and map routes.",
  },
  {
    icon: <Map className="h-6 w-6 text-white" />,
    iconBg: "bg-orange-400",
    title: "Live Canvas",
    description: "Collaborate with friends on a living, interactive workspace.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-jakarta font-bold text-white mb-4">
          From Idea to{" "}
          <span className="border-b-4 border-white">Itinerary</span> in 3 Steps
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex-1 w-full relative flex items-center justify-center"
          >
            <NeoCard className="flex flex-col items-center text-center p-8 bg-[#f5f5f5] text-black w-full relative z-10 hover:-translate-y-2 transition-transform duration-300">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border-2 border-white/20 shadow-neo ${step.iconBg}`}
              >
                {step.icon}
              </div>
              <h3 className="text-2xl font-jakarta font-bold mb-3">
                {step.title}
              </h3>
              <p className="text-zinc-600 font-inter text-sm leading-relaxed">
                {step.description}
              </p>
            </NeoCard>

            {index < steps.length - 1 && (
              <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-12 w-16 items-center justify-center z-20 pointer-events-none">
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: "100%", opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                  className="h-[2px] bg-white relative flex items-center"
                >
                  <motion.div
                    animate={{ x: [0, 8, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                    className="absolute -right-4 text-white"
                  >
                    <ArrowRight size={24} strokeWidth={3} color="#c1ff72" />
                  </motion.div>
                </motion.div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
