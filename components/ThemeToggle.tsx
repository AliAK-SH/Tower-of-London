"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark-mode");
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggle}
      className="fixed top-4 left-4 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-surface-card border border-border-default text-text-body hover:text-text-primary transition-all"
      aria-label="Toggle theme"
    >
      {dark ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
