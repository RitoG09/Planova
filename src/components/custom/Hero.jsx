import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import Particles from "../ui/particles.jsx";

function Hero() {
  const [theme, setTheme] = useState("light");
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    const currentTheme = window.matchMedia("(prefers-color-scheme:dark)")
      .matches
      ? "dark"
      : "light";
    setTheme(currentTheme);
  }, []);

  useEffect(() => {
    setColor(theme === "dark" ? "#000000" : "#ffffff");
  }, [theme]);

  return (
    <section className=" flex flex-col items-center gap-8 pb-20 pt-10 sm:gap-10 justify-between ">
    
      <div className="flex cursor-pointer items-center gap-1 rounded-full border bg-secondary px-3 py-0.5 hover:bg-secondary/60 bg-blue-50">
        <span className="text-sm text-secondary-foreground">
          "Why Choose Planova?"
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-right"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793L9.146 4.354a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
          />
        </svg>
      </div>
      <h1 className="max-w-2xl text-center font-heading text-4xl font-semibold sm:text-5xl tracking-tight text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text">
        Your AI-Powered Trip Planner for Effortless and Personalized Journeys.
      </h1>
      <p className="max-w-lg text-center text-lg text-muted-foreground sm:text-xl">
        Plan Smarter, Travel Better with Planova with your personalized budget
      </p>
      <div className="grid grid-cols-2 gap-3">
        <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
          Learn More
        </Button>
        <Link to={"/new-trip"}>
          <Button className="cursor-pointer bg-primary text-white rounded-lg px-6 py-3 text-lg hover:bg-yellow-700 transition bg-blue-950">
            Get Started
          </Button>
        </Link>
      </div>
      <div className="relative sm:mt-5">
        <img
          alt="travel photo"
          src="/logo1.jpeg"
          className="w-full max-w-4xl border border-border shadow-lg rounded-2xl"
        />
        <div className="absolute inset-0 -z-10 bg-primary/20 [filter:blur(180px)]" />
      </div>
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </section>
    
  );
}

export default Hero;
