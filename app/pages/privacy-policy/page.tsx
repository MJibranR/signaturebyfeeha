import React from "react";

const sections = [
  {
    title: "Log Files",
    body: "Signature by Feeha follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any personally identifiable information. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.",
  },
  {
    title: "Cookies and Web Beacons",
    body: "Like any other website, Signature by Feeha uses cookies. These cookies are used to store information including visitors' preferences and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.",
  },
  {
    title: "Our Advertising Partners",
    body: "Some of the advertisers on our site may use cookies and web beacons. Our advertising partners include Google and Meta (Facebook), each of whom has their own Privacy Policy governing their use of user data. Third-party ad servers or ad networks use technologies like cookies, JavaScript, or web beacons in their advertisements and links that appear on Signature by Feeha, which are sent directly to users' browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of advertising campaigns and/or to personalize the advertising content you see on websites you visit. Note that Signature by Feeha has no access to or control over cookies used by third-party advertisers.",
  },
  {
    title: "Third-Party Privacy Policies",
    body: "Signature by Feeha's Privacy Policy does not apply to other advertisers or websites. We advise you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. You can choose to disable cookies through your individual browser options. To find more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.",
  },
  {
    title: "Children's Information",
    body: "Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. Signature by Feeha does not knowingly collect any Personally Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best to promptly remove such information from our records.",
  },
  {
    title: "Online Privacy Policy Only",
    body: "This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collected on Signature by Feeha. This policy is not applicable to any information collected offline or via channels other than this website.",
  },
  {
    title: "Consent",
    body: "By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <main
        className="min-h-screen py-16 px-4"
      >
        <div className="max-w-screen-md mx-auto">

          {/* Heading */}
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.35em] uppercase mb-3" style={{ color: "#a89070" }}>
              Last updated · 2026
            </p>
            <h1
              className="text-3xl md:text-4xl font-black tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}
            >
              Privacy Policy
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
                At <span className="font-bold" style={{ color: "#8B6914" }}>Signature by Feeha</span>, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that are collected and recorded by Signature by Feeha and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to{" "}
                <a href="/contact" className="underline transition-colors hover:text-[#8B6914]" style={{ color: "#C9A84C", textUnderlineOffset: "3px" }}>
                  contact us
                </a>.
              </p>
            </div>
          </div>

          {/* Sections */}
          <div className="flex flex-col gap-4">
            {sections.map((section, i) => (
              <div
                key={i}
                className="rounded-2xl px-8 py-6"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                }}
              >
                {/* Section number + title */}
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #C9A84C, #8B6914)",
                      color: "#1a0800",
                    }}
                  >
                    {i + 1}
                  </span>
                  <h2
                    className="text-sm font-black tracking-[0.1em] uppercase"
                    style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}
                  >
                    {section.title}
                  </h2>
                </div>

                {/* Divider */}
                <div className="h-px mb-4" style={{ background: "rgba(201,168,76,0.2)" }} />

                <p className="text-sm leading-relaxed" style={{ color: "#5a3e1a", fontFamily: "Georgia, serif" }}>
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div
            className="mt-8 rounded-2xl px-8 py-5 flex items-center gap-4"
            style={{
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.3)",
              backdropFilter: "blur(10px)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p className="text-xs leading-relaxed" style={{ color: "#8B6914" }}>
              For questions about this policy, contact us at{" "}
              <a href="mailto:signaturebyfeeha@gmail.com" className="font-bold underline hover:text-[#1a0a00] transition-colors" style={{ textUnderlineOffset: "3px" }}>
                signaturebyfeeha@gmail.com
              </a>
            </p>
          </div>

        </div>
      </main>
    </>
  );
}