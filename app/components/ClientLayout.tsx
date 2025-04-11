"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, useMotionValue, animate } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitch";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";
import { Github, Linkedin, Mail } from "lucide-react";
import Background from "./background";
import AnimatedText from "./AnimatedText";
import dynamic from "next/dynamic";

interface ClientLayoutProps {
  children: React.ReactNode;
}

// Composants dynamiques pour améliorer les performances initiales
const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
  loading: () => <div className="cursor" />,
});

const FaviconUpdater = dynamic(() => import("./FaviconUpdater"), {
  ssr: false,
});

// Éléments mémoïsés pour éviter les re-rendus inutiles
const MemoizedGrid = memo(function Grid() {
  return (
    <div className="fixed inset-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-11 divide-x-2 divide-dashed divide-neutral-content pointer-events-none opacity-30">
      {[...Array(11)].map((_, i) => (
        <div
          key={i}
          className={`
          ${i >= 2 ? "hidden sm:block" : ""}
          ${i >= 3 ? "hidden md:block" : ""}
          ${i >= 5 ? "hidden lg:block" : ""}
          ${i >= 7 ? "hidden xl:block" : ""}
          ${i >= 9 ? "hidden 2xl:block" : ""}
        `}
        ></div>
      ))}
    </div>
  );
});

// Navigation mémoïsée
const MemoizedNavigation = memo(function Navigation({
  navLinks,
}: {
  navLinks: Array<{ href: string; labelKey: string }>;
}) {
  return (
    <div className="flex items-center space-x-5 px-1 transition-all duration-100">
      <Link href="/" className="flex items-center space-x-3">
        <Logo />
        <div className="relative inline-block overflow-hidden h-5 group">
          <div
            className="transition-transform duration-300 transform group-hover:-translate-y-5"
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="block">Germain</span>
            <span className="block">Alexis</span>
          </div>
        </div>
      </Link>
      {navLinks.map((link) => (
        <div key={link.href} className="relative flex items-center">
          <Link
            href={link.href}
            className="block text-neutral-content text-sm transition-all duration-100"
          >
            <div className="text-center">
              {link.labelKey ? (
                <AnimatedText
                  translationKey={link.labelKey}
                  className="inline-block"
                />
              ) : (
                <AnimatedText
                  text={link.labelKey || ""}
                  className="inline-block"
                />
              )}
            </div>
          </Link>
          <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-secondary rounded-full" />
        </div>
      ))}
      <LanguageSwitcher />
      <a className="text-base-content link">
        <ThemeSwitcher />
      </a>
    </div>
  );
});

// Footer mémoïsé
const MemoizedFooter = memo(function Footer({
  isMobile,
}: {
  isMobile: boolean;
}) {
  return (
    <div
      className={`absolute bottom-0 right-0 w-auto h-[47px] flex items-center space-x-2 text-neutral-content bg-neutral px-4 shadow-[-1px_-1px_10px_0px_rgba(0,_0,_0,_0.1)] rounded-tl-3xl z-60 ${isMobile ? "text-xs" : ""}`}
    >
      <div className="absolute -top-4 right-1">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 16V0C16 8.83656 8.83656 16 0 16H16Z"
            fill="var(--color-neutral)"
          ></path>
        </svg>
      </div>
      <div className="absolute bottom-3 -left-4">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 16V0C16 8.83656 8.83656 16 0 16H16Z"
            fill="var(--color-neutral)"
          ></path>
        </svg>
      </div>
      <span className={`font-bold ${isMobile ? "text-xs" : "text-sm"}`}></span>
      <span className="text-sm text-neutral-content">—</span>
      <div className="flex items-center space-x-3 ml-2">
        <a
          href="https://github.com/alxsgrmn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-content hover:text-primary transition-colors"
        >
          <Github size={16} />
        </a>
        <a
          href="https://linkedin.com/in/alxsgrmn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-content hover:text-primary transition-colors"
        >
          <Linkedin size={16} />
        </a>
        <a
          href="mailto:contact@alxsgrmn.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-content hover:text-primary transition-colors"
        >
          <Mail size={16} />
        </a>
      </div>
    </div>
  );
});

