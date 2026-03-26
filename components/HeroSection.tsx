// components/HeroSection.tsx
import Image from "next/image";
import Hero from '../public/images/hero.png';

interface HeroSectionProps {
  heroImage?: string;
  heroVideo?: string;
  heroType?: 'image' | 'video';
}

export default function HeroSection({ heroImage, heroVideo, heroType = 'image' }: HeroSectionProps) {
  // If video hero is provided and enabled
  if (heroType === 'video' && heroVideo) {
    return (
      <section 
        className="w-full relative"
        style={{ backgroundColor: "transparent", position: "relative" }}
      >
        <div className="max-w-screen-xl mx-auto px-0 md:px-6 py-6">
          <div className="relative w-full overflow-hidden rounded-none md:rounded-lg">
            <video
              src={heroVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>
    );
  }

  // If custom image hero is provided from DB
  if (heroImage) {
    return (
      <section 
        className="w-full relative"
        style={{ backgroundColor: "transparent", position: "relative" }}
      >
        <div className="max-w-screen-xl mx-auto px-0 md:px-6 py-6">
          <div className="relative w-full overflow-hidden rounded-none md:rounded-lg">
            {heroImage.startsWith('data:') || heroImage.startsWith('http') ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={heroImage}
                alt="Signature by Feeha hero banner"
                className="w-full h-auto object-cover"
              />
            ) : (
              <Image
                src={heroImage}
                alt="Signature by Feeha hero banner"
                width={1200}
                height={700}
                className="w-full h-auto object-cover"
                priority
              />
            )}
          </div>
        </div>
      </section>
    );
  }

  // Default hero
  return (
    <section 
      className="w-full relative"
      style={{ backgroundColor: "transparent", position: "relative" }}
    >
      <div className="max-w-screen-xl mx-auto px-0 md:px-6 py-6">
        <div className="relative w-full overflow-hidden rounded-none md:rounded-lg">
          <Image
            src={Hero}
            alt="Signature by Feeha hero banner"
            width={1200}
            height={700}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}