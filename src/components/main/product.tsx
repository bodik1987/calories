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
      <div className="flex items-center justify-between pl-1">
        <h2>{item ? "Изменить" : "Добавить продукт"}</h2>
        <button
          type="button"
          onClick={toggleFavorite}
          className="button rounded-button"
        >
          <FavoriteIcon active={isFavorite} />
        </button>
      </div>

      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="mt-2 flex gap-1">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название*"
            autoComplete="off"
            spellCheck="false"
            className="px-5 rounded-r-none! h-14!"
            autoFocus
          />
          <input
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="ккал*"
            autoComplete="off"
            className="input-number rounded-l-none! h-14!"
            spellCheck="false"
            type="number"
          />
        </div>

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Описание"
          autoComplete="off"
          spellCheck="false"
          className="px-5 mt-2 text-base! opacity-80"
        />

        <div className="mt-6 flex gap-3">
          {item && (
            <button
              type="button"
              onClick={setShowAlert}
              className="button rounded-button"
            >
              <DeleteIcon />
            </button>
          )}

          <button
            type="submit"
            disabled={!title || !calories}
            className="button primary-button"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
}
