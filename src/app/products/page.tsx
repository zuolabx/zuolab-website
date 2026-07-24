"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SiteNav } from "@/components/ui/nav";
import { SiteFooter } from "@/components/ui/footer";

const alphaLyrae = {
  fontFamily: "'Alpha Lyrae', sans-serif",
};

const products = [
  {
    id: "01",
    name: "Raven",
    category: "AI Knowledge Engine",
    featured: true,
    description:
      "A headless AI knowledge engine that transforms your documentation into an intelligent teammate for employees and customers. Instead of searching through docs, booking meetings, or creating support tickets, users simply ask Raven.",
    features: [
      "Natural Language Search",
      "RAG & Vector Search",
      "Headless API",
      "Enterprise Integrations",
    ],
    cta: "Explore Raven",
    href: "/products/raven",
  },
  {
    id: "02",
    name: "Servio",
    category: "Restaurant Operating System",
    featured: false,
    description:
      "A modern restaurant operating system that brings order management, kitchen operations, inventory, employee management, payroll, billing, and analytics together in one platform.",
    features: [
      "Order Management",
      "Kitchen Dashboard",
      "Inventory Tracking",
      "Payroll & Billing",
    ],
    cta: "Explore Servio",
    href: "/products/servio",
  },
  {
    id: "03",
    name: "Simplr",
    category: "Project Management",
    featured: false,
    description:
      "An end-to-end project management platform built for startups and MSMEs. Plan projects, manage teams, track progress, collaborate in real time, and deliver faster from a single workspace.",
    features: [
      "Task & Sprint Planning",
      "Team Collaboration",
      "Time Tracking",
      "Project Analytics",
    ],
    cta: "Explore Simplr",
    href: "/products/simplr",
  },
];

function AnimateIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex border-y border-foreground/20">
      <div className="border-r border-foreground/20 bg-[#121212] px-5 py-3">
        <span
          className="text-[11px] tracking-[0.12em] text-foreground/50 uppercase"
          style={alphaLyrae}
        >
          {label}
        </span>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <div className="halftone absolute inset-0 opacity-15" />
      </div>
    </div>
  );
}

function FeaturedProduct() {
  const product = products.find((p) => p.featured)!;

  return (
    <section className="border-b border-foreground/20">
      <SectionHeader label="Featured Product" />

      <AnimateIn>
        <div className="relative overflow-hidden px-8 py-16 md:px-12 md:py-20">
          <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative grid gap-14 md:grid-cols-2">
            <div>
              <span
                className="mb-6 inline-block border border-accent/20 bg-accent/10 px-3 py-1 text-[11px] tracking-[0.14em] text-accent"
                style={alphaLyrae}
              >
                {product.category}
              </span>

              <h2
                className="mb-6 text-5xl font-medium tracking-tight text-gradient"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {product.name}
              </h2>

              <p className="max-w-xl text-[16px] leading-8 text-foreground/45">
                {product.description}
              </p>
            </div>

            <div className="flex flex-col justify-between">
              <ul className="space-y-4">
                {product.features.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border-b border-foreground/10 pb-4 text-sm text-foreground/55"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={product.href}
                className="mt-10 inline-flex w-fit items-center bg-accent px-6 py-3 text-sm text-black transition hover:bg-accent/90"
                style={alphaLyrae}
              >
                {product.cta} →
              </Link>
            </div>
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  return (
    <AnimateIn delay={index * 0.08}>
      <div className="group flex h-full flex-col px-8 py-10 transition hover:bg-white/[0.02]">
        <div className="mb-8 flex items-center justify-between">
          <span
            className="text-[10px] tracking-[0.15em] text-foreground/20"
            style={alphaLyrae}
          >
            {product.id}
          </span>

          <span
            className="border border-foreground/10 px-3 py-1 text-[10px] tracking-[0.12em] text-foreground/40"
            style={alphaLyrae}
          >
            {product.category}
          </span>
        </div>

        <h3
          className="mb-4 text-3xl font-medium tracking-tight transition group-hover:text-accent"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {product.name}
        </h3>

        <p className="mb-8 flex-1 text-[15px] leading-8 text-foreground/45">
          {product.description}
        </p>

        <ul className="mb-10 space-y-2">
          {product.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-3 text-sm text-foreground/55"
            >
              <span className="h-1 w-1 rounded-full bg-accent" />
              {feature}
            </li>
          ))}
        </ul>

        <Link
          href={product.href}
          className="inline-flex w-fit items-center text-accent transition hover:translate-x-1"
          style={alphaLyrae}
        >
          {product.cta} →
        </Link>
      </div>
    </AnimateIn>
  );
}

function ProductsGrid() {
  const others = products.filter((p) => !p.featured);

  return (
    <section className="border-b border-foreground/20">
      <SectionHeader label="Products" />

      <div className="grid md:grid-cols-2">
        {others.map((product, index) => (
          <div
            key={product.id}
            className={`border-foreground/20 ${
              index % 2 === 0 ? "border-r" : ""
            }`}
          >
            <ProductCard product={product} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden border-b border-foreground/20">
      <div className="halftone absolute inset-0 opacity-10" />

      <AnimateIn>
        <div className="relative flex flex-col items-start justify-between gap-8 px-8 py-20 md:flex-row md:items-center md:px-12">
          <div>
            <p
              className="mb-3 text-[11px] uppercase tracking-[0.14em] text-foreground/40"
              style={alphaLyrae}
            >
              Looking for something custom?
            </p>

            <h2
              className="text-4xl font-medium leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Let's build your
              <br />
              <span className="text-gradient">next product.</span>
            </h2>
          </div>

          <Link
            href="https://cal.com/zuolabs/30min"
            className="bg-accent px-7 py-3 text-sm text-black transition hover:bg-accent/90"
            style={alphaLyrae}
          >
            Start a Project →
          </Link>
        </div>
      </AnimateIn>
    </section>
  );
}

export default function ProductsPage() {
  return (
    <>
      <SiteNav />

      <main className="mt-11 border-x border-foreground/20">
        <section className="relative overflow-hidden border-b border-foreground/20 px-8 py-16 md:px-12 md:py-24">
          <div className="halftone absolute inset-0 opacity-10" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <p
              className="mb-5 text-[11px] uppercase tracking-[0.15em] text-foreground/40"
              style={alphaLyrae}
            >
              Products
            </p>

            <h1
              className="max-w-4xl text-[clamp(42px,8vw,92px)] font-medium leading-[1.05] tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Software built
              <br />
              <span className="text-foreground/30">to solve</span> real
              problems.
            </h1>

            <p className="mt-8 max-w-2xl text-[16px] leading-8 text-foreground/45">
              Purpose-built software engineered for modern teams. From AI
              knowledge systems to restaurant operations and project management,
              every product is designed to replace complexity with clarity.
            </p>
          </motion.div>
        </section>

        <FeaturedProduct />
        <ProductsGrid />
        <CTA />
      </main>

      <SiteFooter />
    </>
  );
}