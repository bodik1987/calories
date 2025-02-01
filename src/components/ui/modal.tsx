import { ReactNode, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  modalContent: Record<string, ReactNode>;
  contentKey: string;
};

export default function Modal({
  open,
  handleClose,
  modalContent,
  contentKey,
}: ModalProps) {
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
          className="fixed inset-0 bg-black/50 dark:bg-transparent z-20 select-none"
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
            className="fixed bottom-0 inset-x-0 max-w-md mx-auto bg-panel dark:bg-dark-panel rounded-t-2xl z-30"
          >
            {modalContent[contentKey]}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
