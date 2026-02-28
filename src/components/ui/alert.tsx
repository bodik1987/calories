import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { createPortal } from "react-dom";

type AlertProps = {
  open: boolean;
  handleClose: () => void;
  alertText: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonText: string;
  content?: React.ReactNode;
};

export default function Alert({
  open,
  handleClose,
  alertText,
  onConfirm,
  onCancel,
  confirmButtonText,
  content,
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
      if (document.body.style.pointerEvents === "none") {
        document.body.style.pointerEvents = "";
      }
      document.body.removeAttribute("data-scroll-locked");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.removeAttribute("data-scroll-locked");
      document.body.style.overflow = "";
    };
  }, [open]);

  const alertPortal = document.getElementById("alert-portal");

  return createPortal(
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
          className="font-myFont fixed inset-0 bg-black/50 z-50 select-none flex items-center justify-center"
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
            className="max-w-xs p-6 bg-panel rounded-4xl z-50"
          >
            <h3 className="p-1 text-lg">{alertText}</h3>

            {content && <>{content}</>}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                className="button w-full"
                onClick={handleCancel}
              >
                Отмена
              </button>
              <button
                type="button"
                className="button w-full text-accent bg-white/50"
                onClick={handleConfirm}
              >
                {confirmButtonText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    alertPortal!,
  );
}
