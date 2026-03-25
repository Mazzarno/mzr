"use client";
import React from "react";
import { LinkProps } from "next/link";

export const TransitionContext = React.createContext<{
  startTransition: (to: string) => void;
  isTransitioning: boolean;
}>({ startTransition: () => {}, isTransitioning: false });

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export default function TransitionLink({ href, children, className, ...props }: TransitionLinkProps) {
  const { startTransition, isTransitioning } = React.useContext(TransitionContext);
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const hrefValue = typeof href === "string" ? href : href.toString();
    const isExternal =
      hrefValue.startsWith("http") ||
      hrefValue.startsWith("mailto:") ||
      hrefValue.startsWith("tel:");
    const isModifiedClick =
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;

    if (isTransitioning) {
      e.preventDefault();
      return;
    }

    if (props.onClick) {
      props.onClick(e);
    }
    if (e.defaultPrevented) return;

    if (props.target === "_blank" || isExternal || isModifiedClick) {
      return;
    }

    e.preventDefault();
    startTransition(hrefValue);
  };
  return (
    <a href={typeof href === "string" ? href : href.toString()} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
