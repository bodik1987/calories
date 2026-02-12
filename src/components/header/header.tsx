import { ReactNode, useState } from "react";
import { useDataStore } from "../../store/useStore";
import { Item, IUserMeasurements } from "../../types";
import Alert from "../ui/alert";
import BottomSheet from "../ui/bottom-sheet";
import { MeasurementsIcon, NetworkOffIcon, NetworkOnIcon } from "../ui/icons";
import ThemeToggle from "../ui/theme-toggle";
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
  const caloriesText = remainingCalories > 0 ? "Ост. " : "Превыш. ";
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
        <h2>Настройки профиля</h2>

        <div className="mt-4 w-full flex items-end gap-3">
          <div className="flex flex-col">
            <label className="ml-3">Возраст</label>
            <input
              type="number"
              value={age}
              onChange={(e) =>
                handleUserMeasurementsChange("age", e.target.value)
              }
              placeholder="Возраст"
              className="text-center mt-1"
            />
          </div>
          <div className="flex flex-col">
            <label className="ml-3">Вес</label>
            <input
              type="number"
              value={weight}
              onChange={(e) =>
                handleUserMeasurementsChange("weight", e.target.value)
              }
              placeholder="Вес (кг)"
              className="text-center mt-1"
            />
          </div>
          <ThemeToggle />

          <button
            onClick={() => setModalContentKey("sync")}
            className="button rounded-button"
            aria-label="Синхронизация"
          >
            {isOnline ? <NetworkOnIcon /> : <NetworkOffIcon />}
          </button>
        </div>

        <div className="mt-4 ml-auto">
          {day.length !== 0 && (
            <button
              onClick={() => setShowAlert(true)}
              className="button px-5 bg-white dark:bg-[#282828] dark:text-neutral-50"
              aria-label="Очистить"
            >
              Очистить день
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
        alertText="Очистить список продуктов в этот день?"
        onConfirm={cleanDay}
        onCancel={() => setShowAlert(false)}
        confirmButtonText="Очистить"
      />
      <BottomSheet
        open={isModalOpen}
        onClose={handleClose}
        modalContent={modalContent}
        contentKey={modalContentKey}
      />
      <header className="sticky top-2 inset-x-0 w-fit mx-auto flex justify-around items-center gap-2 bg-white/50 backdrop-blur-lg dark:bg-dark-panel/70 dark:border-transparent pl-4 pr-3 py-1.5 border border-gray-200 font-bold rounded-full select-none shadow z-10 mb-2">
        <div className="flex flex-col">
          <div className="px-1 flex justify-between items-center dark:text-neutral-100">
            <p>
              {`${totalCalories.toFixed(0)} из ${target.toFixed(0)}`} {" / "}
              {caloriesText}
              <span className={`${caloriesClassName}`}>
                {remainingCalories} <small>ккал</small>
              </span>
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <div className="mt-2 bg-panel dark:bg-neutral-700 h-1.5 w-full rounded-full overflow-hidden">
              <div
                className={`${progressBarColor} h-full rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => handleButtonClick("userMeasurements")}
          className="text-accent dark:text-white"
        >
          <MeasurementsIcon />
        </button>
      </header>
      <div className="fixed z-5 top-0 inset-x-0 bg-linear-to-b from-white dark:from-dark-panel/70 to-transparent h-18" />
    </>
  );
}
