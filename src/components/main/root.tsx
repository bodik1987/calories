import { ReactNode, useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDataStore, useUIStore } from "../../store/useStore";
import useLocalStorage from "../../hooks/useLocalStorage";
import { ISelectedProduct, Item } from "../../types";
import { SEEDS } from "../../seeds";
import List from "./list";
import AddWeight from "./add-weight";
import Product from "./product";
import EditSelectedProduct from "./edit-selected-product";
import { ChewronUpIcon, NoDataIcon } from "../ui/icons";
import BottomSheet from "../ui/bottom-sheet";
import Alert from "../ui/alert";
import { calculateCalories } from "../../utils/calculateCalories";

export default function Root() {
  const { day, setDay } = useDataStore();
  const { openBottomSheet, setOpenBottomSheet, contentKey, setContentKey } =
    useUIStore();

  // List
  const [showAlert, setShowAlert] = useState(false);
  const [showAdditionalWeightAlert, setShowAdditionalWeightAlert] =
    useState(false);
  const [showDeleteItemAlert, setShowDeleteItemAlert] = useState(false);

  const [items, setItems] = useLocalStorage<Item[]>("items", SEEDS);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProduct | null>(null);

  const handleClose = () => {
    setOpenBottomSheet(false);
    setSearchQuery("");
  };

  // AddWeight
  const [productWeight, setProductWeight] = useState("");
  const [additionalWeight, setAdditionalWeight] = useState("");
  const [selectedProductWeight, setSelectedProductWeight] = useState(
    selectedProduct ? selectedProduct.weight : "",
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedItem && productWeight) {
      const newProduct = {
        id: uuidv4(),
        product: selectedItem,
        weight: productWeight,
      };

      setDay([...day, newProduct]);

      setProductWeight("");
      setSelectedProduct(null);
      setSearchQuery("");
      setShowFavorites(false);
      handleClose();
    }
  };

  // Edit item
  const handleSetShowAlert = () => {
    setOpenBottomSheet(false);
    setShowAlert(true);
  };

  const handleUpdateItem = useCallback(
    (updatedItem: Item) => {
      setItems((prev) =>
        prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
      );
      handleClose();
    },
    [setItems],
  );

  const handleDeleteItem = useCallback(
    (id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
      handleClose();
    },
    [setItems],
  );

  const handleAddItem = useCallback(
    (newItem: Item) => {
      setItems((prev) => [...prev, newItem]);
      setSearchQuery(newItem.title);
      handleClose();
    },
    [setItems],
  );

  // Edit selected product
  const handleSetShowDeleteItemAlert = () => {
    setOpenBottomSheet(false);
    setShowDeleteItemAlert(true);
  };

  const handleSetShowAdditionalWeightAlert = () => {
    setOpenBottomSheet(false);
    setShowAdditionalWeightAlert(true);
  };

  const handleUpdateSelectedProduct = useCallback(() => {
    if (selectedProduct) {
      setDay(
        day.map((item) =>
          item.id === selectedProduct.id
            ? { ...item, weight: selectedProductWeight } // Обновление веса только для редактируемого продукта
            : item,
        ),
      );

      setSelectedProductWeight(""); // Очистка веса после обновления
      handleClose(); // Закрытие модального окна
    }
  }, [selectedProduct, selectedProductWeight, setDay, day]);

  const handleAddAdditionalWeightToSelectedProduct = useCallback(() => {
    if (selectedProduct) {
      setDay(
        day.map((item) =>
          item.id === selectedProduct.id
            ? {
                ...item,
                weight: (
                  Number(selectedProductWeight) + Number(additionalWeight)
                ).toString(),
              }
            : item,
        ),
      );

      setAdditionalWeight("");
      handleClose(); // Закрытие модального окна
    }
  }, [selectedProduct, selectedProductWeight, additionalWeight, setDay, day]);

  const handleDeleteSelectedProduct = useCallback(
    (id: string) => {
      setDay(day.filter((item) => item.id !== id));
      setSelectedProduct(null);
    },
    [setDay, day],
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
        setOpenBottomSheet={setOpenBottomSheet}
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
        setShowAlert={handleSetShowDeleteItemAlert}
      />
    ),
    editSelectedProduct: (
      <EditSelectedProduct
        selectedProduct={selectedProduct}
        selectedProductWeight={selectedProductWeight}
        setSelectedProductWeight={setSelectedProductWeight}
        handleUpdateSelectedProduct={handleUpdateSelectedProduct}
        setShowAlert={handleSetShowAlert}
        setShowAdditionalWeightAlert={handleSetShowAdditionalWeightAlert}
      />
    ),
    addNewProduct: (
      <Product onAddItem={handleAddItem} searchQuery={searchQuery} />
    ),
  };

  return (
    <div className="pb-18">
      <Alert
        open={showAlert}
        handleClose={() => setShowAlert(false)}
        alertText="Удалить выбранный продукт?"
        confirmButtonText="Удалить"
        onConfirm={() => handleDeleteSelectedProduct(selectedProduct!.id)}
        onCancel={() => setShowAlert(false)}
      />

      <Alert
        open={showDeleteItemAlert}
        handleClose={() => setShowDeleteItemAlert(false)}
        alertText="Удалить из списка продуктов?"
        confirmButtonText="Удалить"
        onConfirm={() => handleDeleteItem(selectedItem!.id)}
        onCancel={() => setShowDeleteItemAlert(false)}
      />

      <Alert
        open={showAdditionalWeightAlert}
        handleClose={() => setShowAdditionalWeightAlert(false)}
        alertText="Добавить вес к имеющемуся?"
        confirmButtonText="Добавить"
        onConfirm={() => handleAddAdditionalWeightToSelectedProduct()}
        onCancel={() => setShowAdditionalWeightAlert(false)}
        content={
          <input
            value={additionalWeight}
            onChange={(e) => setAdditionalWeight(e.target.value)}
            placeholder="Вес"
            type="number"
            className="input-number mt-6 w-full!"
            autoComplete="off"
            spellCheck="false"
            autoFocus
          />
        }
      />

      <BottomSheet
        open={openBottomSheet}
        onClose={handleClose}
        modalContent={modalContent}
        contentKey={contentKey}
      />

      <div key={JSON.stringify(day)} className="h-full relative">
        {day.length === 0 && (
          <div className="fixed top-1/2 inset-x-0 flex flex-col justify-center items-center -translate-y-1/2">
            <NoDataIcon />
            <p className="mt-6 text-accent">Здесь пока ничего нет</p>
          </div>
        )}

        {day.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setContentKey("editSelectedProduct");
              setSelectedProduct(item);
              setOpenBottomSheet(true);
            }}
            className="list"
          >
            <p className="w-full">{item.product.title}</p>

            <div className="flex gap-2">
              <span className="w-12 text-right whitespace-nowrap opacity-50">
                {item.weight} г.
              </span>
              <span className="w-12 text-right whitespace-nowrap">
                {calculateCalories(item.weight, item.product.calories)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setOpenBottomSheet(true);
          setContentKey("list");
        }}
        className={`fixed bottom-6 right-4 button w-12! h-12! active:scale-95 transition-transform aspect-square bg-accent text-white shadow z-10`}
        aria-label="Добавить"
      >
        <ChewronUpIcon />
      </button>
    </div>
  );
}
