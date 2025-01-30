import { useRef } from "react";
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
  return (
    <div className="px-3">
      <div className={`max-h-[391px] rounded-xl overflow-y-auto`}>
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
              className="list-modal"
            >
              <p className="w-full flex items-center gap-3">
                <span className="font-medium">
                  {item.isFavorite && <FavoriteIcon active />}
                </span>
                {item.title}
              </p>
              <span>{item.calories}</span>
            </div>
          ))}
      </div>

      <div className="mt-3 flex gap-2.5">
        <div className="relative w-full">
          <input
            type="search"
            autoComplete="false"
            spellCheck="false"
            ref={inputRef}
            value={searchQuery}
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
            className="absolute right-2 top-1/2 -translate-y-1/2 text-accent w-11 h-11 rounded-full flex items-center justify-center"
          >
            {searchQuery.length > 0 ? <BackspaceIcon /> : <DownIcon />}
          </button>
        </div>
        <button
          onClick={() => setContentKey("addNewProduct")}
          className="button bg-white w-11 aspect-square text-accent"
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}
