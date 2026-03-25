"use client";
import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { getTitleInfo } from "./getTitleInfo";

gsap.registerPlugin(ScrollTrigger);


export default function SmoothScroll() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const hotkeysEnabled = !isMobile && !prefersReducedMotion;
  const titleRafRef = useRef<number | null>(null);
  const lastTitleRef = useRef("");
  const lastScrollTopRef = useRef(0);
  const lastDirectionRef = useRef<"down" | "up" | null>(null);
  const lastEdgeRef = useRef(-1);
  const emojiRef = useRef("⬇️");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const container = document.getElementById("content");
    if (!container) return;

    lastScrollTopRef.current = 0;
    lastDirectionRef.current = null;
    lastEdgeRef.current = -1;
    emojiRef.current = "⬇️";

    const topEmojis = ["🚀", "🟢", "▶️"];
    const bottomEmojis = ["🏁", "🎯", "💯"];
    const downEmojis = ["⬇️", "👇", "🔽"];
    const upEmojis = ["⬆️", "👆", "🔼"];

    const pickOne = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

    const updateTitle = () => {
      const maxScroll = container.scrollHeight - container.clientHeight;
      const scrollTop = container.scrollTop;
      const percent = maxScroll > 0 ? Math.round((scrollTop / maxScroll) * 100) : 0;
      const direction =
        scrollTop > lastScrollTopRef.current
          ? "down"
          : scrollTop < lastScrollTopRef.current
            ? "up"
            : null;

      if (percent === 0 && lastEdgeRef.current !== 0) {
        emojiRef.current = pickOne(topEmojis);
        lastEdgeRef.current = 0;
      } else if (percent === 100 && lastEdgeRef.current !== 100) {
        emojiRef.current = pickOne(bottomEmojis);
        lastEdgeRef.current = 100;
      } else if (percent > 0 && percent < 100 && direction) {
        if (direction !== lastDirectionRef.current) {
          emojiRef.current = pickOne(direction === "down" ? downEmojis : upEmojis);
          lastDirectionRef.current = direction;
          lastEdgeRef.current = -1;
        }
      }

      const pageTitle = getTitleInfo(pathname);
      const baseTitle = pageTitle ? `Alexis Germain | ${pageTitle}` : "Alexis Germain";
      const progressLabel =
        percent === 0
          ? `TOP ${emojiRef.current}`
          : percent === 100
            ? `END ${emojiRef.current}`
            : `${percent}% ${emojiRef.current}`;
      const nextTitle = `${baseTitle} ${progressLabel}`;

      if (nextTitle !== lastTitleRef.current) {
        document.title = nextTitle;
        lastTitleRef.current = nextTitle;
      }

      lastScrollTopRef.current = scrollTop;
    };

    const handleScroll = () => {
      if (titleRafRef.current !== null) return;
      titleRafRef.current = window.requestAnimationFrame(() => {
        updateTitle();
        titleRafRef.current = null;
      });
    };

    updateTitle();
    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (titleRafRef.current !== null) {
        window.cancelAnimationFrame(titleRafRef.current);
      }
    };
  }, [pathname]);

  useHotkeys(
    "arrowdown",
    (e) => {
      const wrapper = wrapperRef.current;
      const content = contentRef.current;
      const lenis = lenisRef.current;
      if (!wrapper || !content || !lenis) return;
      lenis.scrollTo(wrapper.scrollTop + 40, { immediate: true });
      e.preventDefault();
    },
    { enableOnFormTags: false, enabled: hotkeysEnabled }
  );

  useHotkeys(
    "arrowup",
    (e) => {
      const wrapper = wrapperRef.current;
      const content = contentRef.current;
      const lenis = lenisRef.current;
      if (!wrapper || !content || !lenis) return;
      lenis.scrollTo(wrapper.scrollTop - 40, { immediate: true });
      e.preventDefault();
    },
    { enableOnFormTags: false, enabled: hotkeysEnabled }
  );

  useHotkeys(
    "pagedown",
    (e) => {
      const wrapper = wrapperRef.current;
      const content = contentRef.current;
      const lenis = lenisRef.current;
      if (!wrapper || !content || !lenis) return;
      lenis.scrollTo(wrapper.scrollTop + wrapper.clientHeight, { immediate: true });
      e.preventDefault();
    },
    { enableOnFormTags: false, enabled: hotkeysEnabled }
  );

  useHotkeys(
    "pageup",
    (e) => {
      const wrapper = wrapperRef.current;
      const content = contentRef.current;
      const lenis = lenisRef.current;
      if (!wrapper || !content || !lenis) return;
      lenis.scrollTo(wrapper.scrollTop - wrapper.clientHeight, { immediate: true });
      e.preventDefault();
    },
    { enableOnFormTags: false, enabled: hotkeysEnabled }
  );

  useHotkeys(
    "home",
    (e) => {
      const wrapper = wrapperRef.current;
      const content = contentRef.current;
      const lenis = lenisRef.current;
      if (!wrapper || !content || !lenis) return;
      lenis.scrollTo(0, { immediate: true });
      e.preventDefault();
    },
    { enableOnFormTags: false, enabled: hotkeysEnabled }
  );

  useHotkeys(
    "end",
    (e) => {
      const wrapper = wrapperRef.current;
      const content = contentRef.current;
      const lenis = lenisRef.current;
      if (!wrapper || !content || !lenis) return;
      lenis.scrollTo(content.scrollHeight, { immediate: true });
      e.preventDefault();
    },
    { enableOnFormTags: false, enabled: hotkeysEnabled }
  );

  useEffect(() => {
    if (isMobile || prefersReducedMotion) {
      return;
    }
    const wrapper = document.getElementById("content");
    if (!wrapper) return;
    const content = wrapper.querySelector(".lenis-content") as HTMLElement | null;
    if (!content) return;
    wrapperRef.current = wrapper;
    contentRef.current = content;

    const lenis = new Lenis({
      wrapper,
      content,
      smoothWheel: true,
      lerp: 0.1,
      gestureOrientation: "vertical",
    });
    lenisRef.current = lenis;
    let animationId: number;

    // Sync GSAP ScrollTrigger with Lenis wrapper
    ScrollTrigger.scrollerProxy(wrapper, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value as number, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: (wrapper as HTMLElement).style.transform ? "transform" : "fixed",
    });

    const onLenisScroll = () => ScrollTrigger.update();
    (lenis as unknown as { on: (event: string, cb: () => void) => void }).on(
      "scroll",
      onLenisScroll
    );
    // Ensure ScrollTrigger uses this scroller by default (optional)
    ScrollTrigger.defaults({ scroller: wrapper });
    // Refresh after setup
    ScrollTrigger.refresh();

    function raf(time: number) {
      lenis.raf(time);
      animationId = requestAnimationFrame(raf);
    }
    animationId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationId);
      if (
        typeof (lenis as unknown as { off?: (event: string, cb: () => void) => void })
          .off === "function"
      ) {
        (lenis as unknown as { off: (event: string, cb: () => void) => void }).off(
          "scroll",
          onLenisScroll
        );
      }
      // Kill only triggers tied to this scroller
      ScrollTrigger.getAll().forEach((t) => {
        if (t.scroller === wrapper) t.kill();
      });
      lenis.destroy();
    };
  }, [pathname, isMobile, prefersReducedMotion]);

  return null;
}
