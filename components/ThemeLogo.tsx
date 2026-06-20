"use client";
import { useEffect, useState } from "react";

export default function ThemeLogo({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark-mode"));
    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains("dark-mode"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <img
      src={dark ? "/LogoWhite.png" : "/LogoBlack.png"}
      alt="University Logo"
      className={className}
      style={style}
    />
  );
}
