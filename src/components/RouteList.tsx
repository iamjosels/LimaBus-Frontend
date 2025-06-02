import { useEffect, useState } from "react";
import api from "../services/api";
import Modal from "./Modal";
import RouteForm from "./RouteForm";
import { Search, MapPin, Map, Ruler, Clock, RefreshCw } from "lucide-react";

interface Ruta {
  id: number;
  nombre: string;
  punto_inicio: string;
  punto_fin: string;
  distancia_km: number;
  tiempo_estimado: string;
}

interface RouteListProps {
  onUpdated: () => void;
  onDeleted: () => void;
}

const tiempoEnMinutos = (tiempo: string): number => {
  if (tiempo.includes(":")) {
    const partes = tiempo.split(":").map(Number);
    if (partes.length === 3) {
      const [h, m, s] = partes;
      return h * 60 + m + s / 60;
    }
    if (partes.length === 2) {
      const [m, s] = partes;
      return m + s / 60;
    }
  }

  const hMatch = tiempo.match(/(\d+)\s*h/);
  const mMatch = tiempo.match(/(\d+)\s*m|min/);

  const horas = hMatch ? parseInt(hMatch[1]) : 0;
  const minutos = mMatch ? parseInt(mMatch[1]) : 0;

  return horas * 60 + minutos;
};

const RouteList = ({ onUpdated, onDeleted }: RouteListProps) => {
  const [rutas, setRutas] = useState<Ruta[]>([]);
  const [filtered, setFiltered] = useState<Ruta[]>([]);
  const [editingRuta, setEditingRuta] = useState<Ruta | null>(null);

  const [nombreFiltro, setNombreFiltro] = useState("");
  const [inicioFiltro, setInicioFiltro] = useState("");
  const [finFiltro, setFinFiltro] = useState("");
  const [distanciaMin, setDistanciaMin] = useState("");
  const [distanciaMax, setDistanciaMax] = useState("");
  const [duracionMin, setDuracionMin] = useState("");
  const [duracionMax, setDuracionMax] = useState("");

  const fetchRutas = () => {
    api.get<Ruta[]>("/routes").then((res) => {
      setRutas(res.data);
      setFiltered(res.data);
    });
  };

  useEffect(() => {
    fetchRutas();
  }, []);

  useEffect(() => {
    const result = rutas.filter((ruta) => {
      const nombreMatch = ruta.nombre.toLowerCase().includes(nombreFiltro.toLowerCase());
      const inicioMatch = ruta.punto_inicio.toLowerCase().includes(inicioFiltro.toLowerCase());
      const finMatch = ruta.punto_fin.toLowerCase().includes(finFiltro.toLowerCase());

      const distancia = ruta.distancia_km;
      const duracion = tiempoEnMinutos(ruta.tiempo_estimado);

      const distMinOk = distanciaMin === "" || distancia >= parseFloat(distanciaMin);
      const distMaxOk = distanciaMax === "" || distancia <= parseFloat(distanciaMax);
      const durMinOk = duracionMin === "" || duracion >= parseFloat(duracionMin);
      const durMaxOk = duracionMax === "" || duracion <= parseFloat(duracionMax);

      return (
        nombreMatch && inicioMatch && finMatch &&
        distMinOk && distMaxOk && durMinOk && durMaxOk
      );
    });

    setFiltered(result);
  }, [
    nombreFiltro, inicioFiltro, finFiltro,
    distanciaMin, distanciaMax,
    duracionMin, duracionMax,
    rutas,
  ]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Eliminar esta ruta?")) return;
    await api.delete(`/routes/${id}`);
    onDeleted();
    fetchRutas();
  };

  const handleUpdated = () => {
    onUpdated();
    setEditingRuta(null);
    fetchRutas();
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg shadow-sm">
            <Search size={18} className="text-gray-500" />
            <input
              placeholder="Nombre"
              value={nombreFiltro}
              onChange={(e) => setNombreFiltro(e.target.value)}
              className="flex-1 outline-none text-sm"
            />
          </div>
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg shadow-sm">
            <MapPin size={18} className="text-gray-500" />
            <input
              placeholder="Punto inicio"
              value={inicioFiltro}
              onChange={(e) => setInicioFiltro(e.target.value)}
              className="flex-1 outline-none text-sm"
            />
          </div>
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg shadow-sm">
            <Map size={18} className="text-gray-500" />
            <input
              placeholder="Punto final"
              value={finFiltro}
              onChange={(e) => setFinFiltro(e.target.value)}
              className="flex-1 outline-none text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg shadow-sm">
            <Ruler size={18} className="text-gray-500" />
            <input
              type="number"
              placeholder="Dist. mín"
              value={distanciaMin}
              onChange={(e) => setDistanciaMin(e.target.value)}
              className="w-1/2 outline-none text-sm"
            />
            <input
              type="number"
              placeholder="máx"
              value={distanciaMax}
              onChange={(e) => setDistanciaMax(e.target.value)}
              className="w-1/2 outline-none text-sm"
            />
          </div>
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg shadow-sm">
            <Clock size={18} className="text-gray-500" />
            <input
              type="number"
              placeholder="Duración mín"
              value={duracionMin}
              onChange={(e) => setDuracionMin(e.target.value)}
              className="w-1/2 outline-none text-sm"
            />
            <input
              type="number"
              placeholder="máx"
              value={duracionMax}
              onChange={(e) => setDuracionMax(e.target.value)}
              className="w-1/2 outline-none text-sm"
            />
          </div>
          <div className="text-right">
            <button
              onClick={() => {
                setNombreFiltro("");
                setInicioFiltro("");
                setFinFiltro("");
                setDistanciaMin("");
                setDistanciaMax("");
                setDuracionMin("");
                setDuracionMax("");
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 border border-blue-500 rounded-full shadow-sm hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm font-medium"
            >
              <RefreshCw size={16} />
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length > 0 ? (
          filtered.map((ruta) => (
            <div
              key={ruta.id}
              className="bg-white rounded-2xl border p-5 shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {ruta.id}
                </span>
                <h3 className="text-lg font-semibold text-gray-800">
                  {ruta.nombre}
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                {ruta.punto_inicio} → {ruta.punto_fin}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {ruta.distancia_km} km · {ruta.tiempo_estimado} (
                {tiempoEnMinutos(ruta.tiempo_estimado).toFixed(1)} min)
              </p>
              <div className="mt-4 flex justify-between text-sm font-medium">
                <button
                  onClick={() => setEditingRuta(ruta)}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleDelete(ruta.id)}
                  className="text-red-500 hover:text-red-700 hover:underline"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No se encontraron rutas con esos criterios.
          </p>
        )}
      </div>

      {editingRuta && (
        <Modal onClose={() => setEditingRuta(null)}>
          <RouteForm onAdd={handleUpdated} initialData={editingRuta} />
        </Modal>
      )}
    </div>
  );
};

export default RouteList;
