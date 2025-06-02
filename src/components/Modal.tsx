import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  // Cerrar con tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose} // cerrar si se hace click fuera
      >
        <motion.div
          onClick={(e) => e.stopPropagation()} // evitar cierre al hacer clic dentro
          className="bg-white rounded-xl p-6 shadow-lg w-full max-w-xl relative"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-400 hover:text-red-600 text-xl"
          >
            ×
          </button>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;