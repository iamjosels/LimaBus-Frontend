import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import RouteList from "./components/RouteList";
import RouteForm from "./components/RouteForm";
import Help from "./pages/Help";

function App() {
  const handleUpdate = () => {
    console.log("Ruta actualizada");
  };

  const handleDelete = () => {
    console.log("Ruta eliminada");
  };

  const handleAdd = () => {
    console.log("Ruta agregada");
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-100 min-h-screen p-6 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rutas" element={<RouteList onUpdated={handleUpdate} onDeleted={handleDelete} />} />
          <Route
              path="/registrar"
              element={<RouteForm onAdd={handleAdd} />}
            />
          <Route path="/ayuda" element={<Help />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
