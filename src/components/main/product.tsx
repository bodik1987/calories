import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Item } from "../../types";
import { DeleteIcon, FavoriteIcon } from "../ui/icons";

type Props = {
  item?: Item;
  onComplete?: () => void;
  onAddItem?: (newItem: Item) => void;
  onUpdateItem?: (updatedItem: Item) => void;
  setShowAlert?: () => void;
  searchQuery?: string;
};

export default function Product({
  item,
  onComplete,
  onAddItem,
  onUpdateItem,
  setShowAlert,
  searchQuery,
}: Props) {
  const [title, setTitle] = useState(
    searchQuery ? searchQuery : item?.title || "",
  );
  const [calories, setCalories] = useState(item?.calories || "");
  const [isFavorite, setIsFavorite] = useState(item?.isFavorite || false);
  const [description, setDescription] = useState(item?.description || "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newItem: Item = {
      id: item?.id || uuidv4(),
      title,
      calories,
      isFavorite,
      description,
    };

    item ? onUpdateItem?.(newItem) : onAddItem?.(newItem);

    setTitle("");
    setCalories("");
    setIsFavorite(false);
    setDescription("");
    onComplete?.();
  };

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center pl-1">
        <h2>{item ? "Edytuj" : "Dodaj produkt"}</h2>
        <button
          type="button"
          onClick={toggleFavorite}
          className="rounded-button button"
        >
          <FavoriteIcon active={isFavorite} />
        </button>
      </div>

      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="flex gap-1 mt-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nazwa*"
            autoComplete="off"
            spellCheck="false"
            className="px-5 rounded-r-none! h-14!"
            autoFocus
          />
          <input
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="kcal*"
            autoComplete="off"
            className="rounded-l-none! h-14! input-number"
            spellCheck="false"
            type="number"
          />
        </div>

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Opis"
          autoComplete="off"
          spellCheck="false"
          className="opacity-80 mt-2 px-5 text-base!"
        />

        <div className="flex gap-3 mt-6">
          {item && (
            <button
              type="button"
              onClick={setShowAlert}
              className="rounded-button button"
            >
              <DeleteIcon />
            </button>
          )}

          <button
            type="submit"
            disabled={!title || !calories}
            className="button primary-button"
          >
            Zapisz
          </button>
        </div>
      </form>
    </div>
  );
}
