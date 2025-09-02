"use client";

import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { TransitionContext } from "./TransitionLink";

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

const staticPixelsCache: Record<string, Pixel[]> = {};

const GRID_COLS = 6;
const GRID_ROWS = 12;
const ANIMATION_DURATION = 600;

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navLinks,
}) => {
  const t = useTranslations();
  const { startTransition, isTransitioning } = useContext(TransitionContext);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedLink, setSelectedLink] = useState<string | null>(null);

  const generatePixels = useCallback(() => {
    const cacheKey = `${GRID_COLS}-${GRID_ROWS}`;

    if (staticPixelsCache[cacheKey]) {
      return staticPixelsCache[cacheKey];
    }

    const pixels: Pixel[] = [];
    const totalPixels = GRID_COLS * GRID_ROWS;

    const indices = Array.from({ length: totalPixels }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    indices.forEach((index, i) => {
      pixels.push({
        id: index,
        delay: i * 0.003 + Math.random() * 0.001,
        gridX: index % GRID_COLS,
        gridY: Math.floor(index / GRID_COLS),
      });
    });

    staticPixelsCache[cacheKey] = pixels;
    return pixels;
  }, []);

  const pixels = useMemo(generatePixels, [generatePixels]);

  const handleClose = useCallback(() => {
    if (isClosing) return;

    setIsClosing(true);
    onClose();

    setTimeout(() => {
      setIsClosing(false);
      setSelectedLink(null);
    }, ANIMATION_DURATION);
  }, [isClosing, onClose]);

  const handleLinkClick = useCallback(
    (href: string) => {
      if (isClosing || isTransitioning) return;

      setSelectedLink(href);
      handleClose();

      setTimeout(() => {
        startTransition(href);
      }, 100);
    },
    [isClosing, isTransitioning, handleClose, startTransition]
  );
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Background pixel grid */}
          <div
            className="absolute inset-0 z-0"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
              gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
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

          {/* Menu content */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 py-16">
            {/* Close button */}
            <motion.button
              className="absolute top-14 right-6 p-2 rounded-full bg-base-200 text-base-content hover:bg-base-300 transition-colors"
              onClick={handleClose}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3, duration: 0.2 }}
              aria-label="Close menu"
            >
              <X size={24} />
            </motion.button>

            {/* Header */}
            <motion.h2
              className="text-3xl font-bold mb-8 text-base-content text-center leading-tight"
              style={{ fontFamily: "var(--font-despairs)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <span className="ml-2">ALEXIS GERMAIN</span>
            </motion.h2>

            {/* Nav links */}
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
                      className={`w-full flex items-center justify-center p-3 rounded-lg text-xl font-medium 
                        ${
                          selectedLink === link.href
                            ? "bg-primary text-primary-content"
                            : "bg-base-200 text-base-content hover:bg-base-300"
                        } transition-colors`}
                      disabled={isClosing}
                      style={
                        isClosing ? { pointerEvents: "none", opacity: 0.7 } : {}
                      }
                    >
                      {link.icon && <span className="mr-3">{link.icon}</span>}
                      {t(link.labelKey)}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
