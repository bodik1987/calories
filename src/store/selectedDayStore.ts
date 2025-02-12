import { create } from "zustand";

type Store = {
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  open: boolean;
  // contentKey: "list";
  contentKey: string;
  setOpen: (value: boolean) => void;
  setContentKey: (value: string) => void;
};

// Функция для получения значения из localStorage с указанием значения по умолчанию
const getLocalStorage = (key: string, defaultValue: number): number => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? parseInt(storedValue, 10) : defaultValue;
};

// Создание zustand-хранилища
export const useStore = create<Store>((set) => ({
  selectedDay: getLocalStorage("lastPage", 1), // Получение значения из localStorage
  setSelectedDay: (day: number) => {
    localStorage.setItem("lastPage", day.toString()); // Сохранение значения в localStorage
    set(() => ({ selectedDay: day })); // Обновление состояния
  },
  open: false,
  contentKey: "",
  setOpen: (value) => set({ open: value }),
  setContentKey: (value) => set({ contentKey: value }),
}));
