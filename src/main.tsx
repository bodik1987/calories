import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Функция для обновления метатега theme-color
const updateThemeColor = (isDarkMode: boolean) => {
  const themeColor = isDarkMode ? "#161616" : "#F3F4F9"; // Цвет для тёмной и светлой темы
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute("content", themeColor);
  }
};

// Наблюдение за изменением класса "dark" у <html>
const observeThemeChanges = () => {
  const observer = new MutationObserver(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    updateThemeColor(isDarkMode);
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
};

// Запускаем наблюдатель за изменением темы
observeThemeChanges();

createRoot(document.getElementById("root")!).render(<App />);
