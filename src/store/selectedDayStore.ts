import { create } from "zustand";

type Store = {
  selectedDay: number;
  setSelectedDay: (day: number) => void;
};

// Функция для получения значения из localStorage с указанием значения по умолчанию
const getLocalStorage = (key: string, defaultValue: number): number => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? parseInt(storedValue, 10) : defaultValue;
};

// Создание zustand-хранилища
export const useSelectedDayStore = create<Store>((set) => ({
  selectedDay: getLocalStorage("lastPage", 1), // Получение значения из localStorage
  setSelectedDay: (day: number) => {
    localStorage.setItem("lastPage", day.toString()); // Сохранение значения в localStorage
    set(() => ({ selectedDay: day })); // Обновление состояния
  },
}));
