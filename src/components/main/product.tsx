import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Item } from "../../types";
import { DeleteIcon, FavoriteIcon } from "../ui/icons";

type Props = {
  item?: Item;
  onComplete?: () => void;
  onAddItem?: (newItem: Item) => void;
  onUpdateItem?: (updatedItem: Item) => void;
  onDeleteItem?: (id: string) => void;
};

export default function Product({
  item,
  onComplete,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
}: Props) {
  const [title, setTitle] = useState(item?.title || "");
  const [calories, setCalories] = useState(item?.calories || "");
  const [isFavorite, setIsFavorite] = useState(item?.isFavorite || false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newItem: Item = {
      id: item?.id || uuidv4(),
      title,
      calories,
      isFavorite,
    };

    item ? onUpdateItem?.(newItem) : onAddItem?.(newItem);

    setTitle("");
    setCalories("");
    setIsFavorite(false);
    onComplete?.();
  };

  const handleDelete = () => {
    if (item) {
      onDeleteItem?.(item.id);
      onComplete?.();
    }
  };

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="px-4">
      <div className="flex justify-between items-center">
        <h2>{item ? "Изменить" : "Добавить продукт"}</h2>
        <button type="button" onClick={toggleFavorite} className="">
          <FavoriteIcon active={isFavorite} />
        </button>
      </div>

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mt-2 flex gap-1">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название"
            autoComplete="off"
            spellCheck="false"
            className="px-5 !rounded-r-none"
            autoFocus
          />
          <input
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="ккал"
            autoComplete="off"
            className="!w-24 !rounded-l-none"
            spellCheck="false"
            type="number"
          />
        </div>

        <div className="mt-6 flex gap-3">
          {item && (
            <button
              onClick={handleDelete}
              className="button bg-white w-11 aspect-square text-accent"
            >
              <DeleteIcon />
            </button>
          )}

          <button
            type="submit"
            disabled={!title || !calories}
            className="button bg-accent disabled:bg-accent/50 text-white w-full"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
}
