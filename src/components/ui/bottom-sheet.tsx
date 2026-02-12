import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { Drawer } from "vaul";

type VaulProps = {
  open: boolean;
  onClose: () => void;
  modalContent: Record<string, ReactNode>;
  contentKey: string;
};

export default function BottomSheet({
  open,
  onClose,
  modalContent,
  contentKey,
}: VaulProps) {
  const bottomSheetPortal = document.getElementById("bottom-sheet-portal");
  return createPortal(
    <Drawer.Root open={open} onClose={onClose}>
      <Drawer.Overlay className="fixed inset-0 bg-black/40 z-20" />

      <Drawer.Content className="h-fit! container bg-panel dark:bg-dark-panel text-[#1B0C1B] dark:text-neutral-50 flex flex-col justify-end rounded-t-[18px] mt-24 fixed z-30 bottom-0 left-0 right-0 outline-none overflow-hidden">
        <Drawer.Title />
        <Drawer.Description />
        <div className="flex justify-center cursor-grab active:cursor-grabbing rounded-t-2xl pt-3 touch-none">
          <div className="h-1.5 w-12 rounded-full bg-accent/20 dark:bg-[#5C5C5C]" />
        </div>
        {modalContent[contentKey]}
      </Drawer.Content>
    </Drawer.Root>,
    bottomSheetPortal!
  );
}
