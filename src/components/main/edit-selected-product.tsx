import { useEffect } from "react";
import { ISelectedProduct } from "../../types";
import { DeleteIcon, PlusIcon } from "../ui/icons";
import { calculateCalories } from "../../utils/calculateCalories";

type EditSelectedProductProps = {
  selectedProduct: ISelectedProduct | null;
  selectedProductWeight: string;
  setSelectedProductWeight: React.Dispatch<React.SetStateAction<string>>;
  handleUpdateSelectedProduct: () => void;
  setShowAlert: () => void;
  setShowAdditionalWeightAlert: () => void;
};

export default function EditSelectedProduct({
  selectedProduct,
  selectedProductWeight,
  setSelectedProductWeight,
  handleUpdateSelectedProduct,
  setShowAlert,
  setShowAdditionalWeightAlert,
}: EditSelectedProductProps) {
  // Установка веса продукта при изменении выбранного продукта
  useEffect(() => {
    if (selectedProduct) {
      setSelectedProductWeight(selectedProduct.weight);
    }
  }, [selectedProduct, setSelectedProductWeight]);

  return (
    <div className="p-4">
      <h2>{selectedProduct?.product.title}</h2>
      <div className="mt-1 text-base text-neutral-700 dark:text-[#5C5C5C]">
        {selectedProduct?.product.description && (
          <p className="opacity-50 dark:opacity-80">
            {selectedProduct?.product.description}
          </p>
        )}

        <div className="mt-2">
          <span>{selectedProduct?.product.calories} </span>
          <span className="text-sm">кКал / 100г</span>

          {selectedProduct?.weight && (
            <span className="font-medium">
              {" = "}
              {calculateCalories(
                selectedProduct.weight,
                selectedProduct.product.calories
              )}{" "}
              кКал
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={setShowAlert}
          className="button rounded-button"
          aria-label="Удалить продукт"
        >
          <DeleteIcon />
        </button>

        <div className="flex gap-0.5">
          <input
            value={selectedProductWeight}
            onChange={(e) => setSelectedProductWeight(e.target.value)}
            placeholder="Вес"
            type="number"
            className="input-number rounded-r-none!"
            autoComplete="off"
            spellCheck="false"
            autoFocus
          />

          <button
            onClick={setShowAdditionalWeightAlert}
            className="button rounded-button pl-1! pr-2! rounded-l-none!"
            aria-label="Удалить продукт"
          >
            <PlusIcon />
          </button>
        </div>

        <button
          onClick={handleUpdateSelectedProduct}
          disabled={!selectedProductWeight}
          className="button primary-button"
        >
          Обновить
        </button>
      </div>
    </div>
  );
}
