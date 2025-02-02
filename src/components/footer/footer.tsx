import { useStore } from "../../store/selectedDayStore";
import { PlusIcon } from "../ui/icons";

export default function Footer() {
  const today = new Date().getDate();
  const { selectedDay, setSelectedDay, setOpen } = useStore();

  const isTodayOdd = today % 2 !== 0;

  return (
    <footer className="fixed bottom-0 inset-x-0 h-16 bg-panel dark:bg-dark-panel select-none">
      <div className="container h-full flex items-center justify-around gap-4 px-4">
        {[1, 2].map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            aria-label="День"
            className={`w-full button ${
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
        <button
          onClick={() => setOpen(true)}
          className="button w-12 aspect-square bg-accent dark:bg-dark-accent text-white z-10"
          aria-label="Добавить"
        >
          <PlusIcon />
        </button>
      </div>
    </footer>
  );
}
