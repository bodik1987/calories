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
      <div className="rounded-xl max-h-[80vh] overflow-y-auto">
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
              <div className="flex items-center gap-3 w-full">
                <div>
                  <p className="flex items-center gap-3 w-full">
                    {item.isFavorite && <FavoriteIcon active />}
                    {item.title}
                  </p>
                  <p className="opacity-50 mt-0.5 text-xs">
                    {item.description}
                  </p>
                </div>
              </div>
              <span>{item.calories}</span>
            </div>
          ))}
      </div>

      <div className="flex gap-3 mt-4">
        <div className="relative w-full">
          <input
            type="search"
            autoComplete="false"
            spellCheck="false"
            ref={inputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Szukaj..."
            className="pr-12 pl-5 border-2 border-transparent focus:border-accent text-lg! transition-all"
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
            className="top-1/2 right-2 absolute flex justify-center items-center rounded-full h-12 text-accentw-12 -translate-y-1/2"
          >
            {searchQuery.length > 0 ? <BackspaceIcon /> : <DownIcon />}
          </button>
        </div>
        <button
          onClick={() => setContentKey("addNewProduct")}
          className="rounded-button button"
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}
