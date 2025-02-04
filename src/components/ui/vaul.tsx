import { ReactNode } from "react";
import { Drawer } from "vaul";

type VaulProps = {
  open: boolean;
  onClose: () => void;
  modalContent: Record<string, ReactNode>;
  contentKey: string;
};

export default function VaulDrawer({
  open,
  onClose,
  modalContent,
  contentKey,
}: VaulProps) {
  return (
    <Drawer.Root open={open} onClose={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-30" />

        <Drawer.Content className="bg-panel dark:bg-dark-panel font-myFont flex flex-col justify-end rounded-t-[10px] mt-24 fixed z-40 bottom-0 left-0 right-0 outline-none overflow-hidden">
          <div className="flex justify-center cursor-grab active:cursor-grabbing bg-panel dark:bg-dark-panel rounded-t-2xl pt-3 touch-none">
            <div className="h-1.5 w-12 rounded-full bg-accent/20 dark:bg-[#5C5C5C]" />
          </div>
          {modalContent[contentKey]}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
