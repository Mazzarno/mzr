"use client";
import React from "react";

import AnimatedText from "@/components/AnimatedText";

export default function Home() {
  return (
    <>
      <div className="min-h-full min-w-screen">
        <div className="fixed w-full min-h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-11 divide-x-2 divide-dashed divide-base pointer-events-none opacity-10">
          <div className=""></div>
          <div className="hidden sm:block"></div>
          <div className="hidden md:block"></div>
          <div className="hidden md:block"></div>
          <div className="hidden lg:block"></div>
          <div className="hidden lg:block"></div>
          <div className="hidden xl:block"></div>
          <div className="hidden xl:block"></div>
          <div className="hidden 2xl:block"></div>
          <div className="hidden 2xl:block"></div>
          <div className="hidden 2xl:block"></div>
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
