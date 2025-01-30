import {
  AnimatePresence,
  motion,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import { ReactNode, useEffect } from "react";

type TrayProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  trayContent: Record<string, ReactNode>;
  contentKey: string;
};

export default function Tray({
  open,
  setOpen,
  trayContent,
  contentKey,
}: TrayProps) {
  const controls = useDragControls();
  const dragY = useMotionValue(0);

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
          className="fixed inset-0 bg-black/20 z-20 select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="fixed bottom-0 inset-x-0 max-w-md mx-auto min-h-10 bg-panel pb-3 overflow-hidden z-30"
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              y: dragY,
            }}
            initial={{ y: 336 }}
            animate={{ y: 0 }}
            exit={{ y: 500 }}
            transition={{
              duration: 0.05,
              ease: "easeInOut",
              type: "spring",
              mass: 0.2,
              damping: 10,
              stiffness: 100,
            }}
            layout
            drag="y"
            dragListener={false}
            dragControls={controls}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={() => {
              if (dragY.get() >= 50) {
                setOpen(false);
              }
            }}
          >
            <motion.div
              onPointerDown={(e) => {
                controls.start(e);
              }}
              key="drag-bar"
              layout
              className="py-3 flex justify-center active:cursor-grabbing touch-none"
            >
              <div
                style={{ borderRadius: 50 }}
                className="h-2 w-16 bg-accent/30"
              />
            </motion.div>

            <motion.div
              key={contentKey}
              layout="position"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.05,
                ease: "easeInOut",
                type: "spring",
                mass: 0.2,
                damping: 10,
                stiffness: 100,
              }}
            >
              {trayContent[contentKey]}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
