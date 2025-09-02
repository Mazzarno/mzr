import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";
import Image from "next/image";

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  placement?: "right" | "center";
  children: ReactNode;
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
        "absolute rounded-4xl top-1/2 left-1/2 [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden]",
        variant === "client"
          ? "bg-neutral/10 backdrop-blur-xs scrollbar-hide shadow-[0px_0px_10px_6px_rgba(0,_0,_0,_0.1)] will-change-transform will-change-opacity"
          : "",
        customClass ?? "",
        rest.className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Vignette sweep like ClientLayout */}
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
          <div className="absolute top-0 left-0 w-auto h-[47px] flex items-center justify-between text-neutral-content bg-neutral pr-2 pl-1 rounded-br-[20px] z-70 cursor-grab">
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
        <div className="absolute w-full h-3 bottom-0 bg-neutral z-[999] touch-none" />
        <div className="absolute h-full w-3 right-0 bg-neutral z-[999] touch-none" />
        <div className="absolute h-full w-3 left-0 bg-neutral z-[999] touch-none" />
        <div className="absolute w-full h-3 top-0 bg-neutral z-[999] touch-none" />
        {/* Bottom-left corner */}
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
        {/* Top-right corner (hidden on xs like layout) */}
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
        {/* Content slot */}
        <div className="relative w-full h-full rounded-4xl overflow-hidden">
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              unoptimized
              sizes="(max-width: 768px) 75vw, 500px"
              className="object-cover select-none pointer-events-none"
              priority={false}
            />
          )}
          <div className="relative z-10 w-full h-full">{children}</div>
        </div>
      </div>
    </div>
  )
);
Card.displayName = "Card";

type CardRef = RefObject<HTMLDivElement | null>;
interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number
): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  placement = "right",
  children,
}) => {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(
    () => Children.toArray(children) as ReactElement<CardProps>[],
    [children]
  );
  const refs = useMemo<CardRef[]>(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    [childArr]
  );

  const order = useRef<number[]>(
    Array.from({ length: childArr.length }, (_, i) => i)
  );

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | undefined>(undefined);
  const container = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) =>
      placeNow(
        r.current!,
        makeSlot(i, cardDistance, verticalDistance, total),
        skewAmount
      )
    );

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current!;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current!;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
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
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(
        refs.length - 1,
        cardDistance,
        verticalDistance,
        refs.length
      );
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return"
      );
      tl.set(elFront, { x: backSlot.x, z: backSlot.z }, "return");
      tl.to(
        elFront,
        {
          y: backSlot.y,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return"
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current!;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e) => {
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
            onCardClick?.(i);
          },
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  return (
    <div
      ref={container}
      className={[
        "absolute perspective-[900px] overflow-visible",
        placement === "right"
          ? "bottom-0 right-0 transform translate-x-[5%] translate-y-[20%] origin-bottom-right max-[768px]:translate-x-[25%] max-[768px]:translate-y-[25%] max-[768px]:scale-[0.75] max-[480px]:translate-x-[25%] max-[480px]:translate-y-[25%] max-[480px]:scale-[0.55]"
          : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center max-[768px]:scale-[0.8] max-[480px]:scale-[0.65]",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