// Composant principal pour les bordures draggables
const DraggableBorders = memo(function DraggableBorders({
  onDragStart,
}: {
  onDragStart: () => void;
}) {
  const handlePointerDown = (e: React.PointerEvent) => {
    // Empêcher la propagation pour éviter de déclencher d'autres événements
    e.stopPropagation();
    // Déclencher le début du drag
    onDragStart();
  };

  return (
    <>
      <div
        className="absolute w-full h-3 bottom-0 bg-neutral z-70 "
        onPointerDown={handlePointerDown}
      />
      <div
        className="absolute h-full w-3 right-0 bg-neutral z-70 "
        onPointerDown={handlePointerDown}
      />
      <div
        className="absolute h-full w-3 left-0 bg-neutral z-70 "
        onPointerDown={handlePointerDown}
      />
      <div
        className="absolute w-full h-3 top-0 bg-neutral z-70 "
        onPointerDown={handlePointerDown}
      />
    </>
  );
});

// Composant principal optimisé
export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [shouldRenderBackground, setShouldRenderBackground] = useState(false);

  // Référence au contenu pour la détection d'intersection
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();

    const handleResize = () => {
      checkIfMobile();
    };
    window.addEventListener("resize", handleResize);

    // Charger le fond après que le contenu principal soit chargé
    setShouldRenderBackground(true);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Définir les liens de navigation une seule fois
  const navLinks = [
    { href: "/work", labelKey: "navigation.work" },
    { href: "/about", labelKey: "navigation.about" },
    { href: "/contact", labelKey: "navigation.contact" },
  ];

  // Fonction pour démarrer le drag uniquement à partir des bordures
  const handleDragStart = () => {
    if (!isMobile) {
      setIsDragging(true);
    }
  };

  return (
    <>
      {!isMobile && (
        <AnimatedCursor
          innerSize={4}
          outerSize={30}
          innerScale={1.5}
          outerScale={1.5}
          outerAlpha={0}
          innerStyle={{
            backgroundColor: "var(--color-base-content)",
          }}
          outerStyle={{
            border: "1px solid var(--color-base-content)",
          }}
          trailingSpeed={10}
        />
      )}
      <FaviconUpdater />
      <div
        className="flex items-center justify-center min-h-screen bg-gradient-to-bl from-content-200 to-content-100"
        ref={constraintsRef}
      >
        {shouldRenderBackground && (
          <motion.div
            className="absolute h-screen w-screen pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Background />
          </motion.div>
        )}

        <MemoizedGrid />

        <motion.div
          className={`relative overflow-hidden z-10 backdrop-blur-sm scrollbar-hide shadow-[0px_0px_10px_6px_rgba(0,_0,_0,_0.1)] rounded-2xl
          ${isMobile ? "w-[95vw] h-[95vh]" : "w-[90vw] h-[90vh]"}`}
          drag={isDragging}
          dragElastic={0.7}
          whileDrag={{ scale: 1 }}
          style={{ x, y }}
          dragConstraints={constraintsRef}
          dragMomentum={false}
          onDragEnd={() => {
            setIsDragging(false);
            animate(x, 0, { type: "spring", stiffness: 100, damping: 15 });
            animate(y, 0, { type: "spring", stiffness: 100, damping: 15 });
          }}
        >
          <DraggableBorders onDragStart={handleDragStart} />

          {!isMobile && (
            <div className="absolute top-0 left-0 w-auto h-[47px] flex items-center justify-between text-sm text-neutral-content bg-neutral px-4 rounded-br-[20px] z-60">
              <div className="absolute top-3 -right-5">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0L0 20C0 8.95431 8.95431 0 20 0L0 0Z"
                    fill="var(--color-neutral)"
                  ></path>
                </svg>
              </div>
              <div className="absolute -bottom-5 left-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0L0 20C0 8.95431 8.95431 0 20 0L0 0Z"
                    fill="var(--color-neutral)"
                  ></path>
                </svg>
              </div>

              <MemoizedNavigation navLinks={navLinks} />
            </div>
          )}

          <motion.div
            className="w-full h-full overflow-auto scrollbar-hide z-0"
            id="content"
            ref={contentRef}
          >
            <div key={pathname}>{children}</div>
          </motion.div>

          <MemoizedFooter isMobile={isMobile} />
        </motion.div>
      </div>
    </>
  );
}
