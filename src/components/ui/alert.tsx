import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

type AlertProps = {
  open: boolean;
  handleClose: () => void;
  alertText: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonText: string;
};

export default function Alert({
  open,
  handleClose,
  alertText,
  onConfirm,
  onCancel,
  confirmButtonText,
}: AlertProps) {
  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  const handleCancel = () => {
    onCancel();
    handleClose();
  };

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
          className="overlay flex items-center justify-center"
          onClick={handleClose}
        >
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
            onClick={(e) => e.stopPropagation()}
            className="max-w-xs px-6 pt-4 pb-5 bg-panel dark:bg-dark-panel text-accent dark:text-neutral-50 rounded-4xl z-30"
          >
            <h2 className="p-1">{alertText}</h2>

            <div className="mt-6 flex gap-3 ">
              <button
                type="button"
                className="button w-full"
                onClick={handleCancel}
              >
                Отмена
              </button>
              <button
                type="button"
                className="button w-full bg-white"
                onClick={handleConfirm}
              >
                {confirmButtonText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
