import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

export const useTheme = () => {
  const [tema, setTema] = useState<string>(
    () => (localStorage.getItem("theme") as ThemeMode) ?? "light",
  );
  useEffect(() => {
    localStorage.setItem("theme", tema);
  }, [tema]);

  const setThemeDark = () => setTema("dark");
  const setThemeLight = () => setTema("light");
  const toggleTheme = () =>
    setTema((prev) => (prev === "dark" ? "light" : "dark"));

  return { tema, setThemeDark, setThemeLight, toggleTheme };
};
