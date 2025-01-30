import { ReactNode, useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PlusIcon } from "../ui/icons";
import Tray from "../ui/tray";
import useLocalStorage from "../../hooks/useLocalStorage";
import { IDay, Item } from "../../types";
import { SEEDS } from "../../seeds";
import List from "./list";
import AddWeight from "./add-weight";
import { useSelectedDayStore } from "../../store/selectedDayStore";

export default function Main() {
  const [open, setOpen] = useState(false);
  const { selectedDay } = useSelectedDayStore();

  const [day, setDay] = useLocalStorage<IDay>("day", {
    productsToEat: [],
  });

  console.log(day);

  const [contentKey, setContentKey] = useState("list");

  // List
  const [items] = useLocalStorage<Item[]>("items", SEEDS);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);

  // AddWeight
  const [productWeight, setProductWeight] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (selectedItem && productWeight) {
        const newProduct = {
          id: uuidv4(),
          day: selectedDay,
          product: selectedItem,
          weight: productWeight,
        };

        setDay((prevDay) => ({
          ...prevDay,
          productsToEat: [...prevDay.productsToEat, newProduct],
        }));

        setProductWeight("");
        setSearchQuery("");
        setShowFavorites(false);
        setOpen(false);
      }
    },
    [selectedItem, productWeight, selectedDay, setDay]
  );

  const trayContent: Record<string, ReactNode> = {
    list: (
      <List
        items={items}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showFavorites={showFavorites}
        setContentKey={setContentKey}
        setSelectedItem={setSelectedItem}
        setOpen={setOpen}
      />
    ),
    addWeight: (
      <AddWeight
        handleSubmit={handleSubmit}
        selectedItem={selectedItem}
        productWeight={productWeight}
        setProductWeight={setProductWeight}
        setContentKey={setContentKey}
      />
    ),
    editSelectedProduct: (
      <List
        items={items}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showFavorites={showFavorites}
        setContentKey={setContentKey}
        setSelectedItem={setSelectedItem}
        setOpen={setOpen}
      />
    ),
    addNewProduct: (
      <AddWeight
        handleSubmit={handleSubmit}
        selectedItem={selectedItem}
        productWeight={productWeight}
        setProductWeight={setProductWeight}
        setContentKey={setContentKey}
      />
    ),
  };

  return (
    <>
      <Tray
        open={open}
        setOpen={setOpen}
        trayContent={trayContent}
        contentKey={contentKey}
      />
      <section className="mt-[104px] mb-[64px] w-full max-w-md mx-auto relative">
        <button
          onClick={() => setOpen(true)}
          className="absolute button w-14 !h-14 bottom-4 right-4 bg-accent text-white z-10"
          aria-label="Добавить"
        >
          <PlusIcon />
        </button>
      </section>
    </>
  );
}
