import { useEffect, useState } from "react";
import { ISelectedProduct } from "../../types";
import { DeleteIcon } from "../ui/icons";
import Alert from "../ui/alert";
import { calculateCalories } from "../../utils/calculateCalories";

type EditSelectedProductProps = {
  selectedProduct: ISelectedProduct | null;
  selectedProductWeight: string;
  setSelectedProductWeight: React.Dispatch<React.SetStateAction<string>>;
  handleDeleteSelectedProduct: (id: string) => void;
  handleUpdateSelectedProduct: () => void;
};

export default function EditSelectedProduct({
  selectedProduct,
  selectedProductWeight,
  setSelectedProductWeight,
  handleDeleteSelectedProduct,
  handleUpdateSelectedProduct,
}: EditSelectedProductProps) {
  const [showAlert, setShowAlert] = useState(false);

  // Установка веса продукта при изменении выбранного продукта
  useEffect(() => {
    if (selectedProduct) {
      setSelectedProductWeight(selectedProduct.weight);
    }
  }, [selectedProduct, setSelectedProductWeight]);

  return (
    <>
      <Alert
        open={showAlert}
        handleClose={() => setShowAlert(false)}
        alertText="Удалить выбранный продукт?"
        confirmButtonText="Удалить"
        onConfirm={() => handleDeleteSelectedProduct(selectedProduct!.id)}
        onCancel={() => setShowAlert(false)}
      />

      <div className="p-4">
        <h2>{selectedProduct?.product.title}</h2>
        <p className="mt-1 text-base text-neutral-700 dark:text-[#5C5C5C]">
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
        </p>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => setShowAlert(true)}
            className="button rounded-button"
            aria-label="Удалить продукт"
          >
            <DeleteIcon />
          </button>

          <input
            value={selectedProductWeight}
            onChange={(e) => setSelectedProductWeight(e.target.value)}
            placeholder="Вес"
            type="number"
            className="input-number"
            autoComplete="off"
            spellCheck="false"
            autoFocus
          />

          <button
            onClick={handleUpdateSelectedProduct}
            disabled={!selectedProductWeight}
            className="button primary-button"
          >
            Обновить
          </button>
        </div>
      </div>
    </>
  );
}
