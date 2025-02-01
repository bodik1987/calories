import { useSelectedDayStore } from "../../store/selectedDayStore";

export default function Footer() {
  const today = new Date().getDate();
  const { selectedDay, setSelectedDay } = useSelectedDayStore();

  const isTodayOdd = today % 2 !== 0;

  return (
    <footer className="fixed bottom-0 inset-x-0 h-16 bg-panel dark:bg-dark-panel select-none">
      <div className="container h-full flex items-center justify-around">
        {[1, 2].map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            aria-label="День"
            className={`w-1/3 button ${
              selectedDay === day && "bg-accent dark:bg-dark-accent text-white"
            } text-accent dark:text-neutral-50`}
          >
            {day === 1
              ? isTodayOdd
                ? "Сегодня"
                : "Завтра"
              : isTodayOdd
              ? "Завтра"
              : "Сегодня"}
          </button>
        ))}
      </div>
    </footer>
  );
}
