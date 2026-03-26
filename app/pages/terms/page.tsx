"use client";
import { useState, useEffect } from "react";
import { getPageData } from "@/lib/actions/pages";

type Section = {
  id: number;
  title: string;
  body: string;
};

// Default sections as fallback
const DEFAULT_SECTIONS: Section[] = [
  {
    id: 1,
    title: "Order Placement & Acceptance",
    body: "Order placing is to be done through the \"my cart\" option, which will generate an email informing us about what you have purchased from the website. You will be sent a confirmation email as an acknowledgment and the product(s) ordered will be dispatched at the soonest. Please take note that international customers shall be given 36 hours from the time of placing an order to make their payment, failing to do so will automatically result in cancellation.",
  },
  {
    id: 2,
    title: "Content Accuracy",
    body: "Signature by Feeha ensures that the price and descriptions of all products published on the website are error-free. However, the weight and dimensions of the products are an estimated measure of the actual good and packaging may vary from the displayed version. Other than this, the parcel you receive is going to be an exact version of what you order from us online.",
  },
  {
    id: 3,
    title: "Privacy Policy",
    body: "Our order and shipping process is dealt with high confidentiality where your personal data is solely used to ensure a secure and smooth order transaction. We do not share, sell, or misuse your personal information under any circumstances.",
  },
  {
    id: 4,
    title: "Delivery Charges",
    body: "Customers throughout Pakistan are provided with the ease of cash on delivery, while international customers are requested to make an advance payment through bank transfer, Western Union, or Money Gram. Our delivery charges for Pakistan are Rs. 200 per order.",
  },
  {
    id: 5,
    title: "Shipment",
    body: "The shipping time for orders across Pakistan is 2 to 4 working days, while international customers will have to wait 5 to 7 working days. Unexpected delays can occur due to customs clearance. International customers need to email us the following details according to their chosen mode of payment:\n\n• Bank Transfer — Order number(s) and transaction slip number.\n• Western Union — Order number(s), sender's first and last name as on the Western Union receipt, 10-digit MTCN number.\n• Money Gram — Order number(s), sender's first and last name as on the Money Gram receipt, 8-digit reference number.",
  },
  {
    id: 6,
    title: "Exchange Policy",
    body: "We work on a no-return policy and sold items are exchangeable only within a timeframe of 5 days. All purchases are non-refundable. Only in the case where a product turns out to be defective, the customer will be allowed to exchange it with an item falling in the same or higher price range.",
  },
  {
    id: 7,
    title: "Communication",
    body: "Any suggestions, feedback, complaints, and instructions regarding your order are to be given through call or email using the following details:\n\n• Phone: +923353537028\n• Email: signaturebyfeeha@gmail.com\n• WhatsApp: +923353537028",
  },
];

// Map of section titles to their respective icons
const getIconForTitle = (title: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    "Order Placement & Acceptance": (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
    "Content Accuracy": (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    "Privacy Policy": (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    "Delivery Charges": (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    "Shipment": (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    ),
    "Exchange Policy": (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    ),
    "Communication": (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  };
  
  return iconMap[title] || (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  );
};

export default function TermsPage() {
  const [sections, setSections] = useState<Section[]>(DEFAULT_SECTIONS);
  const [loading, setLoading] = useState(true);

  // Fetch terms data from Neon DB on mount
  useEffect(() => {
    async function loadTerms() {
      try {
        const data = await getPageData("terms");
        if (data && Array.isArray(data) && data.length > 0) {
          setSections(data as Section[]);
        }
      } catch (error) {
        console.error("Failed to load terms and conditions:", error);
      } finally {
        setLoading(false);
      }
    }
    loadTerms();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <main className="min-h-screen py-16 px-4">
        <div className="max-w-screen-md mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3">
              <div className="w-6 h-6 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm" style={{ color: "#8B6914" }}>Loading Terms & Conditions...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen py-16 px-4">
        <div className="max-w-screen-md mx-auto">

          {/* Heading */}
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.35em] uppercase mb-3" style={{ color: "#a89070" }}>
              Please read carefully
            </p>
            <h1
              className="text-3xl md:text-4xl font-black tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}
            >
              Terms &amp; Conditions
            </h1>
            <div className="flex items-center gap-3 justify-center mb-6">
              <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #C9A84C)" }} />
              <span style={{ color: "#C9A84C" }}>✦</span>
              <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #C9A84C)" }} />
            </div>

            {/* Intro card */}
            <div
              className="rounded-2xl px-8 py-6 text-left"
              style={{
                background: "rgba(255,255,255,0.78)",
                border: "1px solid rgba(201,168,76,0.3)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
              }}
            >
              <p className="text-sm leading-relaxed" style={{ color: "#5a3e1a", fontFamily: "Georgia, serif" }}>
                <span className="font-bold" style={{ color: "#8B6914" }}>Signature by Feeha</span> respects the privacy and concerns of its valued customers. Therefore, we have created the following policy about how we protect, collect, and use the information we receive from visitors to our web page. By using our website, you agree to the following terms.
              </p>
            </div>
          </div>

          {/* Sections */}
          <div className="flex flex-col gap-4">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="rounded-2xl px-8 py-6"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                }}
              >
                {/* Title row */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #C9A84C, #8B6914)",
                      color: "#1a0800",
                    }}
                  >
                    {getIconForTitle(section.title)}
                  </div>
                  <h2
                    className="text-sm font-black tracking-[0.1em] uppercase"
                    style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}
                  >
                    {section.title}
                  </h2>
                </div>

                <div className="h-px mb-4" style={{ background: "rgba(201,168,76,0.2)" }} />

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#5a3e1a", fontFamily: "Georgia, serif", whiteSpace: "pre-line" }}
                >
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div
            className="mt-8 rounded-2xl px-8 py-5 flex items-start gap-4"
            style={{
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.3)",
              backdropFilter: "blur(10px)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p className="text-xs leading-relaxed" style={{ color: "#8B6914" }}>
              By using the Signature by Feeha website, you hereby consent to these Terms &amp; Conditions. For any queries, contact us at{" "}
              <a href="mailto:signaturebyfeeha@gmail.com" className="font-bold underline hover:text-[#1a0a00] transition-colors" style={{ textUnderlineOffset: "3px" }}>
                signaturebyfeeha@gmail.com
              </a>{" "}
              or call{" "}
              <a href="tel:+923353537028" className="font-bold underline hover:text-[#1a0a00] transition-colors" style={{ textUnderlineOffset: "3px" }}>
                +923353537028
              </a>.
            </p>
          </div>

        </div>
      </main>
    </>
  );
}