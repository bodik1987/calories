import { useState } from "react";
import UserForm from "./user-form";
import SyncCore from "./sync-core";
import { IUser } from "../../../types";
import useLocalStorage from "../../../hooks/useLocalStorage";

export default function Sync() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [user, saveUser] = useLocalStorage<IUser | null>("user", null);
  const [userForm, setUserForm] = useState(false);

  return (
    <div className="p-4">
      <div className="flex justify-between gap-3">
        <h2>{user ? user.name : "Нет пользователя"}</h2>
        <div className="flex gap-3">
          {loading && <div>Загрузка...</div>}

          {success && <div>{success}</div>}

          {error && <div className="text-warning">{error}</div>}
        </div>
      </div>

      {user ? (
        <SyncCore
          user={user}
          setLoading={setLoading}
          setSuccess={setSuccess}
          setError={setError}
        />
      ) : (
        <>
          {userForm ? (
            <UserForm
              saveUser={saveUser}
              setLoading={setLoading}
              setSuccess={setSuccess}
              setError={setError}
            />
          ) : (
            <>
              <button
                onClick={() => setUserForm(true)}
                className="mt-4 button primary-button"
              >
                Войти
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
