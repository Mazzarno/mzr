"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface Pixel {
  id: number;
  delay: number;
  gridX: number;
  gridY: number;
}

interface NavLink {
  href: string;
  labelKey: string;
  icon?: React.ReactNode;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}

let staticPixelsCache: Pixel[] | null = null;

function getStaticPixels(generatePixels: () => Pixel[]): Pixel[] {
  if (!staticPixelsCache) {
    staticPixelsCache = generatePixels();
  }
  return staticPixelsCache;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navLinks,
}) => {
  const t = useTranslations();
  const [isClosing, setIsClosing] = useState(false);
  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const navigatedRef = useRef(false);

  const gridCols = 6;
  const gridRows = 12;

  const generatePixels = () => {
    const pixels: Pixel[] = [];
    const totalPixels = gridCols * gridRows;

    const indices = Array.from({ length: totalPixels }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    indices.forEach((index, i) => {
      const gridX = index % gridCols;
      const gridY = Math.floor(index / gridCols);

      const baseDelay = i * 0.003;
      const randomVariation = Math.random() * 0.001;

      pixels.push({
        id: index,
        delay: baseDelay + randomVariation,
        gridX,
        gridY,
      });
    });

    return pixels;
  };

  const pixels = useMemo(() => getStaticPixels(generatePixels), []);
  const router = useRouter();

  const handleLinkClick = (href: string) => {
    if (isClosing) return;
    
    setSelectedLink(href);
    setIsClosing(true);
    setPendingNavigation(href);
    
    // Fermer d'abord le menu
    onClose();
    
    // Réinitialiser les états après l'animation
    setTimeout(() => {
      setIsClosing(false);
      setSelectedLink(null);
    }, 600);
  };

  // Effectuer la navigation après la fermeture du menu
  useEffect(() => {
    if (!isOpen && pendingNavigation && !navigatedRef.current) {
      navigatedRef.current = true;
      const timeout = setTimeout(() => {
        router.push(pendingNavigation);
        setPendingNavigation(null);
        navigatedRef.current = false;
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [isOpen, pendingNavigation, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsClosing(true);
        onClose();
        setTimeout(() => {
          setIsClosing(false);
        }, 600);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    // Réinitialiser le drapeau de navigation quand le menu s'ouvre à nouveau
    if (isOpen) {
      navigatedRef.current = false;
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsClosing(true);
      onClose();
      setTimeout(() => {
        setIsClosing(false);
      }, 600);
    }
  };

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={handleBackdropClick}
        >
          <div
            className="absolute inset-0 z-0"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
              gridTemplateRows: `repeat(${gridRows}, 1fr)`,
            }}
          >
            {pixels.map((pixel) => (
              <motion.div
                key={`pixel-${pixel.id}`}
                className="w-full h-full bg-base-300"
                style={{
                  gridColumn: pixel.gridX + 1,
                  gridRow: pixel.gridY + 1,
                  originX: 0.5,
                  originY: 0.5,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  duration: 0.3,
                  delay: pixel.delay,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 py-16">
            <motion.button
              className="absolute top-14 right-6 p-2 rounded-full bg-base-200 text-base-content hover:bg-base-300 transition-colors"
              onClick={() => {
                setIsClosing(true);
                onClose();
                setTimeout(() => {
                  setIsClosing(false);
                }, 600);
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3, duration: 0.2 }}
              aria-label="Close menu"
            >
              <X size={24} />
            </motion.button>

            <motion.h2
              className="text-3xl font-bold mb-8 text-base-content text-center leading-tight"
              style={{ fontFamily: "var(--font-despairs)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <span className="ml-2"> ALEXIS GERMAIN</span>
            </motion.h2>

            {/* Links */}
            <nav className="flex flex-col items-center w-full max-w-xs">
              <ul className="w-full space-y-4">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    className="w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      selectedLink === link.href
                        ? { scale: 1.2, opacity: 0, y: -20 }
                        : { opacity: 0, y: 20 }
                    }
                    transition={{
                      delay: 0.2 + index * 0.1,
                      duration: 0.3,
                      exit: { duration: 0.2 },
                    }}
                  >
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className={`w-full flex items-center justify-center p-3 rounded-lg text-xl font-medium ${
                        selectedLink === link.href
                          ? "bg-primary text-primary-content"
                          : "bg-base-200 text-base-content hover:bg-base-300"
                      } transition-colors`}
                      disabled={isClosing}
                      style={isClosing ? { pointerEvents: 'none', opacity: 0.7 } : {}}
                    >
                      {link.icon && <span className="mr-3">{link.icon}</span>}
                      {t(link.labelKey)}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;