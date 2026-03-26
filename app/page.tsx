export const dynamic = "force-dynamic";
import { Suspense } from "react";
import { getHomepageConfig } from "@/lib/actions/homepage";
import { DEFAULT_HOMEPAGE_CONFIG } from "@/lib/config/homepage";
import { getAllProductsAction } from "@/lib/actions/products";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TrendingSection from "@/components/TrendingSection";
import FeaturedProductSection from "@/components/Featuredproductsection";
import Newarrivals from "@/components/Newarrivals";
import Topbrands from "@/components/Topbrands";
import Reviews from "@/components/Reviews";

export default async function Home() {
  // Fetch homepage configuration from Neon DB
  const config = await getHomepageConfig();
  const homepageConfig = config || DEFAULT_HOMEPAGE_CONFIG;

  // Fetch all products from Neon DB using server action
  const allProducts = await getAllProductsAction();

  const isSectionEnabled = (sectionKey: string) => {
    const section = homepageConfig.sections.find(s => s.key === sectionKey);
    return section?.enabled ?? true;
  };

  const trendingProductIds = homepageConfig.trendingProducts || [];
  const newArrivalProductIds = homepageConfig.newArrivalProducts || [];
  
  const trendingProducts = allProducts.filter(p => trendingProductIds.includes(p.id));
  const newArrivalProducts = allProducts.filter(p => newArrivalProductIds.includes(p.id));

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      {isSectionEnabled("hero") && (
        <>
          <HeroSection 
            heroImage={homepageConfig.heroImage}
            heroVideo={homepageConfig.heroVideo}
            heroType={homepageConfig.heroType}
          />
          <div className="h-6 md:h-10" />
        </>
      )}

      {/* Services Section */}
      {isSectionEnabled("services") && (
        <>
          <ServicesSection />
          <div className="h-6 md:h-10" />
        </>
      )}

      {/* Trending Section */}
      {isSectionEnabled("trending") && trendingProducts.length > 0 && (
        <>
          <Suspense fallback={<div className="h-40 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
          </div>}>
            <TrendingSection products={trendingProducts} />
          </Suspense>
          <div className="h-6 md:h-10" />
        </>
      )}

      {/* Featured Products Section */}
      {isSectionEnabled("featured") && homepageConfig.featuredSets && homepageConfig.featuredSets.length > 0 && (
        <>
          <FeaturedProductSection featuredSets={homepageConfig.featuredSets} />
          <div className="h-6 md:h-10" />
        </>
      )}

      {/* New Arrivals Section */}
      {isSectionEnabled("arrivals") && newArrivalProducts.length > 0 && (
        <>
          <Suspense fallback={<div className="h-40 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
          </div>}>
            <Newarrivals products={newArrivalProducts} />
          </Suspense>
          <div className="h-6 md:h-10" />
        </>
      )}

      {/* Top Brands Section */}
      {isSectionEnabled("brands") && homepageConfig.brands && homepageConfig.brands.length > 0 && (
        <>
          <Topbrands brands={homepageConfig.brands} />
          <div className="h-6 md:h-10" />
        </>
      )}

      {/* Reviews Section */}
      {isSectionEnabled("reviews") && homepageConfig.reviews && homepageConfig.reviews.length > 0 && (
        <>
          <Suspense fallback={<div className="h-40 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
          </div>}>
            <Reviews reviews={homepageConfig.reviews} />
          </Suspense>
          <hr />
        </>
      )}
    </main>
  );
}