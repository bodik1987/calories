import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./layout.tsx";
import Root from "./components/main/root.tsx";
import Editor from "./components/editor/editor.tsx";
import "./index.css";

// Функция для обновления метатега theme-color
const updateThemeColor = (isDarkMode: boolean) => {
  const themeColor = isDarkMode ? "#161616" : "#F3F4FA"; // Цвет для тёмной и светлой темы
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

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Root />} />
        <Route path="/notes" element={<Editor />} />
        <Route
          path="/shopping-list"
          element={<section className="p-4">Shopping-list</section>}
        />
      </Route>
    </Routes>
  </BrowserRouter>,
);
