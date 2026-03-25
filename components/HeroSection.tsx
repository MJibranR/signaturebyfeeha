import Image from "next/image";
import Hero from '@/images/hero.png'

export default function HeroSection() {
  return (
    <section style={{ backgroundColor: "transparent" }} className="py-6 px-0 md:px-6">
      <div className="max-w-screen-xl mx-auto">

        {/* ── Headline ── */}
        {/* <div className="text-center mb-5">
          <h1
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              lineHeight: 1.2,
            }}
            className="text-3xl md:text-5xl font-bold"
          >
            <span style={{ color: "#8B6914", fontStyle: "italic", fontWeight: 300 }}>
              Elevate{" "}
            </span>
            <span style={{ color: "#8B6914", fontStyle: "italic", fontWeight: 900 }}>
              Y
            </span>
            <span style={{ color: "#8B6914", fontStyle: "italic", fontWeight: 300 }}>
              our Scent,
            </span>
            <span className="block md:inline" style={{ color: "#1a1a1a" }}>
              {" "}Delivery Included Nationwide
            </span>
          </h1>
        </div> */}

        {/* ── Hero Image (6-in-1 composite) ── */}
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