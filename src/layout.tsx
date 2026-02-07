import { useEffect } from "react";
import { Outlet } from "react-router";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

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
      <section className="flex-1 overflow-y-auto pb-24">
        <Outlet />
      </section>
      <Footer />
    </main>
  );
}
