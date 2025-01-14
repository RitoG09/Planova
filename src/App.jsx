import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import Hero from "./components/custom/Hero";
import Footer from "./components/custom/Footer";
import Testimonials from "./components/custom/Testimonials";

function App() {
  return (
    <div>
      <Hero />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
