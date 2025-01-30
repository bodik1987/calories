import { ReactNode, useState } from "react";
import { PlusIcon } from "../ui/icons";
import Tray from "../ui/tray";

type MainProps = {};

export default function Main({}: MainProps) {
  const [open, setOpen] = useState(false);

  const [contentKey, setContentKey] = useState("options");

  const trayContent: Record<string, ReactNode> = {
    // options: <div setContent={setContent} />,
    // privateKey: <PrivateKey setContent={setContent} />,
    // recovery: <RecoveryPhrase setContent={setContent} />,
    // remove: <RemoveWallet setContent={setContent} />,
  };

  return (
    <>
      <Tray
        open={open}
        setOpen={setOpen}
        trayContent={trayContent}
        contentKey={contentKey}
      />
      <section className="row-start-2">
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="fixed w-14 !h-14 bottom-20 button right-4 bg-accent text-white"
          aria-label="Добавить"
        >
          <PlusIcon />
        </button>
      </section>
    </>
  );
}
