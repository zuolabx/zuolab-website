import type { Metadata, Viewport } from "next";
import {
  Inter,
  Instrument_Serif,
  Noto_Serif_SC,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: "900",
  variable: "--font-chinese",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  //  Title
  title: {
    default: "ZuoLabs — AI first B2B Product engineering agency",
    template: "%s | ZuoLabs",
  },

  //  Description
  description:
    "ZuoLabs (Zuo / ZuoLab) is an AI first B2B Product engineering agency. We help businesses with AI transformation, custom CRM development, RAG pipelines, ai product making, and end-to-end product engineering — from idea to production, fast.",

  //  Keywords
  keywords: [
    "zuo",
    "zuolab",
    "zuolabs",
    "ZuoLabs",
    "ai transformation",
    "ai native product",
    "ai native product engineering",
    "product engineering",
    "build website for my business",
    "custom crm",
    "custom crm development",
    "ai product making",
    "help me build a rag",
    "rag pipeline",
    "retrieval augmented generation",
    "saas product development",
    "b2b product engineering",
    "ai consulting",
    "ai software studio",
    "ai startup studio",
    "mvp development",
    "software that ships",
  ],

  //  Authors / Creator
  authors: [{ name: "ZuoLabs", url: "https://zuolabs.com" }],
  creator: "ZuoLabs",
  publisher: "ZuoLabs",

  //  Canonical & Alternates
  alternates: {
    canonical: "https://zuolabs.com",
  },

  //  Open Graph
  openGraph: {
    type: "website",
    url: "https://zuolabs.com",
    siteName: "ZuoLabs",
    title: "ZuoLabs — AI first B2B Product engineering agency",
    description:
      "ZuoLabs helps businesses with AI transformation, custom CRM, RAG pipelines, and AI product engineering. Ship fast with an AI-first studio.",
    locale: "en_US",
    images: [
      {
        url: "https://zuolabs.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "ZuoLabs — AI-Native Product Engineering",
      },
    ],
  },

  //  Twitter / X Card
  twitter: {
    card: "summary_large_image",
    site: "@zuolabs",
    creator: "@zuolabs",
    title: "ZuoLabs — AI first B2B Product engineering agency",
    description:
      "AI transformation, custom CRM, RAG pipelines, and full-stack product engineering. From zero to production, fast.",
    images: ["https://zuolabs.com/og-image.png"],
  },

  //  Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  //  Verification
  // verification: {
  //   google: "YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN",
  // },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${notoSerifSC.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Bowlby+One&family=Cardo:ital,wght@0,400;0,700;1,400&family=Inria+Serif:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Lora:ital,wght@0,400..700;1,400..700&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />

        {/*  JSON-LD: Organization  */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://zuolabs.com/#organization",
              name: "ZuoLabs",
              alternateName: ["Zuo", "ZuoLab", "Zuo Labs"],
              url: "https://zuolabs.com",
              logo: {
                "@type": "ImageObject",
                url: "https://zuolabs.com/og-image.png",
                width: 1200,
                height: 630,
              },
              description:
                "ZuoLabs is an AI-first B2B product engineering agency. We help businesses with AI transformation, custom CRM development, RAG pipelines, and end-to-end product engineering.",
              knowsAbout: [
                "AI transformation",
                "AI native product engineering",
                "product engineering",
                "custom CRM development",
                "RAG pipeline development",
                "retrieval augmented generation",
                "AI product making",
                "SaaS product development",
                "B2B product engineering",
                "MVP development",
                "website development for businesses",
              ],
              sameAs: [
                "https://twitter.com/zuolabs",
                "https://linkedin.com/company/zuolabs",
                "https://github.com/zuolabs",
              ],
            }),
          }}
        />

        {/*  JSON-LD: WebSite (enables Sitelinks Search Box) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://zuolabs.com/#website",
              url: "https://zuolabs.com",
              name: "ZuoLabs",
              description:
                "AI-first B2B product engineering agency — AI transformation, custom CRM, RAG pipelines, and more.",
              publisher: {
                "@id": "https://zuolabs.com/#organization",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://zuolabs.com/blog?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-[#0d0d0d] text-[#f5f5f0] font-[family-name:var(--font-inter)]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
