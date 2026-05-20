import { ReactNode, useState } from "react";
import { useDataStore } from "../../store/useStore";
import { Item, IUserMeasurements } from "../../types";
import Alert from "../ui/alert";
import BottomSheet from "../ui/bottom-sheet";
import { MeasurementsIcon, NetworkOffIcon, NetworkOnIcon } from "../ui/icons";
import Sync from "./sync/sync";
import useCheckConnection from "../../hooks/useCheckConnection";

export default function Header() {
  const { day, userMeasurements, setDay, setUserMeasurements } = useDataStore();

  const calculateTotalCalories = (day: { product: Item; weight: string }[]) => {
    return day.reduce((total, item) => {
      const calories =
        (Number(item.weight) / 100) * Number(item.product.calories);
      return total + calories;
    }, 0);
  };

  const totalCalories = calculateTotalCalories(day);

  // Расчет целевого количества калорий
  const target =
    88 +
    13 * Number(userMeasurements.weight) +
    4.2 * 178 -
    5.7 * Number(userMeasurements.age);

  // Расчет оставшихся калорий
  const remainingCalories = Math.round(target - totalCalories);

  // Форматирование текста в зависимости от оставшихся калорий
  const caloriesText = remainingCalories > 0 ? "Pozostało " : "Przewyższenie ";
  const caloriesClassName = remainingCalories < 0 && "text-warning";

  const progressPercentage = Math.min((totalCalories / target) * 100, 100);
  const progressBarColor =
    progressPercentage > 80
      ? "bg-warning"
      : progressPercentage > 70
        ? "bg-orange-500"
        : "bg-accent";

  const { age, weight } = userMeasurements;

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContentKey, setModalContentKey] = useState("userMeasurements");

  const isOnline = useCheckConnection();

  const [showAlert, setShowAlert] = useState(false);

  const cleanDay = () => setDay([]);

  const handleUserMeasurementsChange = (
    field: keyof IUserMeasurements,
    value: string,
  ) => {
    setUserMeasurements({ ...userMeasurements, [field]: value });
  };

  const modalContent: Record<string, ReactNode> = {
    userMeasurements: (
      <div className="p-4">
        <h2>Ustawienia profilu</h2>

        <div className="flex items-end gap-3 mt-4 w-full">
          <div className="flex flex-col">
            <label className="ml-3">Wiek</label>
            <input
              type="number"
              value={age}
              onChange={(e) =>
                handleUserMeasurementsChange("age", e.target.value)
              }
              placeholder="Wiek"
              className="mt-1 text-center"
            />
          </div>
          <div className="flex flex-col">
            <label className="ml-3">Waga</label>
            <input
              type="number"
              value={weight}
              onChange={(e) =>
                handleUserMeasurementsChange("weight", e.target.value)
              }
              placeholder="Waga (kg)"
              className="mt-1 text-center"
            />
          </div>

          <button
            onClick={() => setModalContentKey("sync")}
            className="rounded-button button"
            aria-label="Synchronizacja"
          >
            {isOnline ? <NetworkOnIcon /> : <NetworkOffIcon />}
          </button>
        </div>

        <div className="mt-4 ml-auto">
          {day.length !== 0 && (
            <button
              onClick={() => setShowAlert(true)}
              className="bg-white px-5 button"
              aria-label="Resetuj"
            >
              Resetuj dzień
            </button>
          )}
        </div>
      </div>
    ),
    sync: <Sync />,
  };

  const handleClose = () => setModalOpen(false);

  const handleButtonClick = (key: string) => {
    setModalContentKey(key);
    setModalOpen(true);
  };

  return (
    <>
      <Alert
        open={showAlert}
        handleClose={() => setShowAlert(false)}
        alertText="Czy na pewno chcesz wyczyścić listę produktów na ten dzień?"
        onConfirm={cleanDay}
        onCancel={() => setShowAlert(false)}
        confirmButtonText="Wyczyść"
      />
      <BottomSheet
        open={isModalOpen}
        onClose={handleClose}
        modalContent={modalContent}
        contentKey={modalContentKey}
      />
      <header className="top-2 z-10 sticky inset-x-0 flex justify-around items-center gap-2 bg-white/50 shadow backdrop-blur-lg mx-auto mb-2 py-1.5 pr-3 pl-4 border border-gray-200 rounded-full w-fit font-bold select-none">
        <div className="flex flex-col">
          <div className="flex justify-between items-center px-1">
            <p>
              {`${totalCalories.toFixed(0)} z ${target.toFixed(0)}`} {" / "}
              {caloriesText}
              <span className={`${caloriesClassName}`}>
                {remainingCalories} <small>kcal</small>
              </span>
            </p>
          </div>
          <div className="flex items-center gap-3 px-2">
            <div className="bg-panel mt-2 rounded-full w-full h-1.5 overflow-hidden">
              <div
                className={`${progressBarColor} h-full rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => handleButtonClick("userMeasurements")}
          className="text-accent"
        >
          <MeasurementsIcon />
        </button>
      </header>
      <div className="top-0 z-5 fixed inset-x-0 bg-linear-to-b from-white to-transparent h-18" />
    </>
  );
}
