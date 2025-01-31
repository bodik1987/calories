import { useSelectedDayStore } from "../../store/selectedDayStore";

type FooterProps = {};

export default function Footer({}: FooterProps) {
  const date = new Date();
  const today = date.getDate();
  const { selectedDay, setSelectedDay } = useSelectedDayStore();
  return (
    <footer className="fixed bottom-0 inset-x-0 h-16 bg-panel dark:bg-dark-panel select-none">
      <div className="container h-full font-medium flex items-center justify-around">
        <button
          onClick={() => setSelectedDay(1)}
          aria-label="День"
          className={`w-1/3 button ${
            selectedDay === 1 &&
            location.pathname === "/" &&
            "bg-accent dark:bg-dark-accent text-white"
          } text-accent dark:text-neutral-50`}
        >
          {today % 2 !== 0 ? "Сегодня" : "Завтра"}
        </button>

        <button
          onClick={() => setSelectedDay(2)}
          aria-label="День"
          className={`w-1/3 button ${
            selectedDay === 2 &&
            location.pathname === "/" &&
            "bg-accent dark:bg-dark-accent text-white"
          } text-accent dark:text-neutral-50`}
        >
          {today % 2 === 0 ? "Сегодня" : "Завтра"}
        </button>
      </div>
    </footer>
  );
}
