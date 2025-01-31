import { ReactNode, useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useSelectedDayStore } from "../../store/selectedDayStore";
import { ISelectedProduct, Item } from "../../types";
import { SEEDS } from "../../seeds";
import List from "./list";
import AddWeight from "./add-weight";
import Product from "./product";
import Modal from "../ui/modal";
import { PlusIcon } from "../ui/icons";
import EditSelectedProduct from "./edit-selected-product";
import { useAppStore } from "../../store/useAppStore";

export default function Main() {
  const { day, setDay } = useAppStore();
  const { selectedDay } = useSelectedDayStore();

  const [open, setOpen] = useState(false);
  const [contentKey, setContentKey] = useState("list");

  const handleClose = () => {
    setOpen(false);
    setContentKey("list");
  };

  // List
  const [items, setItems] = useLocalStorage<Item[]>("items", SEEDS);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProduct | null>(null);

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
    (id: string) => setItems((prev) => prev.filter((item) => item.id !== id)),
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

  // Edit delected product
  const handleUpdateSelectedProduct = useCallback(() => {
    if (selectedProduct) {
      setDay({
        ...day,
        productsToEat: day.productsToEat.map((item) =>
          item.id === selectedProduct.id
            ? { ...item, weight: selectedProductWeight }
            : item
        ),
      });

      handleClose();
      setSelectedProductWeight("");
    }
  }, [selectedProduct, productWeight, setDay]);

  const handleDeleteSelectedProduct = useCallback(
    (id: string) => {
      setDay({
        ...day,
        productsToEat: day.productsToEat.filter((item) => item.id !== id),
      });

      handleClose();
      setSelectedProduct(null);
    },
    [setDay]
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
      <Modal
        open={open}
        handleClose={handleClose}
        modalContent={modalContent}
        contentKey={contentKey}
      />
      <section
        key={JSON.stringify(day)}
        className="pb-16 w-full overflow-y-auto max-w-md mx-auto relative"
      >
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
