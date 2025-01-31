import { ReactNode, useState } from "react";
import useCheckConnection from "../../hooks/useCheckConnection";
import { IUserMeasurements } from "../../types";
import { MeasurementsIcon, NetworkOffIcon, NetworkOnIcon } from "../ui/icons";
import Totals from "./totals";
import Sync from "./sync/sync";
import UserMeasurements from "./user-measurements";
import Modal from "../ui/modal";
import { useAppStore } from "../../store/useAppStore";
import { useSelectedDayStore } from "../../store/selectedDayStore";
import Alert from "../ui/alert";

export default function Header() {
  const { day, setDay, userMeasurements, setUserMeasurements } = useAppStore();
  const { selectedDay } = useSelectedDayStore();
  const isOnline = useCheckConnection();

  const [showAlert, setShowAlert] = useState(false);

  const [open, setOpen] = useState(false);
  const [contentKey, setContentKey] = useState("userMeasurements");

  const handleClose = () => {
    setOpen(false);
    setContentKey("userMeasurements");
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
      <Modal
        open={open}
        handleClose={handleClose}
        modalContent={modalContent}
        contentKey={contentKey}
      />

      <header className="sticky z-10 top-0 inset-x-0 bg-panel px-4 py-3 select-none">
        <div className="container">
          <div className="flex items-center gap-3 text-accent">
            <button
              onClick={() => {
                setContentKey("userMeasurements");
                setOpen(true);
              }}
              className="button rounded-button"
              aria-label="Замеры"
            >
              <MeasurementsIcon />
            </button>
            <button
              onClick={() => {
                setContentKey("sync");
                setOpen(true);
              }}
              className="button rounded-button"
              aria-label="Синхронизация"
            >
              {isOnline ? <NetworkOnIcon /> : <NetworkOffIcon />}
            </button>

            {day.productsToEat.length > 0 && (
              <button
                onClick={() => setShowAlert(true)}
                className="button px-5 ml-auto bg-white"
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
