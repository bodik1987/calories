import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IDay, IUserMeasurements } from "../types";

interface LocalDataState {
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  day: IDay;
  setDay: (day: IDay) => void;
  userMeasurements: IUserMeasurements;
  setUserMeasurements: (measurements: IUserMeasurements) => void;
}

interface UiState {
  openBottomSheet: boolean;
  setOpenBottomSheet: (value: boolean) => void;
  contentKey: string;
  setContentKey: (value: string) => void;
}

// Стор для хранения локальных данных
export const useDataStore = create<LocalDataState>()(
  persist(
    (set) => ({
      // Выбранный день
      selectedDay: 1,
      setSelectedDay: (day) => {
        set({ selectedDay: day });
      },

      // Продукты за день
      day: { productsToEat: [] },
      setDay: (day) => set({ day }),

      // Замеры пользователя
      userMeasurements: { weight: "80", age: "37" },
      setUserMeasurements: (userMeasurements) => set({ userMeasurements }),
    }),
    {
      name: "app-storage",
    }
  )
);

// Стор для хранения UI состояний
export const useUIStore = create<UiState>((set) => ({
  // Нижнее меню
  openBottomSheet: false,
  setOpenBottomSheet: (value: boolean) => set({ openBottomSheet: value }),

  // Ключ содержимого нижнего меню
  contentKey: "",
  setContentKey: (value: string) => set({ contentKey: value }),
}));
