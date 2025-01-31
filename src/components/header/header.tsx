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

export default function Header() {
  const { day, setDay, userMeasurements, setUserMeasurements } = useAppStore();
  const { selectedDay } = useSelectedDayStore();
  const isOnline = useCheckConnection();

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
      <Modal
        open={open}
        handleClose={handleClose}
        modalContent={modalContent}
        contentKey={contentKey}
      />

      <header className="sticky z-10 top-0 inset-x-0 row-start-1 bg-panel p-3 select-none">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setContentKey("userMeasurements");
                setOpen(true);
              }}
              className="button w-11 bg-accent-2"
              aria-label="Замеры"
            >
              <MeasurementsIcon />
            </button>
            <button
              onClick={() => {
                setContentKey("sync");
                setOpen(true);
              }}
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
    </>
  );
}
