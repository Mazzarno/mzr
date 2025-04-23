"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getTitleInfo } from "./getTitleInfo";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { TransitionContext } from "./TransitionLink";

interface TransitionProps {
  children: React.ReactNode;
}

/**
 * Affiche une animation moderne lors des changements de page.
 * L'animation ne s'affiche PAS au chargement initial, seulement lors d'un changement de route.
 */
const Transition: React.FC<TransitionProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const prevPath = useRef(pathname);
  const isInitialRender = useRef(true);

  // Fonction appelée par TransitionLink pour démarrer la transition
  const startTransition = (to: string) => {
    if (isTransitioning || to === pathname) return;
    setNextPath(to);
    setIsTransitioning(true);
  };

  // Quand la transition démarre, attendre la fin de l'animation avant de naviguer
  useEffect(() => {
    if (isTransitioning && nextPath && nextPath !== pathname) {
      const timer = setTimeout(() => {
        router.push(nextPath);
      }, 700); // durée de l'animation d'entrée
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, nextPath, pathname, router]);

  // Quand la route change, attendre la fin de l'animation de sortie avant d'afficher le nouveau contenu
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      prevPath.current = pathname;
      setDisplayChildren(children);
      return;
    }
    if (pathname !== prevPath.current) {
      // Attendre avant d'afficher le nouveau contenu
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setIsTransitioning(false);
        prevPath.current = pathname;
        setNextPath(null);
      }, 300); // durée de l'animation de sortie
      return () => clearTimeout(timer);
    }
  }, [pathname, children]);

  return (
    <TransitionContext.Provider value={{ startTransition, isTransitioning }}>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="transition-overlay"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.18, 1] }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-base-content via-base-300 to-base-100 flex items-center justify-center pointer-events-none"
          >
            <motion.span
              initial={{ scale: 0.5, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 20, opacity: 0, y: "-100%" }}
              transition={{ duration: 0.5, ease: [0.77, 0, 0.18, 1] }}
              className="text-4xl font-bold text-white drop-shadow-lg drop-shadow-base-content"
            >
              {getTitleInfo(nextPath || pathname)}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
      <div style={{ opacity: isTransitioning ? 0.3 : 1, transition: 'opacity 0.3s' }}>
        {displayChildren}
      </div>
    </TransitionContext.Provider>
  );
};

export default Transition;
