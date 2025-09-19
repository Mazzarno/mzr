"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import AnimatedText from "../components/core/AnimatedText";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

export default function NotFound() {
  const t = useTranslations();

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/3 to-secondary/3"></div>
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-primary/5 blur-[100px]"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-secondary/5 blur-[100px]"></div>
      </div>
      
      <motion.div
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto"
      >
        <motion.div variants={fadeIn} custom={0} className="mb-6">
          <h1 className="text-9xl font-bold text-primary">
            <AnimatedText translationKey="notFound.title" />
          </h1>
        </motion.div>
        
        <motion.div variants={fadeIn} custom={1} className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            <AnimatedText translationKey="notFound.page" /> <AnimatedText translationKey="notFound.not" /> <AnimatedText translationKey="notFound.found" />
          </h2>
          <p className="text-xl text-base-content/70 mt-4">
            {t("notFound.sorry")}
          </p>
        </motion.div>
        
        <motion.div variants={fadeIn} custom={2}>
          <Link 
            href="/" 
            className="group relative overflow-hidden btn border-0 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white btn-lg px-8 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
          >
            <span className="relative z-10">
              <AnimatedText translationKey="notFound.goHome" />
            </span>
            <motion.span 
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
