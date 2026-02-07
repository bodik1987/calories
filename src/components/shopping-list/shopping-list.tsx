import { useState } from "react";
import { productsList } from "../../seeds";
import useLocalStorage from "../../hooks/useLocalStorage";
import { CheckedIcon, DotsIcon, PlusIcon, UncheckedIcon } from "../ui/icons";

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

    setItems((prev) => [...prev, { id: Date.now(), name, checked: false }]);

    setNewItemName("");
  };

  const confirmRemoveItem = (id: number) => {
    if (!window.confirm("Удалить этот продукт?")) return;

    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const resetList = () => {
    const ok = window.confirm(
      "Восстановить список покупок?\nВсе текущие изменения будут удалены.",
    );
    if (!ok) return;

    localStorage.removeItem(STORAGE_KEY);
    setItems(productsList);
  };

  const sortedItems = [...items].sort((a, b) => {
    if (a.checked !== b.checked) {
      return a.checked ? -1 : 1;
    }

    return a.name.localeCompare(b.name, "ru", { sensitivity: "base" });
  });

  return (
    <section>
      <h1
        className="text-xl mb-4 px-4 mt-4 cursor-pointer select-none"
        onClick={resetList}
        title="Восстановить исходный список"
      >
        Список покупок
      </h1>

      {/* добавление */}
      <div className="px-3 mb-4 flex gap-2">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder="Новый продукт"
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

      {/* список */}
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
              onClick={() => confirmRemoveItem(item.id)}
              aria-label="Удалить"
            >
              <DotsIcon />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
