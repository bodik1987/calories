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
      <div className="mt-1 text-neutral-700 text-base">
        {selectedProduct?.product.description && (
          <p className="opacity-50">{selectedProduct?.product.description}</p>
        )}

        <div className="mt-2">
          <span>{selectedProduct?.product.calories} </span>
          <span className="text-sm">kcal / 100 g</span>

          {selectedProduct?.weight && (
            <span className="font-medium">
              {" = "}
              {calculateCalories(
                selectedProduct.weight,
                selectedProduct.product.calories,
              )}{" "}
              kcal
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={setShowAlert}
          className="rounded-button button"
          aria-label="Usunąć produkt"
        >
          <DeleteIcon />
        </button>

        <div className="flex gap-0.5">
          <input
            value={selectedProductWeight}
            onChange={(e) => setSelectedProductWeight(e.target.value)}
            placeholder="Waga"
            type="number"
            className="rounded-r-none! input-number"
            autoComplete="off"
            spellCheck="false"
            autoFocus
          />

          <button
            onClick={setShowAdditionalWeightAlert}
            className="pr-2! pl-1! rounded-button rounded-l-none! button"
            aria-label="Dodać wagę"
          >
            <PlusIcon />
          </button>
        </div>

        <button
          onClick={handleUpdateSelectedProduct}
          disabled={!selectedProductWeight}
          className="button primary-button"
        >
          Aktualizować
        </button>
      </div>
    </div>
  );
}
