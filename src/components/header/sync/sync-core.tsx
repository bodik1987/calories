import { child, get, ref, remove, set } from "firebase/database";
import {
  DATABASE,
  RD_PROJECT_ITEMS,
  RD_PROJECT_USERS,
} from "../../../../firebase";
import { EtenProducts, Item, IUser } from "../../../types";
import { SEEDS } from "../../../seeds";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useDataStore } from "../../../store/useStore";

type Props = {
  user: IUser;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export default function SyncCore({
  user,
  setLoading,
  setSuccess,
  setError,
}: Props) {
  const [items, setItems] = useLocalStorage<Item[]>("items", SEEDS);
  const { day, setDay } = useDataStore();

  const deleteLocalUser = () => {
    localStorage.clear();
    window.location.reload();
  };

  // CREATE
  const uploadToDatabase = () => {
    setSuccess("");
    setError("");
    setLoading(true);
    try {
      if (user) {
        set(ref(DATABASE, RD_PROJECT_ITEMS + user.name), {
          items,
          day,
        }).then(() => {
          setLoading(false);
        });
        setSuccess("Выгружено");
      }
    } catch (error) {
      console.log(error);
      setError("Error. Try later");
    }
  };

  // DOWNLOAD
  const downloadFromDatabase = () => {
    if (confirm("Восстановить? Текущие данные будут удалены!") === true) {
      setSuccess("");
      setError("");
      setLoading(true);
      try {
        if (user) {
          const dbRef = ref(DATABASE);
          get(child(dbRef, `${RD_PROJECT_ITEMS}/${user.name}`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                const result: {
                  items: Item[];
                  day: EtenProducts[];
                } = snapshot.val();
                if (result.items) {
                  setItems(result.items);
                }
                if (result.day) {
                  setDay(result.day);
                }
                setSuccess("Загружено");
                window.location.reload();
              } else {
                setError("No data available");
              }
              setLoading(false);
            })
            .catch((error) => {
              console.error(error);
              setError(error);
            });
        }
      } catch (error) {
        console.log(error);
        setError("Error. Try later");
      }
    }
  };

  const deleteUser = () => {
    setSuccess("");
    setError("");
    setLoading(true);
    if (user) {
      if (confirm(`Удалить?`) === true) {
        remove(ref(DATABASE, RD_PROJECT_ITEMS + user.name))
          .then(() => {
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error removing item:", error);
            setLoading(false);
            setError(error);
          });
        remove(ref(DATABASE, RD_PROJECT_USERS + user.name))
          .then(() => {
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error removing item:", error);
            setLoading(false);
            setError(error);
          });
        deleteLocalUser();
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <div className="mt-4 w-full flex flex-col justify-center gap-2">
      <div className="flex gap-2">
        <button
          onClick={deleteUser}
          className="button disabled:bg-accent/50 text-white w-full bg-warning"
        >
          Удалить
        </button>

        <button
          onClick={downloadFromDatabase}
          className="button border-primary border-2 w-fit px-4"
        >
          Восстановить
        </button>

        <button onClick={deleteLocalUser} className="button primary-button">
          Выйти
        </button>
      </div>

      <button
        onClick={uploadToDatabase}
        className="mt-4 button primary-button h-16!"
      >
        Сделать резервную копию
      </button>
    </div>
  );
}
