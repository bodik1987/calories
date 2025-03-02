import { useDataStore, useUIStore } from "../../store/useStore";
import { ChewronUpIcon } from "../ui/icons";

export default function Footer() {
  const today = new Date().getDate();
  const isTodayOdd = today % 2 !== 0;

  const { selectedDay, setSelectedDay } = useDataStore();
  const { setOpenBottomSheet, setContentKey, setOpenNotesPage } = useUIStore();

  return (
    <footer className="fixed bottom-0 inset-x-0 pt-3 pb-8 bg-panel/70 backdrop-blur-md dark:bg-dark-panel select-none border-t border-accent/5">
      <div className="container h-full flex items-center justify-around gap-4 px-3">
        <div className="w-full bg-white dark:bg-white/5 rounded-full p-2 flex">
          {[1, 2].map((day) => (
            <button
              key={day}
              onClick={() => {
                setSelectedDay(day);
                setOpenNotesPage(false);
              }}
              aria-label="День"
              className={`w-full button !h-11 ${
                selectedDay === day &&
                "bg-accent dark:bg-dark-accent !text-white"
              } text-accent dark:text-neutral-400`}
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

        <button
          onClick={() => {
            setOpenBottomSheet(true);
            setContentKey("list");
          }}
          className="button !w-14 aspect-square !h-14 bg-accent dark:bg-dark-accent text-white z-10"
          aria-label="Добавить"
        >
          <ChewronUpIcon />
        </button>
      </div>
    </footer>
  );
}
