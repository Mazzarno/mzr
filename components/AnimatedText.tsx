"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(TextPlugin);

type AnimatedTextProps = {
  translationKey: string;
};

export default function AnimatedText({ translationKey }: AnimatedTextProps) {
  
  const t = useTranslations();
  const textRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState("");
  useEffect(() => {
    setDisplayText(t(translationKey));
  }, [translationKey, t]);

  useEffect(() => {
    if (!textRef.current) return;
    gsap.fromTo(
      textRef.current,
      { text: "" }, 
      {
        duration: 0.5,
        text: displayText,
        ease: "none",
      }
    );
  }, [displayText]);

  return <span ref={textRef}></span>;
}
