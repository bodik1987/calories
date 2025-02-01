import { useRef, useState } from "react";
import { Item } from "../../types";
import { BackspaceIcon, DownIcon, FavoriteIcon, PlusIcon } from "../ui/icons";

type ListProps = {
  items: Item[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  showFavorites: boolean;
  setContentKey: React.Dispatch<React.SetStateAction<string>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<Item | undefined>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function List({
  items,
  searchQuery,
  showFavorites,
  setSearchQuery,
  setContentKey,
  setSelectedItem,
  setOpen,
}: ListProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [maxHeight, setMaxHeight] = useState(true);

  return (
    <div className="p-3 pb-4">
      <div
        className={`${
          maxHeight ? "max-h-[75vh]" : "max-h-[391px]"
        } rounded-xl overflow-y-auto`}
      >
        {items
          .filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .filter((item) => (showFavorites ? item.isFavorite : true))
          .sort((a, b) => {
            if (a.isFavorite && !b.isFavorite) return -1;
            if (!a.isFavorite && b.isFavorite) return 1;
            return a.title.localeCompare(b.title);
          })
          .map((item) => (
            <div
              onClick={() => {
                setSelectedItem(item);
                setContentKey("addWeight");
              }}
              key={item.id}
              className="list"
            >
              <p className="w-full flex items-center gap-3">
                {item.isFavorite && <FavoriteIcon active />}
                {item.title}
              </p>
              <span>{item.calories}</span>
            </div>
          ))}
      </div>

      <div className="mt-4 flex gap-3">
        <div className="relative w-full">
          <input
            type="search"
            autoComplete="false"
            spellCheck="false"
            ref={inputRef}
            value={searchQuery}
            onFocus={() => setMaxHeight(false)}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск..."
            className="pl-5 pr-12"
          />

          <button
            onClick={() => {
              if (searchQuery.length > 0) {
                setSearchQuery("");
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              } else {
                setOpen(false);
              }
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-accent dark:text-neutral-50 w-12 h-12 rounded-full flex items-center justify-center"
          >
            {searchQuery.length > 0 ? <BackspaceIcon /> : <DownIcon />}
          </button>
        </div>
        <button
          onClick={() => setContentKey("addNewProduct")}
          className="button rounded-button"
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}
