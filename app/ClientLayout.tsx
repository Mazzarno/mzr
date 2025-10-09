"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import Loading from "../components/core/Loading";
import TransitionLink from "../components/core/TransitionLink";
import {
  motion,
  useMotionValue,
  useDragControls,
  animate,
  DragControls,
} from "framer-motion";
import ThemeSwitcher from "../components/core/ThemeSwitch";
import Logo from "../components/core/Logo";
import { Github, Linkedin, Mail, Maximize, Minimize } from "lucide-react";
import Background from "../components/background";
import dynamic from "next/dynamic";
import LanguageSwitcher from "../components/core/LanguageSwitcher";
import Transition from "../components/core/Transition";
import SmoothScroll from "../components/core/SmoothScroll";
import Noise from "../components/shared/Noise";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
  loading: () => <div className="cursor" />,
});

const FaviconUpdater = dynamic(() => import("../components/core/FaviconUpdater"), {
  ssr: false,
});

const MemoizedGrid = memo(function Grid() {
  return (
    <>
      <motion.div
        className="
        fixed inset-0
        grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5
        lg:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-11
        divide-x-2 divide-dashed
        pointer-events-none
        opacity-30
      "
        initial={{ opacity: 0, filter: "blur(0.25px) brightness(0.5)" }}
        animate={{
          opacity: [0.5, 0.7, 1, 0.7, 0.5],
          filter: "blur(0px) brightness(1)",
        }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
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
          />
        ))}
      </motion.div>
    </>
  );
});
const MemoizedNavigation = memo(function Navigation() {
  return (
    <div className="flex items-center transition-all duration-100 z-70 pl-2">
      {/* CustomBorderRadius Nav right Border */}
      <div className="absolute top-3 -right-5 z-70">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0L0 20C0 8.95431 8.95431 0 20 0L0 0Z"
            fill="var(--color-neutral)"
          ></path>
        </svg>
      </div>
      {/* CustomBorderRadius Nav left Border */}
      <div className="absolute -bottom-5 left-3 z-70">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0L0 20C0 8.95431 8.95431 0 20 0L0 0Z"
            fill="var(--color-neutral)"
          ></path>
        </svg>
      </div>
      <TransitionLink href="/" className="flex items-center space-x-3">
        <Logo />
        <div className="relative inline-block overflow-hidden h-5 group">
          <div
            className="transition-transform duration-300 transform group-hover:-translate-y-5"
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="block text-sm tracking-widest font-dm-sans font-medium content-gradient">
              Germain
            </span>
            <span className="block text-sm tracking-widest font-dm-sans font-medium content-gradient">
              Alexis
            </span>
          </div>
        </div>
      </TransitionLink>
    </div>
  );
});

