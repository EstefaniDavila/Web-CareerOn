import React, { useState, useEffect } from "react";
import useCrud from "../hooks/useCrud";

const EMPTY_FORM = {
  title:          "",
  job_type:       "full_time",
  location:       "",
  salary_range:   "",
  description:    "",
  deadline:       "",
  is_active:      true,
  skills_required: "",
  required_levels: "",
  status:         "published",
};

const JOB_TYPES = [
  { value: "full_time",  label: "Tiempo completo" },
  { value: "part_time",  label: "Medio tiempo" },
  { value: "contract",   label: "Contrato" },
  { value: "internship", label: "Prácticas" },
  { value: "remote",     label: "Remoto" },
];

const STATUSES = [
  { value: "published", label: "Publicada" },
  { value: "review",    label: "En revisión" },
  { value: "interview", label: "Entrevista" },
  { value: "finished",  label: "Terminado" },
];

const inputClass = (hasError) =>
  `w-full border rounded-lg px-3 py-2 text-sm text-[#1C1C1C] bg-white outline-none transition-colors ${
    hasError
      ? "border-[#F25F63] focus:border-[#F25F63]"
      : "border-gray-200 focus:border-[#1D9E75]"
  }`;

const OfferForm = ({ mode = "create", offer = null, onBack }) => {
  const [form, setForm]       = useState(EMPTY_FORM);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const { insertModel, updateModel } = useCrud("/api/recruiter/jobs");

  useEffect(() => {
    if (mode === "edit" && offer) {
      setForm({
        title:           offer.title           ?? "",
        job_type:        offer.job_type        ?? "full_time",
        location:        offer.location        ?? "",
        salary_range:    offer.salary_range    ?? "",
        description:     offer.description     ?? "",
        deadline:        offer.deadline        ? offer.deadline.slice(0, 10) : "",
        is_active:       offer.is_active       ?? true,
        status:          offer.status          ?? "published",
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
    setApiError(null);
  }, [mode, offer]);

  const set = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim())           next.title           = "El título es obligatorio.";
    if (!form.location.trim())        next.location        = "La ubicación es obligatoria.";
    if (!form.description.trim())     next.description     = "La descripción es obligatoria.";
    if (!form.deadline)               next.deadline        = "La fecha límite es obligatoria.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setApiError(null);

    const payload = {
      title:           form.title.trim(),
      job_type:        form.job_type,
      location:        form.location.trim(),
      salary_range:    form.salary_range.trim(),
      description:     form.description.trim(),
      deadline:        form.deadline,
      is_active:       true,
      skills_required: form.skills_required.trim(),
      required_levels: form.required_levels.trim(),
      status:          form.status,
    };

    try {
      if (mode === "edit") {
        await updateModel(payload, `/api/recruiter/jobs/${offer.id}`);
      } else {
        await insertModel(payload);
      }
      onBack();
    } catch (err) {
      setApiError(err?.response?.data?.message || "Ocurrió un error al guardar la oferta.");
    } finally {
      setLoading(false);
    }
  };

  const isEdit = mode === "edit";

  return (
    <>
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-[#5F6368] hover:text-[#1D9E75] transition-colors mb-3"
      >
        ← Volver a mis ofertas
      </button>

      {/* Header con botón IA */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[15px] font-medium text-[#1C1C1C]">
          {isEdit ? "Editar oferta" : "Nueva oferta laboral"}
        </p>
        <button className="flex items-center gap-2 h-9 px-4 rounded-lg border border-[#1D9E75] text-sm text-[#1D9E75] bg-white hover:bg-[#E1F5EE] transition-colors">
          ✨ Generar oferta con IA
        </button>
      </div>

      {apiError && (
        <div className="mb-4 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-sm text-[#F25F63]">
          {apiError}
        </div>
      )}

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

        {/* Modalidad */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#5F6368]">Modalidad</label>
          <select value={form.job_type} onChange={set("job_type")} className={inputClass(false)}>
            {JOB_TYPES.map(j => (
              <option key={j.value} value={j.value}>{j.label}</option>
            ))}
          </select>
        </div>

        {/* Estado */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#5F6368]">Estado</label>
          <select value={form.status} onChange={set("status")} className={inputClass(false)}>
            {STATUSES.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
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
            value={form.salary_range}
            onChange={set("salary_range")}
            className={inputClass(false)}
          />
        </div>

        {/* Fecha límite */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#5F6368]">Fecha límite</label>
          <input
            type="date"
            value={form.deadline}
            onChange={set("deadline")}
            className={inputClass(errors.deadline)}
          />
          {errors.deadline && <span className="text-[11px] text-[#F25F63]">{errors.deadline}</span>}
        </div>

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

        {/* is_active solo en edición */}
        {isEdit && (
          <div className="col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              checked={form.is_active}
              onChange={set("is_active")}
              className="accent-[#1D9E75] w-4 h-4 cursor-pointer"
            />
            <label htmlFor="is_active" className="text-sm text-[#5F6368] cursor-pointer">
              Oferta activa
            </label>
          </div>
        )}

      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <button
          onClick={onBack}
          disabled={loading}
          className="h-9 px-4 rounded-lg border border-gray-200 bg-white text-sm text-[#5F6368] hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="h-9 px-4 rounded-lg bg-[#1D9E75] text-sm text-white hover:bg-[#0F6E56] transition-colors disabled:opacity-60 flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Guardando...
            </>
          ) : (
            <>✓ {isEdit ? "Guardar cambios" : "Publicar oferta"}</>
          )}
        </button>
      </div>
    </>
  );
};

export default OfferForm;
