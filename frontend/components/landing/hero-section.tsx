"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  MapPin,
  Snowflake,
  Utensils,
  Mountain,
  Hotel,
} from "lucide-react";
import { Button } from "../ui/button";

const suggestions = ["7 days in Kyoto", "Weekend in Paris", "Iceland Roadtrip"];

export function HeroSection() {
  const [prompt, setPrompt] = useState(
    "Plan a 5-day Manali trip for couples with a focus on hidden cafes and snowy hikes.",
  );

  return (
    <section className="min-h-screen max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center gap-16 md:flex-row">
      {/* Left Content */}
      <div className="flex-1 space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border-2 border-white/20 bg-secondary px-4 py-1">
          <span className="font-grotesk text-xs font-bold uppercase tracking-widest text-black">
            AI Operating System for Travel
          </span>
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="max-w-2xl font-jakarta text-5xl font-extrabold leading-tight tracking-tight text-white md:text-7xl">
            Plan Trips <span className="text-primary">Conversationally</span>{" "}
            with AI
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-zinc-400">
            Experience the first travel OS where AI agents handle the logistics.
            Just chat, and watch your dream itinerary build itself in real-time.
          </p>
        </div>

        {/* Prompt Card */}
        <div className="max-w-md rounded-2xl border-2 border-white/20 bg-zinc-900 p-6 shadow-neo">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-white/20 bg-primary">
              <Sparkles className="h-5 w-5 text-white" />
            </div>

            <div>
              <p className="font-grotesk text-xs uppercase tracking-widest text-zinc-400">
                AI Assistant
              </p>
            </div>
          </div>

          <div className="mb-4 rounded-xl border border-zinc-700 bg-background p-4 text-sm text-zinc-200">
            “{prompt}”
          </div>

          <div className="flex flex-wrap gap-2">
            {suggestions.map((item) => (
              <Button
                key={item}
                onClick={() => setPrompt(item)}
                className="rounded-sm border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-300 transition hover:border-primary hover:text-white"
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Preview */}
      <div className="relative min-h-[500px] w-full flex-1 overflow-hidden rounded-[28px] border-2 border-white/20 bg-zinc-900 p-6 shadow-[12px_12px_0px_0px_rgba(45,91,255,0.25)]">
        {/* Dot Pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #8e90a2 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Itinerary Card */}
        <div className="relative mb-6 rounded-2xl border-2 border-white/20 bg-zinc-100 p-5 text-black shadow-neo">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="font-jakarta text-2xl font-bold">
                Day 1: Old Manali
              </h3>

              <p className="mt-1 font-grotesk text-xs uppercase tracking-widest text-zinc-500">
                Arrival & Local Discovery
              </p>
            </div>

            <MapPin className="h-7 w-7 text-lime-500" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3">
              <Utensils className="h-4 w-4" />
              <span className="text-sm font-medium">Brunch at Cafe 1947</span>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3">
              <Mountain className="h-4 w-4" />
              <span className="text-sm font-medium">
                Hadimba Temple Forest Walk
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Weather */}
          <div className="rounded-2xl border-2 border-white/20 bg-primary p-4 text-white shadow-neo">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-grotesk text-xs uppercase tracking-widest">
                Weather
              </span>

              <Snowflake className="h-5 w-5" />
            </div>

            <div className="text-3xl font-bold">-2°C</div>

            <div className="text-xs text-blue-100">Snowy / High 5°C</div>
          </div>

          {/* Map Preview */}
          <div className="overflow-hidden rounded-2xl border-2 border-white/20 bg-zinc-800 shadow-neo">
            <Image
              src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1200&auto=format&fit=crop"
              alt="Mountain map preview"
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Floating Hotels */}
        <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-xl border-2 border-white/20 bg-secondary px-4 py-2 shadow-neo">
          <Hotel className="h-4 w-4 text-black" />

          <span className="font-grotesk text-xs font-bold uppercase tracking-widest text-black">
            3 Hotels Found
          </span>
        </div>
      </div>
    </section>
  );
}
