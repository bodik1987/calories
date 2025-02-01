import Header from "./components/header/header";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";

export default function App() {
  return (
    <main className="antialiased min-h-dvh grid grid-rows-[auto_1fr_auto]">
      <Header />
      <Main />
      <Footer />
    </main>
  );
}
