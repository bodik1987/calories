import { ReactNode, useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useAppStore } from "../../store/useAppStore";
import { ISelectedProduct, Item } from "../../types";
import { SEEDS } from "../../seeds";
import List from "./list";
import AddWeight from "./add-weight";
import Product from "./product";
import EditSelectedProduct from "./edit-selected-product";
import { NoDataIcon } from "../ui/icons";
import { useStore } from "../../store/selectedDayStore";
import VaulDrawer from "../ui/vaul";

export default function Main() {
  const { day, setDay } = useAppStore();
  const { selectedDay, open, setOpen } = useStore();

  const [contentKey, setContentKey] = useState("list");

  // List
  const [items, setItems] = useLocalStorage<Item[]>("items", SEEDS);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProduct | null>(null);

  const handleClose = () => {
    setOpen(false);
    setContentKey("list");
    setSearchQuery("");
  };

  // AddWeight
  const [productWeight, setProductWeight] = useState("");
  const [selectedProductWeight, setSelectedProductWeight] = useState(
    selectedProduct ? selectedProduct.weight : ""
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedItem && productWeight) {
      const newProduct = {
        id: uuidv4(),
        day: selectedDay,
        product: selectedItem,
        weight: productWeight,
      };

      setDay({
        ...day,
        productsToEat: [...day.productsToEat, newProduct],
      });

      setProductWeight("");
      setSelectedProduct(null);
      setSearchQuery("");
      setShowFavorites(false);
      handleClose();
    }
  };

  // Edit item
  const handleUpdateItem = useCallback(
    (updatedItem: Item) => {
      setItems((prev) =>
        prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
      handleClose();
    },
    [setItems]
  );

  const handleDeleteItem = useCallback(
    (id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
      handleClose();
    },
    [setItems]
  );

  const handleAddItem = useCallback(
    (newItem: Item) => {
      setItems((prev) => [...prev, newItem]);
      setSearchQuery(newItem.title);
      handleClose();
    },
    [setItems]
  );

  // Edit selected product
  const handleUpdateSelectedProduct = useCallback(() => {
    if (selectedProduct) {
      setDay({
        ...day,
        productsToEat: day.productsToEat.map((item) =>
          item.id === selectedProduct.id
            ? { ...item, weight: selectedProductWeight } // Обновление веса только для редактируемого продукта
            : item
        ),
      });

      setSelectedProductWeight(""); // Очистка веса после обновления
      handleClose(); // Закрытие модального окна
    }
  }, [selectedProduct, selectedProductWeight, setDay, day]);

  const handleDeleteSelectedProduct = useCallback(
    (id: string) => {
      setDay({
        ...day,
        productsToEat: day.productsToEat.filter((item) => item.id !== id),
      });

      handleClose();
      setSelectedProduct(null);
    },
    [setDay, day]
  );

  const modalContent: Record<string, ReactNode> = {
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
    editItem: (
      <Product
        item={selectedItem}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
      />
    ),
    editSelectedProduct: (
      <EditSelectedProduct
        selectedProduct={selectedProduct}
        selectedProductWeight={selectedProductWeight}
        setSelectedProductWeight={setSelectedProductWeight}
        handleDeleteSelectedProduct={handleDeleteSelectedProduct}
        handleUpdateSelectedProduct={handleUpdateSelectedProduct}
      />
    ),
    addNewProduct: <Product onAddItem={handleAddItem} />,
  };

  return (
    <>
      <VaulDrawer
        open={open}
        onClose={handleClose}
        modalContent={modalContent}
        contentKey={contentKey}
      />
      <section
        key={JSON.stringify(day)}
        className="container pt-2 pb-[92px] w-full overflow-y-auto relative"
      >
        {day.productsToEat.filter((el) => el.day === selectedDay).length ===
          0 && (
          <div className="flex flex-col justify-center items-center h-full">
            <NoDataIcon />
            <p className="mt-6 text-accent dark:text-neutral-50">
              Здесь пока ничего нет
            </p>
          </div>
        )}

        {day.productsToEat
          .filter((el) => el.day === selectedDay)
          .map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setContentKey("editSelectedProduct");
                setSelectedProduct(item);
                setOpen(true);
              }}
              className="list"
            >
              <p className="w-full">{item.product.title}</p>

              <div className="flex gap-3">
                <span className="w-12 text-right whitespace-nowrap opacity-50">
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
      </section>
    </>
  );
}
