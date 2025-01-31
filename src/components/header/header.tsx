import { useCallback } from "react";
import useCheckConnection from "../../hooks/useCheckConnection";
import useLocalStorage from "../../hooks/useLocalStorage";
import { IDay, IUserMeasurements } from "../../types";
import { MeasurementsIcon, NetworkOffIcon, NetworkOnIcon } from "../ui/icons";
import Totals from "./totals";
import { useSelectedDayStore } from "../../store/selectedDayStore";

export default function Header() {
  const { selectedDay } = useSelectedDayStore();
  const isOnline = useCheckConnection();
  const [userMeasurements] = useLocalStorage<IUserMeasurements>(
    "userMeasurements",
    {
      weight: "80",
      age: "37",
    }
  );

  const [day, setDay] = useLocalStorage<IDay>("day", { productsToEat: [] });

  const cleanDay = useCallback(
    () =>
      setDay({
        productsToEat: day.productsToEat.filter((el) => el.day !== selectedDay),
      }),
    [day.productsToEat, selectedDay, setDay]
  );

  return (
    <header className="sticky z-10 top-0 inset-x-0 row-start-1 bg-panel p-3 select-none">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3">
          <button
            // onClick={() => setIsUserMeasurementsOpen(true)}
            className="button w-11 bg-accent-2"
            aria-label="Замеры"
          >
            <MeasurementsIcon />
          </button>
          <button
            // onClick={() => setIsSyncOpen(true)}
            className="button w-11 bg-accent-2"
            aria-label="Синхронизация"
          >
            {isOnline ? <NetworkOnIcon /> : <NetworkOffIcon />}
          </button>

          <button
            onClick={cleanDay}
            className="button px-5 ml-auto bg-accent-2"
            aria-label="Очистить"
          >
            Очистить
          </button>
        </div>

        <Totals
          day={day}
          selectedDay={selectedDay}
          userMeasurements={userMeasurements}
        />
      </div>
    </header>
  );
}
