import { ReactNode, useState } from "react";
import useCheckConnection from "../../hooks/useCheckConnection";
import { IUserMeasurements } from "../../types";
import { MeasurementsIcon, NetworkOffIcon, NetworkOnIcon } from "../ui/icons";
import Totals from "./totals";
import Sync from "./sync/sync";
import UserMeasurements from "./user-measurements";
import { useAppStore } from "../../store/useAppStore";
import Alert from "../ui/alert";
import ThemeToggle from "../ui/theme-toggle";
import { useStore } from "../../store/selectedDayStore";
import VaulDrawer from "../ui/vaul";

export default function Header() {
  const { day, setDay, userMeasurements, setUserMeasurements } = useAppStore();
  const { selectedDay } = useStore();
  const isOnline = useCheckConnection();

  const [showAlert, setShowAlert] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContentKey, setModalContentKey] = useState("userMeasurements");

  const handleClose = () => {
    setModalOpen(false);
    setModalContentKey("userMeasurements");
  };

  const handleUserMeasurementsChange = (
    field: keyof IUserMeasurements,
    value: string
  ) => {
    setUserMeasurements({ ...userMeasurements, [field]: value });
  };

  const modalContent: Record<string, ReactNode> = {
    userMeasurements: (
      <UserMeasurements
        userMeasurements={userMeasurements}
        handleUserMeasurementsChange={handleUserMeasurementsChange}
      />
    ),
    sync: <Sync />,
  };

  const cleanDay = () => {
    setDay({
      productsToEat: day.productsToEat.filter((el) => el.day !== selectedDay),
    });
  };

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
      <VaulDrawer
        open={isModalOpen}
        onClose={handleClose}
        modalContent={modalContent}
        contentKey={modalContentKey}
      />

      <header className="sticky z-10 top-0 inset-x-0 bg-panel/70 backdrop-blur-sm dark:bg-dark-panel px-4 py-3 select-none shadow-lg">
        <div className="container">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleButtonClick("userMeasurements")}
              className="button rounded-button"
              aria-label="Замеры"
            >
              <MeasurementsIcon />
            </button>
            <button
              onClick={() => handleButtonClick("sync")}
              className="button rounded-button"
              aria-label="Синхронизация"
            >
              {isOnline ? <NetworkOnIcon /> : <NetworkOffIcon />}
            </button>

            <ThemeToggle />

            {day.productsToEat.filter((el) => el.day === selectedDay).length >
              0 && (
              <button
                onClick={() => setShowAlert(true)}
                className="button px-5 ml-auto bg-white dark:bg-[#282828] dark:text-neutral-50"
                aria-label="Очистить"
              >
                Очистить
              </button>
            )}
          </div>

          <Totals
            day={day}
            selectedDay={selectedDay}
            userMeasurements={userMeasurements}
          />
        </div>
      </header>
    </>
  );
}
