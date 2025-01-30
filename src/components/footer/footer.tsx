import { useSelectedDayStore } from "../../store/selectedDayStore";

type FooterProps = {};

export default function Footer({}: FooterProps) {
  const date = new Date();
  const today = date.getDate();
  const { selectedDay, setSelectedDay } = useSelectedDayStore();
  return (
    <footer className="row-start-3 h-16 bg-panel">
      <div className="h-full max-w-md mx-auto flex items-center justify-around">
        <button
          onClick={() => setSelectedDay(1)}
          aria-label="День"
          className={`w-1/3 button ${
            selectedDay === 1 &&
            location.pathname === "/" &&
            "bg-accent text-white"
          }`}
        >
          {today % 2 !== 0 ? "Сегодня" : "Завтра"}
        </button>

        <button
          onClick={() => {
            setSelectedDay(2);
          }}
          aria-label="День"
          className={`w-1/3 button ${
            selectedDay === 2 &&
            location.pathname === "/" &&
            "bg-accent text-white"
          }`}
        >
          {today % 2 === 0 ? "Сегодня" : "Завтра"}
        </button>
      </div>
    </footer>
  );
}
