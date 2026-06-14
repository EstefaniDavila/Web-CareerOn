import { useEffect, useState } from "react";

export default function EditRecruiterModal({
  open,
  recruiter,
  onClose,
  onSave
}) {

  const [formData, setFormData] = useState(recruiter);

  useEffect(() => {
    setFormData(recruiter);
  }, [recruiter, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="
        w-full
        max-w-md
        bg-white
        rounded-[28px]
        shadow-[0_20px_50px_rgba(0,0,0,.18)]
        overflow-hidden
      ">

        {/* Header */}
        <div className="bg-[#1C6B72] px-5 py-4 flex justify-between items-center">

          <div>
            <h2 className="text-lg font-semibold text-white">
              Editar reclutador
            </h2>

            <p className="text-xs text-white/80 mt-1">
              Información del responsable
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              w-9 h-9
              rounded-full
              flex items-center justify-center
              text-white
              hover:bg-white/20
            "
          >
            <i className="ti ti-x text-xl"></i>
          </button>

        </div>

        {/* Body */}
        <div className="p-5 space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre
            </label>

            <input
              className="
                w-full rounded-xl border border-gray-200
                px-4 py-2.5 outline-none
                focus:border-[#1C6B72]
                focus:ring-4 focus:ring-[#1C6B72]/10
              "
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cargo
            </label>

            <input
              className="
                w-full rounded-xl border border-gray-200
                px-4 py-2.5 outline-none
                focus:border-[#1C6B72]
                focus:ring-4 focus:ring-[#1C6B72]/10
              "
              value={formData.position}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  position: e.target.value
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>

            <input
              className="
                w-full rounded-xl border border-gray-200
                px-4 py-2.5 outline-none
                focus:border-[#1C6B72]
                focus:ring-4 focus:ring-[#1C6B72]/10
              "
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value
                })
              }
            />
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 pb-5 pt-2 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="
              px-4 py-2
              border border-gray-200
              rounded-xl
              text-gray-600
              hover:bg-gray-50
            "
          >
            Cancelar
          </button>

          <button
            onClick={() => {
              onSave(formData);
              onClose();
            }}
            className="
              px-5 py-2
              rounded-xl
              bg-[#1C6B72]
              text-white
              hover:bg-[#17815f]
              shadow-lg shadow-[#1C6B72]/20
            "
          >
            Guardar cambios
          </button>

        </div>

      </div>

    </div>
  );
}