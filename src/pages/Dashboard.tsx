import { useState } from "react";
import Sidebar from "../components/Sidebar";
import RouteList from "../components/RouteList";
import RouteForm from "../components/RouteForm";
import Modal from "../components/Modal";
import FloatingButton from "../components/FloatingButton";
import Toast from "../components/Toast";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToastMsg(msg);
    setToastType(type);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleAdd = () => {
    setRefresh(!refresh);
    setShowModal(false);
    showToast("✅ Ruta registrada exitosamente");
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-100 min-h-screen p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Rutas</h2>
        <RouteList
          key={refresh.toString()}
          onUpdated={() => {
            setRefresh(!refresh);
            showToast("✏️ Ruta actualizada");
          }}
          onDeleted={() => {
            setRefresh(!refresh);
            showToast("🗑️ Ruta eliminada");
          }}
        />

        <FloatingButton onClick={() => setShowModal(true)} />

        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <RouteForm onAdd={handleAdd} />
          </Modal>
        )}

        <Toast message={toastMsg} type={toastType} onClose={() => setToastMsg("")} />
        </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
