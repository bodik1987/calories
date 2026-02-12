import { NavLink, useLocation } from "react-router";
import { useUIStore } from "../../store/useStore";
import { AppIcon, ChewronUpIcon, ShopingListIcon } from "../ui/icons";

export default function Footer() {
  const { pathname } = useLocation();
  const { setOpenBottomSheet, setContentKey } = useUIStore();

  return (
    <>
      <button
        onClick={() => {
          setOpenBottomSheet(true);
          setContentKey("list");
        }}
        className={`${pathname === "/shopping-list" && "hidden!"} fixed bottom-18 right-4 button w-12! h-12! active:scale-95 transition-transform aspect-square bg-accent text-white shadow z-10`}
        aria-label="Добавить"
      >
        <ChewronUpIcon />
      </button>

      <footer className="fixed bottom-3 inset-x-0 w-fit mx-auto flex justify-around items-center gap-2 bg-white/50 backdrop-blur-lg dark:bg-dark-panel/70 dark:border-transparent px-1 py-1 border border-gray-200 text-xs font-bold rounded-full select-none shadow z-10">
        <NavLink
          to={"/"}
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
                ? "flex flex-col items-center bg-blue-50 dark:bg-accent/50 text-accent dark:text-white rounded-full px-4 py-[3px]"
                : "flex flex-col items-center px-4 py-[3px]"
          }
        >
          <AppIcon />
          Калории
        </NavLink>

        <NavLink
          to={"/shopping-list"}
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
                ? "flex flex-col items-center bg-blue-50 dark:bg-accent/50 text-accent dark:text-white rounded-full px-4 py-[3px]"
                : "flex flex-col items-center px-4 py-[3px]"
          }
        >
          <ShopingListIcon />
          Купить
        </NavLink>
      </footer>
      <div className="fixed z-5 bottom-0 inset-x-0 bg-linear-to-t from-white/90 dark:from-dark-panel/70 to-transparent h-18" />
    </>
  );
}
