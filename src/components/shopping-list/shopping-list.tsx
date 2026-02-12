import { useState } from "react";
import { productsList } from "../../seeds";
import useLocalStorage from "../../hooks/useLocalStorage";
import {
  CheckedIcon,
  DotsIcon,
  PlusIcon,
  ShopingListIcon,
  UncheckedIcon,
} from "../ui/icons";
import Alert from "../ui/alert";

type Product = {
  id: number;
  name: string;
  checked: boolean;
};

const STORAGE_KEY = "shopping-list";

export default function ShoppingList() {
  const [items, setItems] = useLocalStorage<Product[]>(
    STORAGE_KEY,
    productsList,
  );
  const [newItemName, setNewItemName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showResetAlert, setShowResetAlert] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const addItem = () => {
    const name = newItemName.trim();
    if (!name) return;

    setItems((prev) => [...prev, { id: Date.now(), name, checked: true }]);
    setNewItemName("");
  };

  const handleDeleteSelectedProduct = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedProduct(null);
    setShowAlert(false);
  };

  const confirmRemoveItem = (item: Product) => {
    setSelectedProduct(item);
    setShowAlert(true);
  };

  const handleConfirmReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setItems(productsList);
    setShowResetAlert(false);
  };

  const resetList = () => {
    setShowResetAlert(true);
  };

  const sortedItems = [...items].sort((a, b) => {
    if (a.checked !== b.checked) return a.checked ? -1 : 1;
    return a.name.localeCompare(b.name, "ru", { sensitivity: "base" });
  });

  return (
    <>
      <Alert
        open={showAlert}
        handleClose={() => setShowAlert(false)}
        alertText="Удалить выбранный продукт?"
        confirmButtonText="Удалить"
        onConfirm={() =>
          selectedProduct && handleDeleteSelectedProduct(selectedProduct.id)
        }
        onCancel={() => setShowAlert(false)}
      />

      <Alert
        open={showResetAlert}
        handleClose={() => setShowResetAlert(false)}
        alertText="Восстановить список покупок?"
        confirmButtonText="Ок"
        onConfirm={handleConfirmReset}
        onCancel={() => setShowResetAlert(false)}
      />

      <section className="pb-18 dark:bg-[#282828]">
        <div className="px-3 pt-4 flex gap-3">
          <button
            onClick={resetList}
            className="button rounded-button bg-[#F3F4FA]! dark:bg-dark-panel!"
          >
            <ShopingListIcon />
          </button>

          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addItem()}
            placeholder="Добавить..."
            className="bg-[#F3F4FA]! dark:bg-dark-panel! px-2 py-1 flex-1"
          />

          <button
            onClick={addItem}
            disabled={!newItemName.trim()}
            className="button rounded-button bg-[#F3F4FA]! dark:bg-dark-panel!"
          >
            <PlusIcon />
          </button>
        </div>

        <div>
          {sortedItems.map((item) => (
            <div key={item.id} className="list justify-between w-full">
              <div
                className="flex gap-4 items-center cursor-pointer flex-1"
                onClick={() => toggleItem(item.id)}
              >
                {item.checked ? <CheckedIcon /> : <UncheckedIcon />}
                <p className={`${item.checked ? "" : "opacity-60"} w-full`}>
                  {item.name}
                </p>
              </div>

              <button
                onClick={() => confirmRemoveItem(item)}
                aria-label="Удалить"
              >
                <DotsIcon />
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
