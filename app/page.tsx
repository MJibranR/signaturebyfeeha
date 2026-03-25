import { Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TrendingSection from "@/components/TrendingSection";
import FeaturedProductSection from "@/components/Featuredproductsection";
import Newarrivals from "@/components/Newarrivals";
import Topbrands from "@/components/Topbrands";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <main
      className="min-h-screen">
      <HeroSection />
      <div className="h-6 md:h-10" />
      <ServicesSection />
      <div className="h-6 md:h-10" />
      <Suspense fallback={<div className="h-40" />}>
        <TrendingSection />
      </Suspense>
      <div className="h-6 md:h-10" />
      <FeaturedProductSection />
      <div className="h-6 md:h-10" />
      <Suspense fallback={<div className="h-40" />}>
        <Newarrivals />
      </Suspense>
      <div className="h-6 md:h-10" />
        <Topbrands />
      <div className="h-6 md:h-10" />
      <Suspense fallback={<div className="h-40" />}>
        <Reviews />
      </Suspense>
      <hr />
    </main>
  );
}