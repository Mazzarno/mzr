"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import Loading from "./Loading";
import { usePathname } from "next/navigation";
import TransitionLink from "./TransitionLink";
import { motion, useMotionValue, animate } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitch";
import Logo from "./Logo";
import { Github, Linkedin, Mail, Maximize, Menu, Minimize } from "lucide-react";
import Background from "./background";
import AnimatedText from "./AnimatedText";
import dynamic from "next/dynamic";
import LanguageSwitcher from "./LanguageSwitcher";
import Transition from "./Transition";
import { getTitleInfo } from "./getTitleInfo";
import SmoothScroll from "./SmoothScroll";
import MobileMenu from "./MobileMenu";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
  loading: () => <div className="cursor" />,
});

const FaviconUpdater = dynamic(() => import("./FaviconUpdater"), {
  ssr: false,
});

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

const MemoizedNavigation = memo(function Navigation({
  navLinks,
  isReduced,
  onToggleResize,
  navAnimation = false,
}: {
  navLinks: Array<{ href: string; labelKey: string }>;
  isReduced: boolean;
  onToggleResize: () => void;
  navAnimation?: boolean;
}) {
  return (
    <>
      <div className="flex items-center md:space-x-5 px-1 transition-all duration-100 z-70">
        {/* CustomBorderRadius Nav right Border */}
        <div className="absolute md:top-3 md:-right-10  top-3 -right-[19.8px] z-70">
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
              <span className="block">Germain</span>
              <span className="block">Alexis</span>
            </div>
          </div>
        </TransitionLink>
        {navLinks.map((link, i) => {
          return (
            <motion.div
              key={link.href}
              className="relative  items-center hidden md:flex"
              initial={navAnimation ? { opacity: 0, x: 40 } : false}
              animate={navAnimation ? { opacity: 1, x: 0 } : false}
              transition={
                navAnimation
                  ? {
                      delay: 0.2 + i * 0.15,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 60,
                    }
                  : {}
              }
            >
              <TransitionLink
                href={link.href}
                className="block text-neutral-content text-sm transition-colors duration-100"
              >
                <div className="text-center relative overflow-hidden h-5 group">
                  <div
                    className="transition-transform duration-300 transform group-hover:-translate-y-5"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="block">
                      {link.labelKey ? (
                        <AnimatedText
                          translationKey={link.labelKey}
                          className="inline-block"
                          animated={false}
                        />
                      ) : (
                        <AnimatedText
                          text={link.labelKey || ""}
                          className="inline-block"
                          animated={false}
                        />
                      )}
                    </div>
                    <div className="block">
                      {link.labelKey ? (
                        <AnimatedText
                          translationKey={link.labelKey}
                          className="inline-block"
                          animated={false}
                        />
                      ) : (
                        <AnimatedText
                          text={link.labelKey || ""}
                          className="inline-block"
                          animated={false}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </TransitionLink>
              <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-secondary rounded-full" />
            </motion.div>
          );
        })}
        <div className="md:pl-0 pl-3">
          <LanguageSwitcher />
        </div>
        <div className="relative overflow-hidden h-5 group hidden md:flex">
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
        <div className="relative overflow-hidden h-5 group hidden md:flex">
          <div
            key={isReduced ? "reduced" : "expanded"}
            className="transition-transform duration-300 transform group-hover:-translate-y-5"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="block position-top">
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

            <div className="block position-bottom">
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
    </>
  );
});

const MemoizedFooter = memo(function Footer({
  isMobile,
  pathname,
}: {
  isMobile: boolean;
  pathname: string;
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
      <span className={`font-bold ${isMobile ? "text-xs" : "text-sm"}`}>
        {getTitleInfo(pathname)}
      </span>
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
const DraggableBorders = memo(function DraggableBorders({
  onDragStart,
}: {
  onDragStart: () => void;
}) {
  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    onDragStart();
  };

  return (
    <>
      <div
        className="absolute w-full h-3 bottom-0 bg-neutral z-[999] pointer-events-none"
        onPointerDown={handlePointerDown}
      />
      <div
        className="absolute h-full w-3 right-0 bg-neutral z-[999] pointer-events-none"
        onPointerDown={handlePointerDown}
      />
      <div
        className="absolute h-full w-3 left-0 bg-neutral z-[999] pointer-events-none"
        onPointerDown={handlePointerDown}
      />
      <div
        className="absolute w-full h-3 top-0 bg-neutral z-[999] pointer-events-none"
        onPointerDown={handlePointerDown}
      />
    </>
  );
});

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [showLoader, setShowLoader] = useState(true);
  const [showNavAnimation, setShowNavAnimation] = useState(false);
  const isInitialRender = useRef(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isReduced, setIsReduced] = useState(false);
  const onToggleResize = () => setIsReduced((v) => !v);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isInitialRender.current) {
      setShowLoader(true);
      isInitialRender.current = false;
    }
    setShowNavAnimation(false);

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

  const navLinks = [
    { href: "/work", labelKey: "navigation.work" },
    { href: "/about", labelKey: "navigation.about" },
    { href: "/contact", labelKey: "navigation.contact" },
  ];

  const handleDragStart = () => {
    if (!isMobile) {
      setIsDragging(true);
    }
  };

  if (showLoader) {
    return (
      <Loading
        duration={0.1}
        onLoadComplete={() => {
          setShowLoader(false);
          setTimeout(() => setShowNavAnimation(true), 100);
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
        <motion.div
          className="absolute h-full w-full pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Background />
        </motion.div>
        <MemoizedGrid />
        <motion.div
          className={
            "relative overflow-hidden z-10 backdrop-blur-sm  scrollbar-hide shadow-[0px_0px_10px_6px_rgba(0,_0,_0,_0.1)] "
          }
          animate={{
            width: isReduced ? "90vw" : "100vw",
            height: isReduced ? "90dvh" : "100dvh",
            borderRadius: isReduced ? "1rem" : "0rem",
          }}
          drag={!isReduced ? false : isDragging}
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
                <div
                  className="absolute top-0 left-0 w-auto h-[47px] flex items-center justify-between text-sm text-neutral-content bg-neutral px-4 rounded-br-[20px] z-70 cursor-grab"
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    handleDragStart();
                  }}
                >
                  <MemoizedNavigation
                    navLinks={navLinks}
                    isReduced={isReduced}
                    onToggleResize={() => setIsReduced((v) => !v)}
                    navAnimation={showNavAnimation}
                  />
                </div>

                <div className="absolute top-0 right-0 w-auto h-[47px]  items-center justify-between text-sm text-neutral-content bg-neutral px-4 rounded-bl-[20px] z-70 cursor-grab flex md:hidden">
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
                  </div>{" "}
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
                  <div className="flex items-center space-x-5 px-1 transition-all duration-100 z-50">
                    <div className="relative overflow-hidden h-5 group">
                      <div
                        className="transition-transform duration-300 transform group-hover:-translate-y-5"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <div className="block">
                          <ThemeSwitcher />
                        </div>
                      </div>
                    </div>
                    <div className="relative overflow-hidden h-5 group">
                      <div
                        key={isReduced ? "reduced" : "expanded"}
                        className="transition-transform duration-300 transform group-hover:-translate-y-5"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <div className="block">
                          <button
                            aria-label={isReduced ? "Maximiser" : "Réduire"}
                            onClick={onToggleResize}
                            className="focus:outline-none"
                          >
                            {isReduced ? (
                              <Minimize
                                size={17}
                                className="text-base-content"
                              />
                            ) : (
                              <Maximize
                                size={17}
                                className="text-base-content"
                              />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      className="focus:outline-none"
                      aria-label="Toggle Mobile Nav"
                      onClick={() => setShowMobileNav(true)}
                    >
                      <Menu size={20} className="text-base-content mb-[2px]" />
                    </button>
                  </div>
                </div>

                <motion.div
                  className="w-full h-full overflow-y-auto overflow-x-hidden z-0"
                  id="content"
                  ref={contentRef}
                  tabIndex={0}
                >
                  <div className="lenis-content">
                    <div key={pathname}>{children}</div>
                  </div>
                  <SmoothScroll />
                </motion.div>
              </>
            </Transition>
            <MobileMenu
              isOpen={showMobileNav}
              onClose={() => setShowMobileNav(false)}
              navLinks={navLinks}
            />

            <MemoizedFooter isMobile={isMobile} pathname={pathname} />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
