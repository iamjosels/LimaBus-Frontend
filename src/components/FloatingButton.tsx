import { motion } from "framer-motion";

const FloatingButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="fixed bottom-6 right-6 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg text-2xl flex items-center justify-center z-50"
      title="Registrar Ruta"
    >
      +
    </motion.button>
  );
};

export default FloatingButton;
