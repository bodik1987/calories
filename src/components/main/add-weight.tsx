import { useCallback } from "react";
import { Item } from "../../types";
import { DotsIcon } from "../ui/icons";

type AddWeightProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  selectedItem: Item | undefined;
  productWeight: string;
  setProductWeight: React.Dispatch<React.SetStateAction<string>>;
  setContentKey: React.Dispatch<React.SetStateAction<string>>;
};

export default function AddWeight({
  handleSubmit,
  selectedItem,
  productWeight,
  setProductWeight,
  setContentKey,
}: AddWeightProps) {
  const getSelectedProductCalorits = useCallback(
    (weight: string | undefined, itemCalories: string | undefined) => {
      const result = ((Number(weight) / 100) * Number(itemCalories)).toFixed(0);
      return result;
    },
    []
  );

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2>{selectedItem?.title}</h2>
          <p className="mt-1">
            <span>{selectedItem?.calories} </span>
            <span className="text-sm">кКал / 100г</span>

            {productWeight ? (
              <span className="font-medium">
                {" = "}
                {getSelectedProductCalorits(
                  productWeight,
                  selectedItem?.calories
                )}{" "}
              </span>
            ) : (
              ""
            )}
          </p>
        </div>

        <button onClick={() => setContentKey("editItem")}>
          <DotsIcon />
        </button>
      </div>

      <div className="mt-4 flex gap-3">
        <input
          value={productWeight}
          onChange={(e) => setProductWeight(e.target.value)}
          placeholder="Вес"
          type="number"
          autoComplete="off"
          spellCheck="false"
          className="input-number"
          autoFocus
        />
        <button
          type="submit"
          disabled={!productWeight}
          className="button primary-button"
        >
          Добавить
        </button>
      </div>
    </form>
  );
}
