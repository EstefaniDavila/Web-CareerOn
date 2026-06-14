import React, { useEffect, useState } from "react";

export default function ViewChallengeModal({
  open,
  onClose,
  challenge,
}) {
  // ======================
  // 🔵 HOOKS (SIEMPRE ARRIBA)
  // ======================
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [participants, setParticipants] = useState([
    {
      id: 1,
      name: "Abby Sev",
      fileName: "reto_frontend.pdf",
      reviewed: false,
    },
    {
      id: 2,
      name: "Juan Pérez",
      fileName: "landing.zip",
      reviewed: true,
    },
    {
      id: 3,
      name: "María López",
      fileName: "proyecto.docx",
      reviewed: false,
    },
  ]);

  // ======================
  // 🔵 EFFECTS
  // ======================

  // Bloquear scroll cuando abre modal
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Reset cuando cierra
  useEffect(() => {
    if (!open) {
      setShowConfirm(false);
      setShowSuccess(false);
    }
  }, [open]);

  
  if (!open || !challenge) return null;


  const toggleReviewed = (id) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, reviewed: !p.reviewed } : p
      )
    );
  };

  const handleSave = () => {
    setShowConfirm(false);
    // TODO: backend
    setShowSuccess(true);
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 top-16 z-50 bg-black/40 flex justify-start"
        onClick={onClose}
      >
        {/* PANEL */}
        <div
          className="max-w-xl h-[calc(100vh-4rem)] bg-white shadow-2xl p-8 overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-2xl hover:text-red-500"
          >
            ✕
          </button>

          {/* HEADER */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#1C1C1C]">
              {challenge?.name || "Sin nombre"}
            </h2>

            <div className="mt-3 flex gap-3">
              <span className="bg-[#EEE8FF] text-[#5B34F2] px-4 py-1 rounded-full text-sm font-medium">
                {challenge?.skill || "Sin skill"}
              </span>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-2">Descripción</h3>

            <div className="bg-gray-50 border rounded-xl p-4 text-gray-700">
              {challenge?.description || "Sin descripción"}
            </div>
          </div>

          {/* PARTICIPANTES */}
          <div>
            <h3 className="font-bold text-lg mb-4">Participantes</h3>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-[#5B34F2] text-white">
                  <tr>
                    <th className="p-3 text-left">Estudiante</th>
                    <th className="p-3 text-center">Archivo</th>
                    <th className="p-3 text-center">Estado</th>
                    <th className="p-3 text-center">Acción</th>
                  </tr>
                </thead>

                <tbody>
                  {participants.map((student) => (
                    <tr key={student.id} className="border-t">
                      <td className="p-3">{student.name}</td>

                      <td className="p-3 text-center">
                        <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200">
                          📄 {student.fileName}
                        </button>
                      </td>

                      <td className="p-3 text-center">
                        {student.reviewed ? (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            Revisado
                          </span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                            No revisado
                          </span>
                        )}
                      </td>

                      <td className="p-3 text-center">
                        <button
                          onClick={() => toggleReviewed(student.id)}
                          className="bg-[#5B34F2] hover:bg-[#4320C9] text-white px-4 py-2 rounded-lg"
                        >
                          Marcar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SAVE */}
          <div className="flex justify-end mt-8">
            <button
              onClick={() => setShowConfirm(true)}
              className="bg-[#5B34F2] hover:bg-[#4320C9] text-white px-6 py-3 rounded-xl font-semibold"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 z-[10000] bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 w-[420px]">
            <h2 className="text-2xl font-bold mb-3">
              Confirmar cambios
            </h2>

            <p className="text-gray-600 mb-8">
              ¿Deseas guardar los estados de revisión?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="border px-5 py-2 rounded-xl"
              >
                Cancelar
              </button>

              <button
                onClick={handleSave}
                className="bg-[#5B34F2] text-white px-5 py-2 rounded-xl"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-[10001] bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 w-[420px] text-center">
            <div className="text-6xl mb-3">✅</div>

            <h2 className="text-2xl font-bold">
              Cambios guardados
            </h2>

            <p className="text-gray-500 mt-3 mb-6">
              Estado actualizado correctamente.
            </p>

            <button
              onClick={() => {
                setShowSuccess(false);
                onClose();
              }}
              className="bg-[#5B34F2] text-white px-6 py-3 rounded-xl"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </>
  );
}