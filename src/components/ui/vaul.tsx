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
        <Drawer.Content className="bg-gray-100 flex flex-col justify-end rounded-t-[10px] mt-24 fixed z-40 bottom-0 left-0 right-0 outline-none overflow-hidden">
          {modalContent[contentKey]}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
