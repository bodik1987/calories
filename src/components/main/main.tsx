import { ReactNode, useState } from "react";
import { PlusIcon } from "../ui/icons";
import Tray from "../ui/tray";

export default function Main() {
  const [open, setOpen] = useState(false);

  const [contentKey, setContentKey] = useState("content1");

  const trayContent: Record<string, ReactNode> = {
    content1: <div onClick={() => setContentKey("content2")}>Content 1</div>,
    content2: (
      <div className="h-12" onClick={() => setContentKey("content1")}>
        Content 2
      </div>
    ),
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
