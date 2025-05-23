"use client";
import React, { useEffect, useRef, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import AnimatedText from "./components/AnimatedText";
import { useTranslations } from "next-intl";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Iphone } from "./components/Iphone";
import { MacBook } from "./components/MacBook";
import { useTheme } from "next-themes";
export default function HomePage() {
  return (
    <main className="text-base-content relative">
      <HeroSection />
      <QuickAbout />
      <ResponsiveMacBook/>
      <ResponsiveIphone/>
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
    clearInterval(intervalRef.current);

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

  // Variants d'animation pour le conteneur
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

  // Variants d'animation pour les éléments
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
      {/* Code décoratif stylisé */}
      <div className="absolute top-[10%] right-[5%] opacity-20 hidden md:block text-xs text-base-content">
        <pre className="font-mono">
          {`function createDesign() {
  const creativity = new Creativity();
  const code = combine(design, logic);
  return creativity.transform(code);
}`}
        </pre>
      </div>

      <div className="absolute bottom-[15%] left-[8%] opacity-20 hidden md:block text-xs text-base-content">
        <pre className="font-mono">
          {`const developer = {
  name: 'Alexis',
  skills: ['HTML', 'CSS', 'JS', 'React', 'Vue'],f
  passion: 'Creating amazing web experiences'
};`}
        </pre>
      </div>

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

const FeaturedProjects = () => (
  <section className="py-20">
    <div className="container mx-auto px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-10 text-center"
          variants={fadeIn}
          custom={0}
        >
          <AnimatedText
            translationKey="home.featuredProjects"
            animated={true}
          />
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Exemple de 3 projets en vedette, à adapter dynamiquement si besoin */}
          <ProjectCard index={0} translationKeyPrefix="home.project1" />
          <ProjectCard index={1} translationKeyPrefix="home.project2" />
          <ProjectCard index={2} translationKeyPrefix="home.project3" />
        </div>
        <div className="flex justify-center mt-10">
          <Link
            href="/work"
            className="btn btn-primary btn-lg rounded-full px-8"
          >
            <AnimatedText translationKey="home.allProjects" animated={false} />
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

const ResponsiveMacBook = () => {
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = theme === "system" ? resolvedTheme : theme;
  // Récupère la couleur neutre DaisyUI
  const getNeutralColor = () => {
    if (typeof window !== "undefined") {
      return getComputedStyle(document.documentElement).getPropertyValue("--b1").trim() || "#222";
    }
    return "#222";
  };
  const neutralColor = getNeutralColor();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const springConfig = useMemo(
    () => ({
      stiffness: 20,
      damping: 10,
      mass: 0.2,
      restDelta: 0.002,
    }),
    []
  );

  const mouse = {
    x: useMotionValue(0.5),
    y: useMotionValue(0.5),
  };

  const smoothMouse = {
    x: useSpring(mouse.x, springConfig),
    y: useSpring(mouse.y, springConfig),
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouse.x.set(x);
      mouse.y.set(y);
    };
    const refCurrent = containerRef.current;
    if (refCurrent) {
      refCurrent.addEventListener('mousemove', handleMouseMove as EventListener);
      return () => refCurrent.removeEventListener('mousemove', handleMouseMove as EventListener);
    }
  }, [mouse.x, mouse.y]);

  const [rotX, setRotX] = React.useState(0);
  const [rotY, setRotY] = React.useState(0);

  useEffect(() => {
    const unsubX = smoothMouse.x.on("change", (val) => {
      setRotY((val - 0.5) * 0.4); 
    });
    const unsubY = smoothMouse.y.on("change", (val) => {
      setRotX((val - 0.5) * 0.2); 
    });
    return () => {
      unsubX();
      unsubY();
    };
  }, [smoothMouse.x, smoothMouse.y]);

  return (
    <section ref={containerRef} className="min-h-screen flex flex-col md:flex-row items-center justify-center w-full ">
      {/* Colonne texte */}
      <div className="flex-1 flex items-center justify-center p-8 order-2 md:order-1">
        <div className="max-w-md text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Responsive Design</h2>
          <p className="text-lg text-base-content/80">
            Cette section d&#39;montre l&#39;importance du responsive design : le contenu s&#39;adapte à toutes les tailles d&#39;cran. À droite, le MacBook réagit dynamiquement à vos mouvements de souris, illustrant l&#39;interactivit moderne.
          </p>
        </div>
      </div>
      {/* Colonne MacBook 3D */}
      <div className="flex-1 flex items-center justify-center p-4 order-1 md:order-2 w-full h-[350px] md:h-[500px]">
        <Canvas camera={{ position: [0, 0, 7] }} style={{ width: '100%', height: '100%' }}>
          <MacBook rotation={[rotX, rotY, 0]} scale={1.5} color={neutralColor} currentTheme={currentTheme} />
          <Environment preset="studio" background={false} />
        </Canvas>
      </div>
    </section>
  );
};