const MemoizedFooter = memo(function Footer({
  isMobile,
}: {
  isMobile: boolean;
}) {
  return (
    <div
      className={`absolute bottom-0 right-0 w-auto h-[47px] flex items-center space-x-2 text-neutral-content bg-neutral px-4 shadow-[-1px_-1px_10px_0px_rgba(0,_0,_0,_0.1)] rounded-tl-3xl z-70 ${isMobile ? "text-xs" : ""}`}
    >
      {/* CustomBorderRadius Footer Top right corner */}
      <div className="absolute -top-4 right-1 z-70">
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
      {/* CustomBorderRadius Footer Bottom left corner */}
      <div className="absolute bottom-3 -left-[15px] md:bottom-3 md:-left-4 z-70">
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
      {/* Socials */}
      <div className="flex items-center space-x-6">
        {/* Github */}
        <div className="relative overflow-hidden h-5 group">
          <div
            className="transition-transform duration-300 transform group-hover:-translate-y-6"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="block">
              <a
                href="https://github.com/Mazzarno"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-content hover:text-primary transition-colors"
              >
                <button
                  className="text-sm text-neutral-content focus:outline-none"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </button>
              </a>
            </div>
            <div className="block">
              <a
                href="https://github.com/Mazzarno"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-content hover:text-primary transition-colors"
              >
                <button
                  className="text-sm text-neutral-content focus:outline-none"
                  aria-label="GitHub"
                >
                  <Github size={18} className="text-indigo-500" />
                </button>
              </a>
            </div>
          </div>
        </div>
        {/* Linkedin */}
        <div className="relative overflow-hidden h-5 group">
          <div
            className="transition-transform duration-300 transform group-hover:-translate-y-6"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="block">
              <a
                href="https://www.linkedin.com/in/alexis-germain/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-content hover:text-primary transition-colors"
              >
                <button
                  className="text-sm text-neutral-content focus:outline-none"
                  aria-label="Linkedin"
                >
                  <Linkedin size={18} />
                </button>
              </a>
            </div>
            <div className="block">
              <a
                href="https://www.linkedin.com/in/alexis-germain/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-content hover:text-primary transition-colors"
              >
                <button
                  className="text-sm text-neutral-content focus:outline-none"
                  aria-label="Linkedin"
                >
                  <Linkedin size={18} className="text-indigo-500" />
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Mail */}

        <div className="relative overflow-hidden h-5 group">
          <div
            className="transition-transform duration-300 transform group-hover:-translate-y-6"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="block">
              <a
                href="mailto:contact@alexis-germain.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-content hover:text-primary transition-colors"
              >
                <button
                  className="text-sm text-neutral-content focus:outline-none"
                  aria-label="Mail"
                >
                  <Mail size={18} />
                </button>
              </a>
            </div>
            <div className="block">
              <a
                href="mailto:contact@alexis-germain.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-content hover:text-primary transition-colors"
              >
                <button
                  className="text-sm text-neutral-content focus:outline-none"
                  aria-label="Mail"
                >
                  <Mail size={18} className="text-indigo-500" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export function DraggableBorders({
  dragControls,
}: {
  dragControls: DragControls;
}) {
  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    dragControls.start(e);
  };

  return (
    <>
      <div
        className="absolute w-full h-3 bottom-0 bg-neutral z-[999] link touch-none"
        onPointerDown={handlePointerDown}
      />
      <div
        className="absolute h-full w-3 right-0 bg-neutral z-[999] link touch-none"
        onPointerDown={handlePointerDown}
      />
      <div
        className="absolute h-full w-3 left-0 bg-neutral z-[999] link touch-none"
        onPointerDown={handlePointerDown}
      />
      <div
        className="absolute w-full h-3 top-0 bg-neutral z-[999] link touch-none"
        onPointerDown={handlePointerDown}
      />
    </>
  );
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [showLoader, setShowLoader] = useState(true);
  const isInitialRender = useRef(true);
  const [isMobile, setIsMobile] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [isReduced, setIsReduced] = useState(false);
  const onToggleResize = () => setIsReduced((v) => !v);

  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isInitialRender.current) {

      try {
        const hasVisited = typeof window !== "undefined" &&
          window.localStorage.getItem("hasVisited") === "true";
        setShowLoader(!hasVisited);
      } catch {

        setShowLoader(true);
      }
      isInitialRender.current = false;
    }

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();

    const handleResize = () => {
      checkIfMobile();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dragControls = useDragControls();

  if (showLoader) {
    return (
      <Loading
        duration={2}
        onLoadComplete={() => {
          try {
            if (typeof window !== "undefined") {
              window.localStorage.setItem("hasVisited", "true");
            }
          } catch {}
          setShowLoader(false);
        }}
      />
    );
  }
  return (
    <>
      {!isMobile && (
        <>
          <FaviconUpdater />
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
            clickables={[
              "a",
              "button",
              ".link",
              'input[type="text"]',
              'input[type="email"]',
              'input[type="number"]',
              'input[type="submit"]',
              'input[type="image"]',
              "label[for]",
              "select",
              "textarea",
              ".cursor-grab",
            ]}
          />
        </>
      )}
      <div
        className="flex items-center justify-center min-h-[100dvh] bg-gradient-to-bl from-content-200 to-content-100"
        ref={constraintsRef}
      >
        <div className="absolute h-full w-full pointer-events-none z-10">
          <Background />
        </div>
        <MemoizedGrid />
        <motion.main
          className={
            "relative overflow-hidden z-10 bg-neutral/10 backdrop-blur-xs scrollbar-hide shadow-[0px_0px_10px_6px_rgba(0,_0,_0,_0.1)] shadowz will-change-transform will-change-opacity"
          }
          initial={{ opacity: 0.5, width: "0vw", height: "0vh" }}
          animate={{
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            opacity: 1,
            width: isReduced ? "90vw" : "100vw",
            height: isReduced ? "90dvh" : "100dvh",
            borderRadius: isReduced ? "1rem" : "0rem",
            boxShadow: isReduced ? "0px 0px 10px 6px rgba(0, 0, 0, 0.1)" : "",
          }}
          transition={{
            type: "spring",
            stiffness: 160,
            damping: 22,
            mass: 0.9,
            opacity: { duration: 0.5, ease: "easeOut" },
            borderRadius: { duration: 0.5, ease: "easeOut" },
          }}
          drag={!isReduced ? false : true}
          dragListener={false}
          dragControls={dragControls}
          dragElastic={0.7}
          whileDrag={{ scale: 1 }}
          style={{ x, y, transformOrigin: "50% 40%" }}
          dragConstraints={constraintsRef}
          dragMomentum={false}
          onDragEnd={() => {
            animate(x, 0, { type: "spring", stiffness: 100, damping: 15 });
            animate(y, 0, { type: "spring", stiffness: 100, damping: 15 });
          }}
        >
          {/* Subtle vignette sweep on open */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.18, 0.08] }}
            transition={{ duration: 1.2, times: [0, 0.6, 1], ease: "easeOut" }}
            style={{
              background:
                "radial-gradient(120% 120% at 50% 50%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 60%)",
            }}
            aria-hidden
          />
          <DraggableBorders dragControls={dragControls} />
          {/* CustomBorderRadius Bottom left corner */}
          <div className="absolute bottom-3 left-3 -rotate-90 z-70">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0L0 20C0 8.95431 8.95431 0 20 0L0 0Z"
                fill="var(--color-neutral)"
              ></path>
            </svg>
          </div>
          {/* CustomBorderRadius top right corner */}
          <div className="absolute top-3 right-3 rotate-90 hidden sm:block z-70">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0L0 20C0 8.95431 8.95431 0 20 0L0 0Z"
                fill="var(--color-neutral)"
              ></path>
            </svg>
          </div>
          <motion.div className="w-full h-full overflow-auto scrollbar-hide">
            <Transition>
              <>
                <div className="absolute top-0 left-0 w-auto h-[47px] flex items-center justify-between  text-neutral-content bg-neutral pr-4 pl-2 rounded-br-[20px] z-70 cursor-grab">
                  <MemoizedNavigation />
                </div>

                <div className="absolute top-0 right-0 w-auto h-[47px]  items-center justify-between text-sm text-neutral-content bg-neutral pr-2 pl-4 rounded-bl-[20px] z-70 cursor-grab flex">
                  {/* CustomBorderRadius MobileNav left Border */}
                  <div className="absolute top-3 -left-5 rotate-90 z-70">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 0L0 20C0 8.95431 8.95431 0 20 0L0 0Z"
                        fill="var(--color-neutral)"
                      ></path>
                    </svg>
                  </div>
                  {/* CustomBorderRadius MobileNav right Border */}
                  <div className="absolute -bottom-5 right-3 rotate-90 z-70">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 0L0 20C0 8.95431 8.95431 0 20 0L0 0Z"
                        fill="var(--color-neutral)"
                      ></path>
                    </svg>
                  </div>
                  <div className="pr-2 pb-1">
                    <LanguageSwitcher />
                  </div>
                  <div className="relative overflow-hidden h-5 group px-2">
                    <div
                      className="transition-transform duration-300 transform group-hover:-translate-y-5"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="block">
                        <ThemeSwitcher position="top" />
                      </div>
                      <div className="block">
                        <ThemeSwitcher position="bottom" />
                      </div>
                    </div>
                  </div>
                  <div className="relative overflow-hidden h-5 group">
                    <div
                      key={isReduced ? "reduced" : "expanded"}
                      className="transition-transform duration-300 transform group-hover:-translate-y-5"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="block position-top px-2 pl-2">
                        <button
                          aria-label={isReduced ? "Maximiser" : "Réduire"}
                          onClick={onToggleResize}
                          className="focus:outline-none"
                        >
                          {isReduced ? (
                            <Minimize size={17} className="text-base-content" />
                          ) : (
                            <Maximize size={17} className="text-base-content" />
                          )}
                        </button>
                      </div>

                      <div className="block position-bottom px-1">
                        <button
                          onClick={onToggleResize}
                          className="focus:outline-none"
                          aria-label={!isReduced ? "Maximiser" : "Réduire"}
                        >
                          {isReduced ? (
                            <Maximize size={17} className="text-base-content" />
                          ) : (
                            <Minimize size={17} className="text-base-content" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div
                  className="w-full h-full overflow-y-auto overflow-x-hidden z-0"
                  id="content"
                  ref={contentRef}
                  tabIndex={0}
                >
                  <SmoothScroll />
                  <div className="lenis-content">
                    <Noise />
                    <div>{children}</div>
                  </div>
                </motion.div>
              </>
            </Transition>
            <MemoizedFooter isMobile={isMobile} />
          </motion.div>
        </motion.main>
      </div>
    </>
  );
}
