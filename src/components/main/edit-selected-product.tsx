import { useCallback, useEffect } from "react";
import { ISelectedProduct } from "../../types";
import { DeleteIcon } from "../ui/icons";

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
  const getSelectedProductCalorits = useCallback(
    (weight: string | undefined, itemCalories: string | undefined) => {
      const result = ((Number(weight) / 100) * Number(itemCalories)).toFixed(0);
      return result;
    },
    []
  );

  useEffect(() => {
    selectedProduct && setSelectedProductWeight(selectedProduct.weight);
  }, [selectedProduct]);

  return (
    <div className="p-4">
      <h2>{selectedProduct?.product.title}</h2>
      <p className="mt-1 text-base text-neutral-700">
        <span>{selectedProduct?.product.calories} </span>
        <span className="text-sm">кКал / 100г</span>

        {selectedProduct?.weight ? (
          <span className="font-medium">
            {" = "}
            {getSelectedProductCalorits(
              selectedProduct.weight,
              selectedProduct?.product.calories
            )}{" "}
          </span>
        ) : (
          ""
        )}
      </p>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => handleDeleteSelectedProduct(selectedProduct!.id)}
          className="button bg-white w-11 aspect-square text-accent"
        >
          <DeleteIcon />
        </button>

        <input
          value={selectedProductWeight}
          onChange={(e) => setSelectedProductWeight(e.target.value)}
          placeholder="Вес"
          type="number"
          className="!w-24 text-center"
          autoComplete="off"
          spellCheck="false"
          autoFocus
        />

        <button
          onClick={handleUpdateSelectedProduct}
          disabled={!selectedProductWeight}
          className="button bg-accent disabled:bg-accent/50 text-white w-full"
        >
          Обновить
        </button>
      </div>
    </div>
  );
}
