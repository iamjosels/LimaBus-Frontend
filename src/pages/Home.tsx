import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import travelMode from "../assets/travel_mode.svg";

const Home = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100 px-4 pt-12">
      <div className="max-w-7xl mx-auto space-y-24">

        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Bienvenido a <span className="text-blue-600">LimaBus</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Descubre las rutas de transporte público más rápidas y seguras en Lima Metropolitana. Optimiza tu viaje con nuestro sistema inteligente.
            </p>

            <Link
              to="/rutas"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
            >
              Explorar Rutas <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <img src={travelMode} alt="Modo de viaje" className="w-full max-w-md h-auto" />  
          </motion.div>
        </section>

        {/* Sección de Beneficios */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center text-gray-800 mb-12"
          >
            ¿Por qué usar LimaBus?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Rutas Óptimas",
                desc: "Encuentra la ruta más rápida y eficiente para llegar a tu destino.",
                icon: "🗺️",
              },
              {
                title: "Filtros Inteligentes",
                desc: "Filtra rutas por duración, distancia y punto de partida.",
                icon: "⚙️",
              },
              {
                title: "Interfaz Intuitiva",
                desc: "Diseño moderno y accesible desde cualquier dispositivo.",
                icon: "📱",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-md rounded-xl p-6 text-center border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
