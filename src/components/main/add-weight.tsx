import { Item } from "../../types";
import { calculateCalories } from "../../utils/calculateCalories";
import { DotsIcon } from "../ui/icons";

type AddWeightProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  selectedItem: Item | undefined;
  productWeight: string;
  setProductWeight: React.Dispatch<React.SetStateAction<string>>;
  setContentKey: (value: string) => void;
};

export default function AddWeight({
  handleSubmit,
  selectedItem,
  productWeight,
  setProductWeight,
  setContentKey,
}: AddWeightProps) {
  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="flex justify-between items-start gap-3">
        <div>
          <h2>{selectedItem?.title}</h2>
          {selectedItem?.description && (
            <p className="opacity-50">{selectedItem?.description}</p>
          )}

          <p className="mt-2">
            <span>{selectedItem?.calories} </span>
            <span className="text-sm">kcal / 100 g</span>

            {productWeight && (
              <span className="font-medium">
                {" = "}
                {calculateCalories(productWeight, selectedItem?.calories)} kcal
              </span>
            )}
          </p>
        </div>

        <button type="button" onClick={() => setContentKey("editItem")}>
          <DotsIcon />
        </button>
      </div>

      <div className="flex gap-3 mt-4">
        <input
          value={productWeight}
          onChange={(e) => setProductWeight(e.target.value)}
          placeholder="Waga"
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
          Dodaj
        </button>
      </div>
    </form>
  );
}
