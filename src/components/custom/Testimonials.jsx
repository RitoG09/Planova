import React from "react";

import { cn } from "../../lib/utils.js";
import Marquee from "../ui/marquee.jsx";

const reviews = [
  {
    name: "Ratan",
    username: "@ratan07",
    body: "It felt like having a personal travel assistant available 24/7",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Ashoke",
    username: "@ashokeg15",
    body: "The personalized recommendations from Planova were amazing. ",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "Rahul",
    username: "@ograhul",
    body: "The AI-powered trip planning blew me away. It suggested places that I didn’t even know existed, making my trip unforgettable.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Sonali",
    username: "@sonalihere",
    body: " Planova's suggestions introduced me to places I’d never have discovered on my own!",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Zoya",
    username: "@iamzoya",
    body: "Planova exceeded all expectations. It’s now my go-to tool for planning every journey!",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "King",
    username: "@king",
    body: "With Planova, I no longer worry about overpaying or missing out on experiences.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default function Testimonials() {
  return (
    <div className="flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <h2 className="text-3xl mb-8 font-bold text-slate-500">What Everyone says....</h2>
      <Marquee reverse pauseOnHover className="[--duration:25s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee pauseOnHover className="[--duration:25s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
    </div>
  );
}
