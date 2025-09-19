"use client";
import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useHotkeys } from 'react-hotkeys-hook';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function SmoothScroll() {
  const [, forceRender] = useState(0);
  const percentRef = useRef<number>(0);
  const dirRef = useRef<'down' | 'up' | null>(null);
  const lastPercentRef = useRef<number>(0);
  const lastEmojiRef = useRef<string>("");
  const lastEdgeRef = useRef<number>(-1); 
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useHotkeys('arrowdown', (e) => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    const lenis = lenisRef.current;
    if (!wrapper || !content || !lenis) return;
    lenis.scrollTo(wrapper.scrollTop + 40, { immediate: true });
    e.preventDefault();
  }, { enableOnFormTags: true });

  useHotkeys('arrowup', (e) => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    const lenis = lenisRef.current;
    if (!wrapper || !content || !lenis) return;
    lenis.scrollTo(wrapper.scrollTop - 40, { immediate: true });
    e.preventDefault();
  }, { enableOnFormTags: true });

  useHotkeys('pagedown', (e) => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    const lenis = lenisRef.current;
    if (!wrapper || !content || !lenis) return;
    lenis.scrollTo(wrapper.scrollTop + wrapper.clientHeight, { immediate: true });
    e.preventDefault();
  }, { enableOnFormTags: true });

  useHotkeys('pageup', (e) => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    const lenis = lenisRef.current;
    if (!wrapper || !content || !lenis) return;
    lenis.scrollTo(wrapper.scrollTop - wrapper.clientHeight, { immediate: true });
    e.preventDefault();
  }, { enableOnFormTags: true });

  useHotkeys('home', (e) => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    const lenis = lenisRef.current;
    if (!wrapper || !content || !lenis) return;
    lenis.scrollTo(0, { immediate: true });
    e.preventDefault();
  }, { enableOnFormTags: true });

  useHotkeys('end', (e) => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    const lenis = lenisRef.current;
    if (!wrapper || !content || !lenis) return;
    lenis.scrollTo(content.scrollHeight, { immediate: true });
    e.preventDefault();
  }, { enableOnFormTags: true });

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    if (isMobile) {
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
      gestureOrientation: 'vertical',
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
    (lenis as unknown as { on: (event: string, cb: () => void) => void }).on('scroll', onLenisScroll);
    // Ensure ScrollTrigger uses this scroller by default (optional)
    ScrollTrigger.defaults({ scroller: wrapper });
    // Refresh after setup
    ScrollTrigger.refresh();

    function updateFromLenis() {
      const scrollTop = lenis.scroll;
      const scrollHeight = lenis.limit;
      const p = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0;
 
      let newDir: 'down' | 'up' | null = null;
      if (p > lastPercentRef.current) newDir = 'down';
      else if (p < lastPercentRef.current) newDir = 'up';

      let shouldRender = false;
      if (p === 0 && lastEdgeRef.current !== 0) {
        lastEmojiRef.current = pickOne(['🚀', '🟢', '▶️']);
        lastEdgeRef.current = 0;
        shouldRender = true;
      } else if (p === 100 && lastEdgeRef.current !== 100) {
        lastEmojiRef.current = pickOne(['🏁', '🎯', '💯']);
        lastEdgeRef.current = 100;
        shouldRender = true;
      } else if (p > 0 && p < 100) {
        if (newDir !== dirRef.current) {
          if (newDir === 'down') {
            lastEmojiRef.current = '⬇️';
          } else if (newDir === 'up') {
            lastEmojiRef.current = '⬆️';
          }
          dirRef.current = newDir;
          lastEdgeRef.current = -1;
          shouldRender = true;
        }
      }
      percentRef.current = p;
      lastPercentRef.current = p;
      if (shouldRender) forceRender(x => x + 1);
    }

    function raf(time: number) {
      lenis.raf(time);
      updateFromLenis();
      animationId = requestAnimationFrame(raf);
    }
    animationId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationId);
      if (typeof (lenis as unknown as { off?: (event: string, cb: () => void) => void }).off === 'function') {
        (lenis as unknown as { off: (event: string, cb: () => void) => void }).off('scroll', onLenisScroll);
      }
      // Kill only triggers tied to this scroller
      ScrollTrigger.getAll().forEach((t) => {
        if (t.scroller === wrapper) t.kill();
      });
      lenis.destroy();
    };
  }, [pathname]);

  function pickOne<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  const emoji = lastEmojiRef.current;
  const percent = percentRef.current;
  const showPercent = percent > 0 && percent < 100;
  return (
    <title>
      {`Alexis Germain\xa0${showPercent ? percent : ''}\xa0${emoji}`}
    </title>
  );
}


