"use client";
import React from "react";

import AnimatedText from "@/components/AnimatedText";

export default function Home() {
  return (
    <>
      <div className="min-h-full min-w-screen">
        <div className="fixed w-full min-h-full grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] divide-x-1 divide-dashed divide-base pointer-events-none opacity-20">
          {[...Array(11)].map((_, i) => (
            <div
              key={i}
              className={
                i >= 2
                  ? `hidden ${
                      ["sm", "md", "lg", "xl", "2xl"][Math.floor((i - 2) / 2)] +
                      ":block"
                    }`
                  : ""
              }
            ></div>
          ))}
        </div>
        <div className="hero bg-base-200 min-h-screen">
          <section className="flex flex-col items-start max-w-4xl mx-auto relative text-center">
            <p className="text-base italic">
              <AnimatedText translationKey="hello" />
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">
              <AnimatedText translationKey="ido" />
            </h1>
          </section>
        </div>
      </div>
    </>
  );
}
