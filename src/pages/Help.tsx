import { motion } from "framer-motion";
import { Info, Mail, LifeBuoy } from "lucide-react";

const Help = () => {
  return (
    <main className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <section className="max-w-4xl w-full bg-white rounded-xl shadow-md p-8 space-y-8">
        <motion.h1
          className="text-3xl font-bold text-center text-blue-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ¿Necesitas ayuda?
        </motion.h1>

        <p className="text-gray-600 text-center">
          Aquí encontrarás respuestas a tus preguntas frecuentes, soporte técnico y medios de contacto.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            className="border rounded-md p-4 text-center shadow-sm"
            whileHover={{ scale: 1.03 }}
          >
            <Info className="mx-auto mb-2 text-blue-500" size={28} />
            <h2 className="font-semibold text-gray-800">Preguntas Frecuentes</h2>
            <p className="text-sm text-gray-600">
              Consulta respuestas a problemas comunes al usar LimaBus.
            </p>
          </motion.div>

          <motion.div
            className="border rounded-md p-4 text-center shadow-sm"
            whileHover={{ scale: 1.03 }}
          >
            <Mail className="mx-auto mb-2 text-green-500" size={28} />
            <h2 className="font-semibold text-gray-800">Contacto</h2>
            <p className="text-sm text-gray-600">
              Escríbenos a soporte@limabus.com
            </p>
          </motion.div>

          <motion.div
            className="border rounded-md p-4 text-center shadow-sm"
            whileHover={{ scale: 1.03 }}
          >
            <LifeBuoy className="mx-auto mb-2 text-purple-500" size={28} />
            <h2 className="font-semibold text-gray-800">Soporte Técnico</h2>
            <p className="text-sm text-gray-600">
              Reporta errores o dificultades al usar la plataforma.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Help;
