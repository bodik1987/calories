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
import Product from "./product";
import Modal from "../ui/modal";

export default function Main() {
  const [open, setOpen] = useState(false);
  const { selectedDay } = useSelectedDayStore();

  const [day, setDay] = useLocalStorage<IDay>("day", {
    productsToEat: [],
  });

  const [contentKey, setContentKey] = useState("list");

  // List
  const [items, setItems] = useLocalStorage<Item[]>("items", SEEDS);
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

  const handleUpdateItem = useCallback(
    (updatedItem: Item) => {
      setItems((prev) =>
        prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
      setContentKey("list");
    },
    [setItems]
  );

  const handleDeleteItem = useCallback(
    (id: string) => setItems((prev) => prev.filter((item) => item.id !== id)),
    [setItems]
  );

  const handleAddItem = useCallback(
    (newItem: Item) => {
      setItems((prev) => [...prev, newItem]);
      setSearchQuery(newItem.title);
    },
    [setItems]
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
    editProduct: (
      <Product
        item={selectedItem}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
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
    addNewProduct: <Product onAddItem={handleAddItem} />,
  };

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        trayContent={trayContent}
        contentKey={contentKey}
        setContentKey={setContentKey}
      />
      <section className="pb-16 w-full overflow-y-auto max-w-md mx-auto relative">
        {day.productsToEat
          .filter((el) => el.day === selectedDay)
          .map((item) => (
            <div
              key={item.id}
              //onClick={() => handleEditProduct(item)}
              className="list"
            >
              <p className="w-full">{item.product.title}</p>

              <div className="flex gap-3">
                <span className="w-12 text-right whitespace-nowrap text-neutral-500">
                  {item.weight} г.
                </span>
                <span className="w-12 text-right whitespace-nowrap">
                  {(
                    (Number(item.weight) / 100) *
                    Number(item.product.calories)
                  ).toFixed(0)}
                </span>
              </div>
            </div>
          ))}
        <button
          onClick={() => setOpen(true)}
          className="fixed button w-14 !h-14 bottom-20 right-4 bg-accent text-white z-10"
          aria-label="Добавить"
        >
          <PlusIcon />
        </button>
      </section>
    </>
  );
}
