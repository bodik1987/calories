import { useStore } from "../../store/selectedDayStore";
import { ChewronUpIcon } from "../ui/icons";

export default function Footer() {
  const today = new Date().getDate();
  const { selectedDay, setSelectedDay, setOpen, setContentKey } = useStore();

  const isTodayOdd = today % 2 !== 0;

  return (
    <footer className="fixed bottom-0 inset-x-0 pt-3 pb-8 bg-panel/70 backdrop-blur-md dark:bg-dark-panel select-none border-t border-accent/5">
      <div className="container h-full flex items-center justify-around gap-4 pl-4 pr-7">
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
            setOpen(true);
            setContentKey("list");
          }}
          className="ml-5 button w-12 aspect-square bg-accent dark:bg-dark-accent text-white z-10"
          aria-label="Добавить"
        >
          <ChewronUpIcon />
        </button>
      </div>
    </footer>
  );
}
