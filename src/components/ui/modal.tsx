import { ReactNode, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useDragControls,
  useMotionValue,
} from "framer-motion";

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
  const y = useMotionValue(0);
  const controls = useDragControls();

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
          className="overlay"
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
            style={{ y }}
            drag="y"
            dragControls={controls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.9 }} // Меньше растяжимости
            onDragEnd={() => {
              if (y.get() >= 50) {
                handleClose();
              }
            }}
            className="fixed bottom-0 inset-x-0 max-w-md mx-auto bg-panel dark:bg-dark-panel rounded-t-2xl z-30"
          >
            <div
              // onPointerDown={(e) => controls.start(e)}
              className="z-10 flex justify-center cursor-grab active:cursor-grabbing bg-panel dark:bg-dark-panel rounded-t-2xl pt-3 touch-none"
            >
              <div className="h-2 w-16 rounded-full bg-accent/20 dark:bg-[#5C5C5C]" />
            </div>
            <div onPointerDown={(e) => e.stopPropagation()}>
              {modalContent[contentKey]}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
