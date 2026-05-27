"use client";
import React from "react";
import { motion } from "framer-motion";

interface Testimonial {
  text: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-4 pb-4"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, name, role }, i) => (
                <div
                  className="group/card p-5 border border-foreground/[0.2] max-w-xs w-full relative overflow-hidden hover:border-foreground/[0.5] transition-all duration-500"
                  key={i}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                  <p className="text-[15px] text-foreground/50 leading-[1.7] relative z-10 group-hover/card:text-foreground/70 transition-colors duration-300">{text}</p>
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-foreground/[0.1] relative z-10">
                    <div className="w-9 h-9 border border-foreground/[0.25] flex items-center justify-center text-[12px] text-foreground/30 font-medium group-hover/card:border-accent/40 group-hover/card:text-accent/60 transition-all duration-300">
                      {name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex flex-col">
                      <div className="text-[14px] font-medium leading-tight">{name}</div>
                      <div className="text-[12px] text-foreground/25 leading-tight tracking-[0.05em]">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
