import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IDay, IUserMeasurements } from "../types";

interface AppState {
  day: IDay;
  setDay: (day: IDay) => void;
  userMeasurements: IUserMeasurements;
  setUserMeasurements: (measurements: IUserMeasurements) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      day: { productsToEat: [] },
      setDay: (day) => set({ day }),
      userMeasurements: { weight: "80", age: "37" },
      setUserMeasurements: (userMeasurements) => set({ userMeasurements }),
    }),
    {
      name: "app-storage", // имя для localStorage
    }
  )
);
