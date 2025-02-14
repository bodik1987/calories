import { useDataStore, useUIStore } from "../../store/useStore";
import { ChewronUpIcon } from "../ui/icons";

export default function Footer() {
  const today = new Date().getDate();
  const isTodayOdd = today % 2 !== 0;

  const { selectedDay, setSelectedDay } = useDataStore();
  const { setOpenBottomSheet, setContentKey } = useUIStore();

  return (
    <footer className="fixed bottom-0 inset-x-0 pt-3 pb-8 bg-panel/70 backdrop-blur-md dark:bg-dark-panel select-none border-t border-accent/5">
      <div className="container h-full flex items-center justify-around gap-4 px-4">
        {[1, 2].map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            aria-label="День"
            className={`w-full button !h-11 ${
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
          onClick={() => {
            setOpenBottomSheet(true);
            setContentKey("list");
          }}
          className="px-6 button !h-11 bg-accent dark:bg-dark-accent text-white z-10"
          aria-label="Добавить"
        >
          <ChewronUpIcon />
        </button>
      </div>
    </footer>
  );
}
