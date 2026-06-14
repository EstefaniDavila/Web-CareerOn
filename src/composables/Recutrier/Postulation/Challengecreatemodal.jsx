import React, { useState } from "react";

export default function CreateModal({ open, onClose, onCreate }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [skill, setSkill] = useState("");
  if (!open) return null;

  const handlePublish = () => {
    setShowConfirm(false);

    // Aquí luego conectarás tu backend
    if (onCreate) {
      onCreate({
        name,
        description,
      });
    }

    setShowSuccess(true);
  };

  const handleFinish = () => {
    setShowSuccess(false);

    setName("");
    setDescription("");
    setSkill("");
    onClose();
  };

  return (
    <>
      {/* Overlay + Drawer */}
    <div className="fixed inset-0 top-16 z-50 bg-black/40 flex justify-start ">
    <div
        className="max-w-xl h-[calc(100vh-4rem)] bg-white shadow-2xl p-8 overflow-y-auto relative">
          {/* Cerrar */}

          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-2xl text-gray-500 hover:text-red-500 transition"
          >
            ✕
          </button>

          {/* Encabezado */}

          <div className="flex items-center gap-5 mb-8">

            <div className="w-18 h-18 rounded-full bg-[#5B34F2] flex items-center justify-center text-4xl text-white">
              🏆
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#1C1C1C]">
                Nuevo reto
              </h2>

              <p className="text-gray-500">
                Completa la información para publicar un challenge.
              </p>
            </div>

          </div>

          {/* Nombre */}

          <div className="mb-6">

            <label className="block mb-1 font-semibold text-[#1C1C1C]">
              Nombre del reto
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingrese el nombre del reto"
              className="w-full border rounded-xl p-2 outline-none focus:ring-2 focus:ring-[#5B34F2] "
            />

          </div>

          {/* SKILLS */}
            <div className="mb-6">
                <label className="block mb-1 font-semibold text-[#1C1C1C]">
                    Skill a evaluar
                </label>

                <select
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    className=" w-full border rounded-xl p-2 outline-none focus:ring-2 focus:ring-[#5B34F2]"
                >
                    <option value="">Seleccione una habilidad</option>
                    <option value="Comunicación">Comunicación</option>
                    <option value="Liderazgo">Liderazgo</option>
                    <option value="Trabajo en equipo">Trabajo en equipo</option>
                    <option value="Resolución de problemas">Resolución de problemas</option>
                    <option value="Pensamiento crítico">Pensamiento crítico</option>
                    <option value="Creatividad">Creatividad</option>
                    <option value="Programación">Programación</option>
                </select>
                </div>
          {/* Descripción */}

          <div className="mb-6">

            <label className="block mb-1 font-semibold text-[#1C1C1C]">
              Descripción
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe el reto que deberán realizar los postulantes..."
              className="w-full border rounded-xl p-2 resize-none outline-none focus:ring-2 focus:ring-[#5B34F2]"
            />
          </div>

          {/* Botón */}
          <div className="flex justify-end">
            <button
              onClick={() => setShowConfirm(true)}
              disabled={!name.trim() || !description.trim()}
              className={`
                px-6
                py-3
                rounded-xl
                font-semibold
                transition

                ${
                  !name.trim() || !description.trim()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#5B34F2] text-white hover:bg-[#4320C9]"
                }
              `}
            >
              Publicar reto
            </button>

          </div>

        </div>
      </div>

      {/* Confirmación */}

      {showConfirm && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center">

          <div className="bg-white rounded-3xl p-8 w-[420px] shadow-xl">

            <h2 className="text-2xl font-bold mb-3">
              Confirmar publicación
            </h2>

            <p className="text-gray-600 mb-8">
              ¿Estás seguro de publicar este reto? Esta acción consumirá
              <span className="font-semibold"> 5 créditos.</span>
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowConfirm(false)}
                className="px-5 py-2 rounded-xl border"
              >
                Cancelar
              </button>

              <button
                onClick={handlePublish}
                className="px-5 py-2 rounded-xl bg-[#5B34F2] text-white hover:bg-[#4320C9]"
              >
                Sí, publicar
              </button>

            </div>

          </div>

        </div>
      )}

      {/* Éxito */}

      {showSuccess && (
        <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center">

          <div className="bg-white rounded-3xl p-10 w-[420px] text-center shadow-xl">

            <div className="text-6xl mb-4">
              🎉
            </div>

            <h2 className="text-2xl font-bold text-[#1C1C1C]">
              ¡Reto creado exitosamente!
            </h2>

            <p className="text-gray-500 mt-3 mb-8">
              El challenge ya está disponible para asignarlo a tus postulantes.
            </p>

            <button
              onClick={handleFinish}
              className="
                bg-[#5B34F2]
                hover:bg-[#4320C9]
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
              "
            >
              Aceptar
            </button>

          </div>

        </div>
      )}
    </>
  );
}
