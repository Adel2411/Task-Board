import CallToAction from "@/components/landing-page/CallToAction";
import FAQ from "@/components/landing-page/FAQ";
import Features from "@/components/landing-page/Features";
import Hero from "@/components/landing-page/Hero";
import HowItWorks from "@/components/landing-page/HowItWorks";
import Navbar from "@/components/landing-page/Navbar";
import Showcase from "@/components/landing-page/Showcase";

export default function Home() {
  return (
    <main className="bg-background">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Showcase />
      <FAQ />
      <CallToAction />
    </main>
  );
}