const ResponsiveIphone = () => {
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = theme === "system" ? resolvedTheme : theme;
  // Récupère la couleur neutre DaisyUI
  const getNeutralColor = () => {
    if (typeof window !== "undefined") {
      return getComputedStyle(document.documentElement).getPropertyValue("--b1").trim() || "#222";
    }
    return "#222";
  };
  const neutralColor = getNeutralColor();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const springConfig = useMemo(
    () => ({
      stiffness: 20,
      damping: 10,
      mass: 0.2,
      restDelta: 0.002,
    }),
    []
  );

  const mouse = {
    x: useMotionValue(0.5),
    y: useMotionValue(0.5),
  };

  const smoothMouse = {
    x: useSpring(mouse.x, springConfig),
    y: useSpring(mouse.y, springConfig),
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouse.x.set(x);
      mouse.y.set(y);
    };
    const refCurrent = containerRef.current;
    if (refCurrent) {
      refCurrent.addEventListener('mousemove', handleMouseMove as EventListener);
      return () => refCurrent.removeEventListener('mousemove', handleMouseMove as EventListener);
    }
  }, [mouse.x, mouse.y]);

  const [rotX, setRotX] = React.useState(0);
  const [rotY, setRotY] = React.useState(0);

  useEffect(() => {
    const unsubX = smoothMouse.x.on("change", (val) => {
      setRotY((val - 0.5) * 0.4); 
    });
    const unsubY = smoothMouse.y.on("change", (val) => {
      setRotX((val - 0.5) * 0.2); 
    });
    return () => {
      unsubX();
      unsubY();
    };
  }, [smoothMouse.x, smoothMouse.y]);

  return (
    <section ref={containerRef} className="min-h-screen flex flex-col md:flex-row items-center justify-center w-full ">
         {/* Colonne Iphone 3D */}
         <div className="flex-1 flex items-center justify-center p-4 order-2 md:order-1 w-full h-[350px] md:h-[500px]">
        <Canvas camera={{ position: [0, 0, 7] }} style={{ width: '100%', height: '100%' }}>
          <Environment preset="studio" background={false} />
          <Iphone rotation={[rotX, rotY, 0]} scale={1.5} color={neutralColor} currentTheme={currentTheme} />
        </Canvas>
      </div>   
      {/* Colonne texte */}
      <div className="flex-1 flex items-center justify-center p-8 order-1 md:order-2">
        <div className="max-w-md text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Responsive Design</h2>
          <p className="text-lg text-base-content/80">
            Cette section d&#39;montre l&#39;importance du responsive design : le contenu s&#39;adapte à toutes les tailles d&#39;cran. À droite, le MacBook réagit dynamiquement à vos mouvements de souris, illustrant l&#39;interactivit moderne.
          </p>
        </div>
      </div>

    </section>
  );
};


const ProjectCard = ({
  index,
  translationKeyPrefix,
}: {
  index: number;
  translationKeyPrefix: string;
}) => (
  <motion.div
    className="bg-base-100 rounded-xl shadow-md p-6 border border-base-300 flex flex-col gap-4"
    variants={fadeIn}
    custom={index}
    whileHover={{
      y: -8,
      scale: 1.03,
      boxShadow: "0 20px 40px -15px rgba(0,0,0,0.10)",
    }}
  >
    <div className="h-40 w-full bg-base-200 rounded-lg mb-4 flex items-center justify-center">
      {/* Image ou icône du projet */}
      <span className="text-5xl">🚀</span>
    </div>
    <h3 className="text-xl font-bold">
      <AnimatedText
        translationKey={`${translationKeyPrefix}.title`}
        animated={false}
      />
    </h3>
    <p className="text-base-content/70 text-base mb-2">
      <AnimatedText
        translationKey={`${translationKeyPrefix}.desc`}
        animated={false}
      />
    </p>
    <div className="flex flex-wrap gap-2 mb-2">
      <span className="badge badge-outline">
        <AnimatedText
          translationKey={`${translationKeyPrefix}.stack`}
          animated={false}
        />
      </span>
    </div>
    <Link
      href="/work"
      className="text-primary font-medium flex items-center gap-1 mt-auto group-hover:gap-3 transition-all duration-300 py-2"
    >
      <AnimatedText translationKey="home.seeDetails" animated={false} />
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transform group-hover:translate-x-1 transition-transform duration-300"
      >
        <path d="M5 12h14"></path>
        <path d="m12 5 7 7-7 7"></path>
      </svg>
    </Link>
  </motion.div>
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
