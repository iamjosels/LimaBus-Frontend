import {
  Home,
  Bus,
  PlusCircle,
  HelpCircle,
  Menu,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const linkClasses = (path: string) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
      pathname === path
        ? "bg-blue-50 text-blue-700 font-semibold"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <>
      {/* Botón Hamburguesa / Cerrar (solo en móviles) */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed top-4 left-4 z-[60] bg-white border p-2 rounded-md shadow-md
                    transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 md:hidden
                    ${open ? "animate-glow ring-2 ring-blue-400/40" : ""}`}
        >
        <Menu
            size={20}
            className="text-gray-800 transition-transform duration-300 ease-in-out"
        />
        </button>

      {/* Fondo oscuro en móvil */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-screen bg-white border-r shadow-md w-64 flex flex-col justify-between transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        md:static md:transform-none`}
      >
        <div className="p-6 space-y-6">
          {/* Logo centrado */}
          <div className="flex justify-center mb-8">
            <img
              src="/src/assets/logo.png"
              alt="LimaBus Logo"
              className="h-50 w-auto object-contain"
            />
          </div>

          <nav className="flex flex-col space-y-2">
            <Link to="/" className={linkClasses("/")} onClick={() => setOpen(false)}>
              <Home size={18} /> Inicio
            </Link>
            <Link to="/rutas" className={linkClasses("/rutas")} onClick={() => setOpen(false)}>
              <Bus size={18} /> Rutas
            </Link>
            <Link to="/registrar" className={linkClasses("/registrar")} onClick={() => setOpen(false)}>
              <PlusCircle size={18} /> Registrar Ruta
            </Link>
            <Link to="/ayuda" className={linkClasses("/ayuda")} onClick={() => setOpen(false)}>
              <HelpCircle size={18} /> Ayuda
            </Link>
          </nav>
        </div>

        <div className="p-4 text-center text-xs text-gray-400">
          © 2025 LimaBus
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
