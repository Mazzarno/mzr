"use client";
import React, { useEffect, useRef, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedText from "./components/AnimatedText";
import { useTranslations } from "next-intl";

export default function HomePage() {
  return (
    <main className="text-base-content relative">
      <HeroSection />
      <QuickAbout />
      <ContactCTA />
    </main>
  );
}
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const ScrambleText = ({
  text,
  speed = 40,
}: {
  text: string;
  speed?: number;
}) => {
  const [displayed, setDisplayed] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const chars = "!<>-_\/[]{}—=+*^?#________";
    let scrambled = "";
    let localFrame = 0;
    if (intervalRef.current !== null) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      scrambled = text
        .split("")
        .map((char, i) => {
          if (i < localFrame) return text[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
      setDisplayed(scrambled);
      localFrame++;
      if (localFrame > text.length && intervalRef.current !== null) clearInterval(intervalRef.current);
    }, speed);

    return () => { if (intervalRef.current !== null) clearInterval(intervalRef.current); };
  }, [text, speed]);

  return (
    <span
      className="text-base-content font-mono whitespace-pre block h-[1.5em] sm:h-[1.8em] md:h-[2em] lg:h-[2.2em] xl:h-[2.4em] 2xl:h-[2.6em]"
      dangerouslySetInnerHTML={{ __html: displayed }}
    />
  );
};



const HeroSection = () => {
  const t = useTranslations("home");
  const [index, setIndex] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);

  const phrases = useMemo(
    () => [t("phrases.1"), t("phrases.2"), t("phrases.3"), t("phrases.4")],
    [t]
  );

  useEffect(() => {
    setCurrentPhrase(phrases[index]);
  }, [phrases, index]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
      setCurrentPhrase(phrases[(index + 1) % phrases.length]);
    }, 10000);
    return () => clearInterval(interval);
  }, [index, phrases]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden"
    >

      {/* Contenu principal */}
      <motion.div
        className="text-center z-10 relative"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Titre principal avec effet de surlignage */}
        <motion.h1
          variants={itemVariants}
          className="relative text-xl xs:text-xl sm:text-xl md:text-2xl lg:text-4xl xl:text-6xl font-bold mb-4 sm:mb-6 tracking-tight text-base-content"
        >
          <span className="inline-block">
            <span className="relative inline-block">
              <AnimatedText translationKey="home.heroTitle" animated={true} />
            </span>
          </span>
        </motion.h1>

        {/* Texte changeant avec effet de machine à écrire */}
        <motion.div
          className="text-xl sm:text-xl md:text-2xl lg:text-2xl font-medium text- mb-10 sm:mb-14 max-w-2xl md:max-w-3xl mx-auto"
          variants={itemVariants}
        >
          <div className="relative inline-block font-mono">
    
            <ScrambleText text={currentPhrase} speed={30} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const QuickAbout = () => (
  <section className="py-16 bg-base-200/40">
    <div className="container mx-auto px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          variants={fadeIn}
          custom={0}
        >
          <AnimatedText translationKey="home.quickAboutTitle" animated={true} />
        </motion.h2>
        <motion.p
          className="text-lg text-base-content/70 max-w-2xl mx-auto"
          variants={fadeIn}
          custom={1}
        >
          <AnimatedText translationKey="home.quickAboutText" animated={false} />
        </motion.p>
      </motion.div>
    </div>
  </section>
);
const ContactCTA = () => (
  <section className="py-24 bg-base-200/50 border-t border-base-300/30">
    <div className="container mx-auto px-6 text-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6"
          variants={fadeIn}
          custom={0}
        >
          <AnimatedText translationKey="home.ctaTitle" animated={true} />
        </motion.h2>
        <motion.p
          className="text-lg text-base-content/70 max-w-2xl mx-auto mb-8"
          variants={fadeIn}
          custom={1}
        >
          <AnimatedText translationKey="home.ctaText" animated={false} />
        </motion.p>
        <Link href="/" className="btn btn-primary btn-lg rounded-full px-8">
          <AnimatedText translationKey="home.contactMe" animated={false} />
        </Link>
      </motion.div>
    </div>
  </section>
);
