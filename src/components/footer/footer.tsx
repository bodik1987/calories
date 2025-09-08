import { useDataStore, useUIStore } from "../../store/useStore";
import { ChewronUpIcon } from "../ui/icons";

export default function Footer() {
  const today = new Date().getDate();
  const isTodayOdd = today % 2 !== 0;

  const { selectedDay, setSelectedDay } = useDataStore();
  const { setOpenBottomSheet, setContentKey, setOpenNotesPage } = useUIStore();

  const getLabel = (day: number) => {
    if (day === 1) {
      return isTodayOdd ? "Сегодня" : "Завтра";
    } else {
      return isTodayOdd ? "Завтра" : "Сегодня";
    }
  };

  const activeLabel = getLabel(selectedDay);

  return (
    <footer className="fixed bottom-0 inset-x-0 pt-3 pb-8 bg-panel/70 backdrop-blur-md dark:bg-dark-panel select-none border-t border-accent/5">
      <div className="container h-full flex items-center justify-around gap-4 px-3">
        {/* Контейнер табов с padding */}
        <div className="relative w-full bg-white dark:bg-white/5 rounded-full flex items-center py-2">
          {/* Абсолютный ползунок */}
          <div
            className="absolute rounded-full transition-all"
            style={{
              width: `calc(50% - 0.5rem)`, // ширина минус padding
              height: "calc(100% - 0.5rem)", // высота минус padding
              top: "0.25rem", // центрирование по вертикали
              left: selectedDay === 1 ? "0.25rem" : "calc(50% + 0.25rem)", // центрирование с учётом padding
              backgroundColor:
                activeLabel === "Завтра"
                  ? "transparent"
                  : "var(--color-accent)",
              border: "2px solid var(--color-accent)",
            }}
          />

          {[1, 2].map((day) => {
            const label = getLabel(day);
            const isActive = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => {
                  setSelectedDay(day);
                  setOpenNotesPage(false);
                }}
                aria-label="День"
                className={`relative z-10 w-full button !h-10 transition-all ${
                  isActive
                    ? label === "Завтра"
                      ? "text-accent dark:text-white"
                      : "!text-white !text-xl"
                    : "text-accent dark:text-neutral-400"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            setOpenBottomSheet(true);
            setContentKey("list");
          }}
          className="button !w-12 !h-12 active:scale-95 transition-transform aspect-square bg-accent text-white z-10"
          aria-label="Добавить"
        >
          <ChewronUpIcon />
        </button>
      </div>
    </footer>
  );
}
