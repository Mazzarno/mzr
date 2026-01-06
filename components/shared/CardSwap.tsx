"use client";
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";
import Image from "next/image";

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  onActiveIndexChange?: (idx: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  placement?: "right" | "center";
  children: ReactNode;
}

export interface CardSwapHandle {
  bringToFront: (targetIdx: number) => void;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
  variant?: "plain" | "client";
  headerTitle?: string;
  headerLogoSrc?: string;
  headerLogoAlt?: string;
  imageSrc?: string;
  imageAlt?: string;
}

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

interface AnimConfig {
  ease: string;
  durDrop: number;
  durMove: number;
  durReturn: number;
  promoteOverlap: number;
  returnDelay: number;
}

// ============================================================================
// Card Component
// ============================================================================

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      customClass,
      variant = "plain",
      headerTitle,
      headerLogoSrc,
      headerLogoAlt = "Project logo",
      imageSrc,
      imageAlt = "Card media",
      children,
      ...rest
    },
    ref
  ) => (
    <div
      ref={ref}
      {...rest}
      className={[
        "absolute rounded-4xl top-1/2 left-1/2 [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] cursor-pointer",
        variant === "client"
          ? "bg-neutral/10 backdrop-blur-xs scrollbar-hide shadow-[0px_0px_10px_6px_rgba(0,_0,_0,_0.1)]"
          : "",
        customClass ?? "",
        rest.className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {variant === "client" && (
        <div
          className="absolute inset-0 pointer-events-none rounded-4xl"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 50%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 60%)",
          }}
          aria-hidden
        />
      )}
      <div className="relative rounded-4xl w-full h-full">
        {(headerTitle || headerLogoSrc) && (
          <div className="absolute top-0 left-0 w-auto h-[47px] flex items-center justify-between text-neutral-content bg-neutral pr-2 pl-1 rounded-br-[20px] z-70">
            <div className="flex items-center transition-all duration-100 z-70 pl-2">
              <div className="absolute top-3 -right-5 z-70">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0L0 20C0 8.95431 8.95431 0 20 0L0 0Z" fill="var(--color-neutral)" />
                </svg>
              </div>
              <div className="absolute -bottom-5 left-3 z-70">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0L0 20C0 8.95431 8.95431 0 20 0L0 0Z" fill="var(--color-neutral)" />
                </svg>
              </div>
              {headerLogoSrc && (
                <Image
                  className="w-5 h-5 mr-1"
                  alt={headerLogoAlt}
                  src={headerLogoSrc}
                  width={20}
                  height={20}
                />
              )}
              {headerTitle && (
                <div className="relative inline-block overflow-hidden h-5 group">
                  <p className="block text-sm tracking-widest font-dm-sans font-medium">
                    {headerTitle}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="absolute w-full h-3 bottom-0 bg-neutral/80 z-[999] touch-none rounded-b-2xl" />
        <div className="absolute h-full w-3 right-0 bg-neutral/80 z-[999] touch-none rounded-r-2xl" />
        <div className="absolute h-full w-3 left-0 bg-neutral/80 z-[999] touch-none rounded-l-2xl" />
        <div className="absolute w-full h-3 top-0 bg-neutral/80 z-[999] touch-none rounded-t-2xl" />
        <div className="absolute bottom-3 left-3 -rotate-90 z-70">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L0 20C0 8.95431 8.95431 0 20 0L0 0Z" fill="var(--color-neutral)" />
          </svg>
        </div>
        <div className="absolute top-3 right-3 rotate-90 hidden sm:block z-70">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L0 20C0 8.95431 8.95431 0 20 0L0 0Z" fill="var(--color-neutral)" />
          </svg>
        </div>
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          {imageSrc && (
            <div className="absolute inset-3 rounded-xl overflow-hidden">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                unoptimized
                sizes="(max-width: 768px) 90vw, 500px"
                className="object-cover object-center select-none pointer-events-none"
                priority={false}
              />
            </div>
          )}
          <div className="relative z-10 w-full h-full">{children}</div>
        </div>
      </div>
    </div>
  )
);
Card.displayName = "Card";

// ============================================================================
// Utility Functions
// ============================================================================

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const getAnimConfig = (easing: "linear" | "elastic"): AnimConfig =>
  easing === "elastic"
    ? {
        ease: "elastic.out(0.6,0.9)",
        durDrop: 1.5,
        durMove: 1.5,
        durReturn: 1.5,
        promoteOverlap: 0.85,
        returnDelay: 0.05,
      }
    : {
        ease: "power2.inOut",
        durDrop: 0.6,
        durMove: 0.6,
        durReturn: 0.6,
        promoteOverlap: 0.5,
        returnDelay: 0.15,
      };

// ============================================================================
// CardSwap Component
// ============================================================================

const CardSwap = forwardRef<CardSwapHandle, CardSwapProps>(
  (
    {
      width = 500,
      height = 400,
      cardDistance = 60,
      verticalDistance = 70,
      delay = 5000,
      pauseOnHover = false,
      onCardClick,
      onActiveIndexChange,
      skewAmount = 6,
      easing = "elastic",
      placement = "right",
      children,
    },
    ref
  ) => {
    // ========== Memoized Values ==========
    const config = useMemo(() => getAnimConfig(easing), [easing]);

    const childArr = useMemo(
      () => Children.toArray(children) as ReactElement<CardProps>[],
      [children]
    );

    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    // ========== State & Refs ==========
    const orderRef = useRef<number[]>(childArr.map((_, i) => i));
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const intervalRef = useRef<number | null>(null);
    const isAnimatingRef = useRef(false);
    const isPausedRef = useRef(false);
    const hoveredCardRef = useRef<number | null>(null);
    const hoverTweenRef = useRef<gsap.core.Tween | null>(null);

    // ========== Position Cards ==========
    const positionCards = useCallback(() => {
      const total = orderRef.current.length;
      orderRef.current.forEach((cardIdx, slotIdx) => {
        const el = cardRefs.current[cardIdx];
        if (!el) return;
        const slot = makeSlot(slotIdx, cardDistance, verticalDistance, total);
        gsap.set(el, {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          xPercent: -50,
          yPercent: -50,
          skewY: skewAmount,
          transformOrigin: "center center",
          zIndex: slot.zIndex,
          force3D: true,
        });
      });
    }, [cardDistance, verticalDistance, skewAmount]);

    // ========== Core Animation ==========
    const animateToNewOrder = useCallback(
      (newOrder: number[], newActiveIdx: number) => {
        if (isAnimatingRef.current) return;
        isAnimatingRef.current = true;

        // Kill any existing animation
        timelineRef.current?.kill();
        hoverTweenRef.current?.kill();

        const currentOrder = orderRef.current;
        const oldFrontIdx = currentOrder[0];
        const oldFrontEl = cardRefs.current[oldFrontIdx];
        const total = newOrder.length;

        const tl = gsap.timeline({
          onComplete: () => {
            orderRef.current = newOrder;
            isAnimatingRef.current = false;
          },
        });
        timelineRef.current = tl;

        // Notify text change IMMEDIATELY when animation starts
        onActiveIndexChange?.(newActiveIdx);

        if (!oldFrontEl) {
          isAnimatingRef.current = false;
          return;
        }

        // 1. Drop old front card
        tl.to(oldFrontEl, {
          y: "+=500",
          duration: config.durDrop,
          ease: config.ease,
        });

        // 2. Promote all cards except the one going to back
        tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);

        newOrder.forEach((cardIdx, slotIdx) => {
          // Skip the card going to back (last in new order)
          if (slotIdx === total - 1 && cardIdx === oldFrontIdx) return;

          const el = cardRefs.current[cardIdx];
          if (!el) return;

          const slot = makeSlot(slotIdx, cardDistance, verticalDistance, total);

          tl.set(el, { zIndex: slot.zIndex }, "promote");
          tl.to(
            el,
            {
              x: slot.x,
              y: slot.y,
              z: slot.z,
              duration: config.durMove,
              ease: config.ease,
            },
            `promote+=${slotIdx * 0.1}`
          );
        });

        // 3. Return old front to back
        const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);

        tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
        tl.set(oldFrontEl, { zIndex: backSlot.zIndex }, "return");
        tl.set(oldFrontEl, { x: backSlot.x, z: backSlot.z }, "return");
        tl.to(
          oldFrontEl,
          {
            y: backSlot.y,
            duration: config.durReturn,
            ease: config.ease,
          },
          "return"
        );
      },
      [config, cardDistance, verticalDistance, onActiveIndexChange]
    );

    // ========== Swap (Autoplay) ==========
    const swap = useCallback(() => {
      if (isAnimatingRef.current || isPausedRef.current) return;

      const currentOrder = orderRef.current;
      if (currentOrder.length < 2) return;

      const [oldFront, ...rest] = currentOrder;
      const newOrder = [...rest, oldFront];
      const newActiveIdx = rest[0];

      animateToNewOrder(newOrder, newActiveIdx);
    }, [animateToNewOrder]);

    // ========== Bring To Front ==========
    const bringToFront = useCallback(
      (targetIdx: number) => {
        if (isAnimatingRef.current) return;

        const currentOrder = orderRef.current;
        const posInOrder = currentOrder.indexOf(targetIdx);

        // Already at front
        if (posInOrder === 0) return;

        // Clear autoplay interval, will restart after animation
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        const oldFront = currentOrder[0];
        const newOrder = [
          targetIdx,
          ...currentOrder.filter((i) => i !== targetIdx && i !== oldFront),
          oldFront,
        ];

        animateToNewOrder(newOrder, targetIdx);

        // Restart autoplay after animation completes
        setTimeout(() => {
          if (!isPausedRef.current && !intervalRef.current) {
            intervalRef.current = window.setInterval(swap, delay);
          }
        }, (config.durDrop + config.durMove + config.durReturn) * 1000);
      },
      [animateToNewOrder, swap, delay, config]
    );

    // ========== Hover Effect ==========
    const handleCardHover = useCallback(
      (cardIdx: number, isEntering: boolean) => {
        // Don't hover the front card or during animation
        const currentFront = orderRef.current[0];
        if (cardIdx === currentFront || isAnimatingRef.current) return;

        const el = cardRefs.current[cardIdx];
        if (!el) return;

        hoverTweenRef.current?.kill();

        if (isEntering) {
          hoveredCardRef.current = cardIdx;
          hoverTweenRef.current = gsap.to(el, {
            y: "-=25",
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
        } else {
          hoveredCardRef.current = null;
          // Return to slot position
          const slotIdx = orderRef.current.indexOf(cardIdx);
          const slot = makeSlot(slotIdx, cardDistance, verticalDistance, orderRef.current.length);
          hoverTweenRef.current = gsap.to(el, {
            y: slot.y,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      },
      [cardDistance, verticalDistance]
    );

    // ========== Pause/Resume ==========
    const pause = useCallback(() => {
      isPausedRef.current = true;
      timelineRef.current?.pause();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, []);

    const resume = useCallback(() => {
      isPausedRef.current = false;
      timelineRef.current?.play();
      if (!intervalRef.current) {
        intervalRef.current = window.setInterval(swap, delay);
      }
    }, [swap, delay]);

    // ========== Expose Methods ==========
    useImperativeHandle(
      ref,
      () => ({
        bringToFront,
      }),
      [bringToFront]
    );

    // ========== Initialize ==========
    useEffect(() => {
      // Initialize refs array
      cardRefs.current = cardRefs.current.slice(0, childArr.length);

      // Position cards initially
      positionCards();

      // Notify initial active index
      onActiveIndexChange?.(orderRef.current[0]);

      // Start autoplay
      intervalRef.current = window.setInterval(swap, delay);

      // Pause on hover
      if (pauseOnHover && containerRef.current) {
        const node = containerRef.current;
        node.addEventListener("mouseenter", pause);
        node.addEventListener("mouseleave", resume);

        return () => {
          node.removeEventListener("mouseenter", pause);
          node.removeEventListener("mouseleave", resume);
          if (intervalRef.current) clearInterval(intervalRef.current);
          timelineRef.current?.kill();
        };
      }

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        timelineRef.current?.kill();
      };
    }, [childArr.length, positionCards, swap, delay, pauseOnHover, pause, resume, onActiveIndexChange]);

    // ========== Render Cards ==========
    const renderedCards = childArr.map((child, i) =>
      isValidElement<CardProps>(child)
        ? cloneElement(child, {
            key: i,
            ref: (el: HTMLDivElement | null) => {
              cardRefs.current[i] = el;
            },
            style: { width, height, ...(child.props.style ?? {}) },
            onClick: (e: React.MouseEvent<HTMLDivElement>) => {
              child.props.onClick?.(e);
              onCardClick?.(i);
              bringToFront(i);
            },
            onMouseEnter: () => handleCardHover(i, true),
            onMouseLeave: () => handleCardHover(i, false),
          } as CardProps & React.RefAttributes<HTMLDivElement>)
        : child
    );

    return (
      <div
        ref={containerRef}
        className={[
          "absolute perspective-[900px] overflow-visible",
          placement === "right"
            ? "bottom-0 right-0 transform translate-x-[5%] translate-y-[20%] origin-bottom-right md:scale-100 sm:scale-[0.75] scale-[0.6]"
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center md:scale-100 sm:scale-[0.85] scale-[0.7]",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ width, height }}
      >
        {renderedCards}
      </div>
    );
  }
);

CardSwap.displayName = "CardSwap";

export default CardSwap;
