import useCheckConnection from "../../hooks/useCheckConnection";
import useLocalStorage from "../../hooks/useLocalStorage";
import { IDay, IUserMeasurements } from "../../types";
import { MeasurementsIcon, NetworkOffIcon, NetworkOnIcon } from "../ui/icons";
import Totals from "./totals";

type HeaderProps = {};

export default function Header({}: HeaderProps) {
  const isOnline = useCheckConnection();
  const [userMeasurements] = useLocalStorage<IUserMeasurements>(
    "userMeasurements",
    {
      weight: "80",
      age: "37",
    }
  );

  const [day] = useLocalStorage<IDay>("day", { productsToEat: [] });

  return (
    <header className="row-start-1 bg-panel p-3 select-none">
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
            // onClick={cleanDay}
            className="button px-5 ml-auto bg-accent-2"
            aria-label="Очистить"
          >
            Очистить
          </button>
        </div>

        <Totals day={day} userMeasurements={userMeasurements} />
      </div>
    </header>
  );
}
