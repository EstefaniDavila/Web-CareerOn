import React, { useState, useEffect } from "react";

const EMPTY_FORM = {
  title: "",
  area: "Tecnología",
  modality: "Tiempo completo",
  location: "",
  salary: "",
  status: "active",
  description: "",
  requirements: "",
};

const AREAS = ["Tecnología", "Diseño", "Marketing", "Administración", "Finanzas", "Recursos Humanos"];
const MODALITIES = ["Tiempo completo", "Medio tiempo", "Freelance", "Prácticas"];
const STATUSES = [
  { value: "active", label: "Activa" },
  { value: "paused", label: "Pausada" },
  { value: "closed", label: "Cerrada" },
];

const inputClass = (hasError) =>
  `w-full border rounded-lg px-3 py-2 text-sm text-[#1C1C1C] bg-white outline-none transition-colors ${
    hasError
      ? "border-[#F25F63] focus:border-[#F25F63]"
      : "border-gray-200 focus:border-[#5B34F2]"
  }`;

const OfferForm = ({ mode = "create", offer = null, onBack }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === "edit" && offer) {
      setForm({
        title:        offer.title        ?? "",
        area:         offer.area         ?? "Tecnología",
        modality:     offer.type         ?? "Tiempo completo",
        location:     offer.location     ?? "",
        salary:       offer.salary       ?? "",
        status:       offer.status       ?? "active",
        description:  offer.description  ?? "",
        requirements: offer.requirements ?? "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [mode, offer]);

  const set = (field) => (e) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.title.trim())       next.title       = "El título es obligatorio.";
    if (!form.location.trim())    next.location    = "La ubicación es obligatoria.";
    if (!form.description.trim()) next.description = "La descripción es obligatoria.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    console.log("Guardar oferta:", form);
    onBack();
  };

  const isEdit = mode === "edit";

  return (
    <>
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-[#5F6368] hover:text-[#5B34F2] transition-colors mb-3"
      >
        ← Volver a mis ofertas
      </button>

      <p className="text-[15px] font-medium text-[#1C1C1C] mb-4">
        {isEdit ? "Editar oferta" : "Nueva oferta laboral"}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">

        {/* Título */}
        <div className="col-span-2 flex flex-col gap-1">
          <label className="text-xs font-medium text-[#5F6368]">Título del puesto</label>
          <input
            type="text"
            placeholder="Ej: Desarrollador Backend Python"
            value={form.title}
            onChange={set("title")}
            className={inputClass(errors.title)}
          />
          {errors.title && <span className="text-[11px] text-[#F25F63]">{errors.title}</span>}
        </div>

        {/* Área */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#5F6368]">Área</label>
          <select value={form.area} onChange={set("area")} className={inputClass(false)}>
            {AREAS.map(a => <option key={a}>{a}</option>)}
          </select>
        </div>

        {/* Modalidad */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#5F6368]">Modalidad</label>
          <select value={form.modality} onChange={set("modality")} className={inputClass(false)}>
            {MODALITIES.map(m => <option key={m}>{m}</option>)}
          </select>
        </div>

        {/* Ubicación */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#5F6368]">Ubicación</label>
          <input
            type="text"
            placeholder="Ciudad o Remoto"
            value={form.location}
            onChange={set("location")}
            className={inputClass(errors.location)}
          />
          {errors.location && <span className="text-[11px] text-[#F25F63]">{errors.location}</span>}
        </div>

        {/* Salario */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#5F6368]">Rango salarial</label>
          <input
            type="text"
            placeholder="Ej: S/. 3000 – 4500"
            value={form.salary}
            onChange={set("salary")}
            className={inputClass(false)}
          />
        </div>

        {/* Estado — solo en edición */}
        {isEdit && (
          <div className="col-span-2 flex flex-col gap-1">
            <label className="text-xs font-medium text-[#5F6368]">Estado de la oferta</label>
            <select value={form.status} onChange={set("status")} className={inputClass(false)}>
              {STATUSES.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        )}

        {/* Descripción */}
        <div className="col-span-2 flex flex-col gap-1">
          <label className="text-xs font-medium text-[#5F6368]">Descripción del puesto</label>
          <textarea
            rows={5}
            placeholder="Describe las responsabilidades principales..."
            value={form.description}
            onChange={set("description")}
            className={inputClass(errors.description)}
          />
          {errors.description && <span className="text-[11px] text-[#F25F63]">{errors.description}</span>}
        </div>

        {/* Requisitos */}
        <div className="col-span-2 flex flex-col gap-1">
          <label className="text-xs font-medium text-[#5F6368]">Requisitos</label>
          <textarea
            rows={4}
            placeholder="Experiencia mínima, habilidades técnicas, idiomas, etc."
            value={form.requirements}
            onChange={set("requirements")}
            className={inputClass(false)}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <button
          onClick={onBack}
          className="h-9 px-4 rounded-lg border border-gray-200 bg-white text-sm text-[#5F6368] hover:bg-gray-100 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          className="h-9 px-4 rounded-lg bg-[#5B34F2] text-sm text-white hover:bg-[#4320C9] transition-colors"
        >
          ✓ {isEdit ? "Guardar cambios" : "Publicar oferta"}
        </button>
      </div>
    </>
  );
};

export default OfferForm;
