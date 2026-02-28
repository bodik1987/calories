import { useRef } from "react";
import { Item } from "../../types";
import { BackspaceIcon, DownIcon, FavoriteIcon, PlusIcon } from "../ui/icons";

type ListProps = {
  items: Item[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  showFavorites: boolean;
  setContentKey: (value: string) => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<Item | undefined>>;
  setOpenBottomSheet: (value: boolean) => void;
};

export default function List({
  items,
  searchQuery,
  showFavorites,
  setSearchQuery,
  setContentKey,
  setSelectedItem,
  setOpenBottomSheet,
}: ListProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-3 pb-4">
      <div className="max-h-[80vh] rounded-xl overflow-y-auto">
        {items
          .filter((item) => {
            const query = searchQuery.toLowerCase();
            return (
              item.title.toLowerCase().includes(query) ||
              (item.description &&
                item.description.toLowerCase().includes(query))
            );
          })
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
              className={`${item.description ? "h-16!" : ""} list`}
            >
              <div className="w-full flex items-center gap-3">
                <div>
                  <p className="w-full flex items-center gap-3">
                    {item.isFavorite && <FavoriteIcon active />}
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs opacity-50">
                    {item.description}
                  </p>
                </div>
              </div>
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
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск..."
            className="pl-5 pr-12 text-lg! border-2 border-transparent focus:border-accent transition-all"
            autoFocus
          />

          <button
            onClick={() => {
              if (searchQuery.length > 0) {
                setSearchQuery("");
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              } else {
                setOpenBottomSheet(false);
              }
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-accentw-12 h-12 rounded-full flex items-center justify-center"
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
