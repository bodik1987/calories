import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect } from "react";

type TrayProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  trayContent: Record<string, ReactNode>;
  contentKey: string;
  setContentKey: React.Dispatch<React.SetStateAction<string>>;
};

export default function Modal({
  open,
  setOpen,
  trayContent,
  contentKey,
  setContentKey,
}: TrayProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    setContentKey("list");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.05,
            ease: "easeInOut",
            type: "spring",
            mass: 0.2,
            damping: 10,
            stiffness: 100,
          }}
          className="fixed inset-0 bg-black/20 z-20 select-none"
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              duration: 0.05,
              ease: "easeInOut",
              type: "spring",
              mass: 0.2,
              damping: 10,
              stiffness: 100,
            }}
            onClick={(e) => e.stopPropagation()}
            className="fixed bottom-0 inset-x-0 max-w-md mx-auto min-h-10 bg-panel py-3 overflow-hidden rounded-t-2xl z-30"
          >
            {trayContent[contentKey]}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
