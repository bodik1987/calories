import {
  AnimatePresence,
  motion,
  useDragControls,
  useMotionValue,
} from "motion/react";
import { ReactNode, useEffect, useState } from "react";
import { SettingsIcon } from "../../ui/icons";
import Theme from "./theme";

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("settingsList");

  const close = () => setIsOpen(false);

  const trayContent: Record<string, ReactNode> = {
    settingsList: (
      <div>
        <button onClick={() => setContent("theme")}>Сменить тему</button>
      </div>
    ),
    theme: <Theme />,
  };

  const controls = useDragControls();
  const dragY = useMotionValue(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="button rounded-button">
        <SettingsIcon />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 z-40 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="fixed bottom-4 inset-x-0 mx-auto max-w-xs p-5 bg-panel dark:bg-dark-panel rounded-4xl z-50"
              style={{ borderRadius: 28, y: dragY }}
              initial={{ y: 336, scale: 0.6 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 500, scale: 1 }}
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
                  close();
                }
              }}
            >
              <button className="mb-3 mx-auto flex justify-center">
                <motion.div
                  className="h-2 w-14 cursor-grab active:cursor-grabbing touch-none bg-accent/30 dark:bg-dark-accent/30"
                  style={{ borderRadius: 50 }}
                  key="drag-bar"
                  layout
                  onPointerDown={(e) => controls.start(e)}
                />
              </button>

              <h2>{content === "theme" && "Сменить тему"}</h2>

              <motion.div
                key={content}
                layout="position"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.05,
                  ease: "easeInOut",
                  type: "spring",
                  mass: 0.2,
                  damping: 10,
                  stiffness: 100,
                }}
                className="mt-3"
              >
                {trayContent[content]}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
