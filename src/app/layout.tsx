import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ZuoLabs — Product Development & AI Engineering Agency",
    template: "%s | ZuoLabs",
  },
  description:
    "ZuoLabs is a product development agency specializing in end-to-end product development, AI integration into existing workflows, and building AI-native applications for founders and businesses.",
  keywords: [
    "ZuoLabs",
    "product development agency",
    "AI engineering",
    "AI native applications",
    "AI integration",
    "end to end product development",
    "custom software development",
    "full-stack engineering",
    "RAG pipelines",
    "B2B software agency",
  ],
  authors: [{ name: "ZuoLabs", url: "https://zuolabs.com" }],
  creator: "ZuoLabs",
  publisher: "ZuoLabs",
  alternates: {
    canonical: "https://zuolabs.com",
  },
  openGraph: {
    type: "website",
    url: "https://zuolabs.com",
    siteName: "ZuoLabs",
    title: "ZuoLabs — Product Development & AI Engineering Agency",
    description:
      "End-to-end product development, AI integration, and AI-native applications for businesses and founders.",
    locale: "en_US",
    images: [
      {
        url: "https://zuolabs.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "ZuoLabs — Product Development & AI Engineering Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@zuolabs",
    creator: "@zuolabs",
    title: "ZuoLabs — Product Development & AI Engineering Agency",
    description:
      "End-to-end product development, AI integration, and AI-native applications for businesses and founders.",
    images: ["https://zuolabs.com/og-image.png"],
  },
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
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://zuolabs.com/#organization",
              name: "ZuoLabs",
              url: "https://zuolabs.com",
              logo: {
                "@type": "ImageObject",
                url: "https://zuolabs.com/og-image.png",
                width: 1200,
                height: 630,
              },
              description:
                "ZuoLabs is a product development agency specializing in end-to-end product development, AI integration, and AI-native applications.",
              sameAs: [
                "https://x.com/zuolabs",
                "https://github.com/zuolabx",
                "https://www.linkedin.com/in/zuo-labs-0795b4412/",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0d0d0d] text-[#f5f5f0] font-sans antialiased selection:bg-accent selection:text-[#0d0d0d]">
        {children}
      </body>
    </html>
  );
}
