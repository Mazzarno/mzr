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
}

export default function TransitionLink({ href, children, className, ...props }: TransitionLinkProps) {
  const { startTransition, isTransitioning } = React.useContext(TransitionContext);
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTransitioning) {
      e.preventDefault();
      return;
    }
    if (props.onClick) {
      props.onClick(e);
    }
    e.preventDefault();
    startTransition(typeof href === "string" ? href : href.toString());
  };
  return (
    <a href={typeof href === "string" ? href : href.toString()} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
