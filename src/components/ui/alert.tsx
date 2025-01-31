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
          className="fixed inset-0 flex items-center justify-center bg-black/20 z-20 select-none"
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
            className="p-5 max-w-xs mx-auto min-h-10 bg-panel overflow-hidden rounded-4xl z-30"
          >
            <p className="text-xl p-1">{alertText}</p>

            <div className="mt-6 flex gap-3 text-accent">
              <button
                type="button"
                className="button w-full"
                onClick={handleCancel}
              >
                Отмена
              </button>
              <button
                type="button"
                className="button w-full bg-accent-2"
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
