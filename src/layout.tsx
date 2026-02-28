import { useEffect } from "react";
import Header from "./components/header/header";
import Root from "./components/main/root";

export default function Layout() {
  useEffect(() => {
    const setViewportHeight = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`,
      );
    };

    setViewportHeight();
    window.visualViewport?.addEventListener("resize", setViewportHeight);
    window.addEventListener("orientationchange", setViewportHeight);

    return () => {
      window.visualViewport?.removeEventListener("resize", setViewportHeight);
      window.removeEventListener("orientationchange", setViewportHeight);
    };
  }, []);

  return (
    <main
      className="antialiased flex flex-col"
      style={{ height: `calc(var(--vh, 1vh) * 100)` }}
    >
      <Header />
      <Root />
    </main>
  );
}
