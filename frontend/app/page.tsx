import { HeroSection } from "@/components/landing/hero-section";
import { Navbar } from "@/components/landing/navbar";
import { HowItWorks } from "@/components/landing/how-it-works";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { DemoSection } from "@/components/landing/demo-section";
import { Testimonials } from "@/components/landing/testimonials";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="bg-background font-sans text-white min-h-screen">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeatureGrid />
      <DemoSection />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}
