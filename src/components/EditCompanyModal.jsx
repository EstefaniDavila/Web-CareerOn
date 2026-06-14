import { useEffect, useState } from "react";

export default function EditCompanyModal({
  open,
  company,
  onClose,
  onSave,
}) {

  const [formData, setFormData] = useState(company);

  useEffect(() => {
    setFormData(company);
  }, [company, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">

      <div
        className="
        w-full
        max-w-lg
        bg-white
        rounded-[28px]
        shadow-[0_20px_50px_rgba(0,0,0,.18)]
        overflow-hidden
      "
      >
        <div className="bg-[#1C6B72] px-5 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Editar empresa
            </h2>
            <p className="text-xs text-white/80 mt-1">
              Actualiza la información de tu empresa
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
            transition
          "
          >
            <i className="ti ti-x text-xl"></i>
          </button>

        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de empresa
              </label>

              <input
                className="
                w-full
                rounded-xl
                border border-gray-200
                px-4 py-2.5
                outline-none
                transition
                focus:border-[#1C6B72]
                focus:ring-4
                focus:ring-[#1C6B72]/10
              "
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cargo
                </label>
                <input
                  className="
                  w-full
                  rounded-xl
                  border border-gray-200
                  px-4 py-2.5
                  outline-none
                  transition
                  focus:border-[#1C6B72]
                  focus:ring-4
                  focus:ring-[#1C6B72]/10
                "
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      position: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ubicación
                </label>

                <input
                  className="
                  w-full
                  rounded-xl
                  border border-gray-200
                  px-4 py-2.5
                  outline-none
                  transition
                  focus:border-[#1C6B72]
                  focus:ring-4
                  focus:ring-[#1C6B72]/10
                "
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: e.target.value,
                    })
                  }
                />
              </div>

            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>

              <textarea
                rows={4}
                className="
                w-full
                rounded-xl
                border border-gray-200
                px-4 py-3
                resize-none
                outline-none
                transition
                focus:border-[#1C6B72]
                focus:ring-4
                focus:ring-[#1C6B72]/10
              "
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Misión
              </label>

              <textarea
                rows={3}
                className="
                w-full
                rounded-xl
                border border-gray-200
                px-4 py-3
                resize-none
                outline-none
                transition
                focus:border-[#1C6B72]
                focus:ring-4
                focus:ring-[#1C6B72]/10
              "
                value={formData.mission}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    mission: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visión
              </label>
              <textarea
                rows={3}
                className="
                w-full
                rounded-xl
                border border-gray-200
                px-4 py-3
                resize-none
                outline-none
                transition
                focus:border-[#1C6B72]
                focus:ring-4
                focus:ring-[#1C6B72]/10
              "
                value={formData.vision}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    vision: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="px-5 pb-5 pt-3 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
            px-4 py-2
            rounded-xl
            border border-gray-200
            text-gray-600
            hover:bg-gray-50
            transition
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
            transition
          "
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}