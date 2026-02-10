"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

const THEME_SWITCHING_MS = 100;

const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({
  theme: "dark",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const initial = stored === "light" || stored === "dark" ? stored : "dark";
    setThemeState(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const setTheme = useCallback((t: Theme) => {
    const html = document.documentElement;
    html.classList.add("theme-switching");
    setThemeState(t);
    html.classList.toggle("dark", t === "dark");
    localStorage.setItem("theme", t);
    setTimeout(() => html.classList.remove("theme-switching"), THEME_SWITCHING_MS);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
