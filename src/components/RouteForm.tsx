import { useEffect, useState } from "react";
import api from "../services/api";

interface Ruta {
  id?: number;
  nombre: string;
  punto_inicio: string;
  punto_fin: string;
  distancia_km: number;
  tiempo_estimado: string;
}

interface RouteFormProps {
  onAdd: () => void;
  initialData?: Partial<Ruta>;
}

const RouteForm = ({ onAdd, initialData }: RouteFormProps) => {
  const [form, setForm] = useState<Ruta>({
    nombre: "",
    punto_inicio: "",
    punto_fin: "",
    distancia_km: 0,
    tiempo_estimado: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm({
        nombre: initialData.nombre || "",
        punto_inicio: initialData.punto_inicio || "",
        punto_fin: initialData.punto_fin || "",
        distancia_km: initialData.distancia_km || 0,
        tiempo_estimado: initialData.tiempo_estimado || "",
        id: initialData.id,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "distancia_km" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (form.id) {
        await api.put(`/routes/${form.id}`, form);
        setSuccessMsg("✅ Ruta actualizada correctamente.");
      } else {
        await api.post("/routes", form);
        setSuccessMsg("✅ Ruta registrada exitosamente.");
      }

      setForm({
        nombre: "",
        punto_inicio: "",
        punto_fin: "",
        distancia_km: 0,
        tiempo_estimado: "",
      });

      setErrorMsg("");
      onAdd();

      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.error("Error al guardar ruta:", error);
      setErrorMsg("❌ Error al guardar la ruta.");
      setSuccessMsg("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-6 space-y-4"
    >
      <h2 className="text-xl font-bold">
        {form.id ? "Editar Ruta" : "Registrar Nueva Ruta"}
      </h2>

      {successMsg && (
        <div className="bg-green-100 text-green-700 p-2 rounded">{successMsg}</div>
      )}
      {errorMsg && (
        <div className="bg-red-100 text-red-700 p-2 rounded">{errorMsg}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label>Nombre</label>
          <input
            name="nombre"
            type="text"
            value={form.nombre}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
            required
          />
        </div>
        <div>
          <label>Punto de Inicio</label>
          <input
            name="punto_inicio"
            type="text"
            value={form.punto_inicio}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
            required
          />
        </div>
        <div>
          <label>Punto Final</label>
          <input
            name="punto_fin"
            type="text"
            value={form.punto_fin}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
            required
          />
        </div>
        <div>
          <label>Distancia (km)</label>
          <input
            name="distancia_km"
            type="number"
            value={form.distancia_km}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
            required
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <label>Tiempo Estimado</label>
          <input
            name="tiempo_estimado"
            type="text"
            value={form.tiempo_estimado}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {form.id ? "Guardar Cambios" : "Registrar Ruta"}
      </button>
    </form>
  );
};

export default RouteForm;
