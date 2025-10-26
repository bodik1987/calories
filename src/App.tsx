import { useEffect } from "react";
import Header from "./components/header/header";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";

export default function App() {
  useEffect(() => {
    const setViewportHeight = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
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
      className="antialiased min-h-dvh grid grid-rows-[auto_1fr_auto]"
      style={{ height: `calc(var(--vh, 1vh) * 100)` }}
    >
      <Header />
      <Main />
      <Footer />
    </main>
  );
}
