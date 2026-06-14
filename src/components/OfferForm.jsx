import React, { useState, useEffect } from "react";
import useCrud from "../hooks/useCrud";

const LEVELS = ["básico", "intermedio", "avanzado"];

const EMPTY_FORM = {
  title:           "",
  job_type:        "Tiempo completo",
  location:        "Remoto",
  salary_range:    "No especificado",
  description:     "",
  deadline:        "",
  status:          "published",
  skills_required: [],
  required_levels: [],
  is_active:       true,
};

const JOB_TYPES = ["Tiempo completo", "Medio tiempo", "Contrato", "Prácticas", "Remoto"];

const STATUSES = [
  { value: "published", label: "Publicada"   },
  { value: "review",    label: "En revisión" },
  { value: "interview", label: "Entrevista"  },
  { value: "finished",  label: "Terminado"   },
];

const inputClass = (hasError) =>
  `w-full border rounded-lg px-3 py-2 text-sm text-[#1C1C1C] bg-white outline-none transition-colors ${
    hasError ? "border-[#ED7B32] focus:border-[#ED7B32]" : "border-gray-200 focus:border-[#1C6B72]"
  }`;

const OfferForm = ({ mode = "create", offer = null, onBack }) => {
  const [form, setForm]         = useState(EMPTY_FORM);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [apiError, setApiError] = useState(null);

  const [skills, setSkills]               = useState([]);
  const [skillSearch, setSkillSearch]     = useState("");
  const [skillsLoading, setSkillsLoading] = useState(true);

  const { insertModel, updateModel } = useCrud("/api/recruiter/jobs");
  const { getModel: getSkills }      = useCrud("/api/skill");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();
        setSkills(data.skills ?? []);
      } catch {
        setSkills([]);
      } finally {
        setSkillsLoading(false);
      }
    };
    fetchSkills();
  }, []);

  useEffect(() => {
    if (mode === "edit" && offer) {
      // skills puede venir como [{id, name}] o como [1, 2, 3] — normalizamos a IDs
      const skillIds = Array.isArray(offer.skills_required)
        ? offer.skills_required.map(s => typeof s === "object" ? s.id : s)
        : Array.isArray(offer.skills)
        ? offer.skills.map(s => typeof s === "object" ? s.id : s)
        : [];

      setForm({
        title:           offer.title           ?? "",
        job_type:        offer.job_type        ?? "Tiempo completo",
        location:        offer.location        ?? "Remoto",
        salary_range:    offer.salary_range    ?? "No especificado",
        description:     offer.description     ?? "",
        deadline:        offer.deadline        ? offer.deadline.slice(0, 10) : "",
        status:          offer.status          ?? "published",
        skills_required: skillIds,
        required_levels: offer.required_levels ?? [],
        is_active:       offer.is_active       ?? true,
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
    setApiError(null);
  }, [mode, offer]);

  const set = (field) => (e) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const toggleSkill = (skillId) => {
    setForm(prev => {
      const already = prev.skills_required.includes(skillId);
      return {
        ...prev,
        skills_required: already
          ? prev.skills_required.filter(id => id !== skillId)
          : [...prev.skills_required, skillId],
      };
    });
  };

  const toggleLevel = (level) => {
    setForm(prev => {
      const already = prev.required_levels.includes(level);
      return {
        ...prev,
        required_levels: already
          ? prev.required_levels.filter(l => l !== level)
          : [...prev.required_levels, level],
      };
    });
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim())                next.title           = "El título es obligatorio.";
    if (!form.location.trim())             next.location        = "La ubicación es obligatoria.";
    if (!form.description.trim())          next.description     = "La descripción es obligatoria.";
    if (!form.deadline)                    next.deadline        = "La fecha límite es obligatoria.";
    if (form.skills_required.length === 0) next.skills_required = "Selecciona al menos una habilidad.";
    if (form.required_levels.length === 0) next.required_levels = "Selecciona al menos un nivel.";
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
      salary_range:    form.salary_range.trim() || "No especificado",
      description:     form.description.trim(),
      deadline:        form.deadline,
      skills_required: form.skills_required,
      required_levels: form.required_levels,
      is_active:       form.is_active,
    };

    try {
      if (mode === "edit") {
        await updateModel(payload, `/api/recruiter/jobs/${offer.id}`);
      } else {
        await insertModel(payload);
      }
      onBack();
    } catch (err) {
      const detail = err?.response?.data?.detail;
      const msg = Array.isArray(detail)
        ? detail.map(d => d.msg).join(", ")
        : err?.response?.data?.message || "Ocurrió un error al guardar la oferta.";
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  };

  const isEdit = mode === "edit";
  const filteredSkills = skills.filter(s =>
    s.name.toLowerCase().includes(skillSearch.toLowerCase())
  );

  return (
    <>
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-[#5F6368] hover:text-[#1C6B72] transition-colors mb-3"
      >
        ← Volver a mis ofertas
      </button>

      <div className="flex items-center justify-between mb-4">
        <p className="text-[15px] font-medium text-[#1C1C1C]">
          {isEdit ? "Editar oferta" : "Nueva oferta laboral"}
        </p>
        <button className="flex items-center gap-2 h-9 px-4 rounded-lg border border-[#1C6B72] text-sm text-[#1C6B72] bg-white hover:bg-[#F0F4F8] transition-colors">
          ✨ Generar oferta con IA
        </button>
      </div>

      {apiError && (
        <div className="mb-4 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-sm text-[#ED7B32]">
          {apiError}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mb-4">

        <div className="col-span-2 flex flex-col gap-1">
          <label className="text-xs font-medium text-[#5F6368]">Título del puesto</label>
          <input
            type="text"
            placeholder="Ej: Desarrollador Backend Python"
            value={form.title}
            onChange={set("title")}
            className={inputClass(errors.title)}
          />
          {errors.title && <span className="text-[11px] text-[#ED7B32]">{errors.title}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#5F6368]">Modalidad</label>
          <select value={form.job_type} onChange={set("job_type")} className={inputClass(false)}>
            {JOB_TYPES.map(j => <option key={j}>{j}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#5F6368]">Estado</label>
          <select value={form.status} onChange={set("status")} className={inputClass(false)}>
            {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#5F6368]">Ubicación</label>
          <input
            type="text"
            placeholder="Ciudad o Remoto"
            value={form.location}
            onChange={set("location")}
            className={inputClass(errors.location)}
          />
          {errors.location && <span className="text-[11px] text-[#ED7B32]">{errors.location}</span>}
        </div>

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

        <div className="col-span-2 flex flex-col gap-1">
          <label className="text-xs font-medium text-[#5F6368]">Fecha límite</label>
          <input
            type="date"
            value={form.deadline}
            onChange={set("deadline")}
            className={inputClass(errors.deadline)}
          />
          {errors.deadline && <span className="text-[11px] text-[#ED7B32]">{errors.deadline}</span>}
        </div>

        <div className="col-span-2 flex flex-col gap-1">
          <label className="text-xs font-medium text-[#5F6368]">Niveles requeridos</label>
          <div className="flex gap-2">
            {LEVELS.map(level => {
              const active = form.required_levels.includes(level);
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => toggleLevel(level)}
                  className={`h-8 px-4 rounded-full text-xs font-medium border transition-colors capitalize ${
                    active
                      ? "bg-[#1C6B72] text-white border-[#1C6B72]"
                      : "bg-white text-[#5F6368] border-gray-200 hover:border-[#1C6B72] hover:text-[#1C6B72]"
                  }`}
                >
                  {level}
                </button>
              );
            })}
          </div>
          {errors.required_levels && <span className="text-[11px] text-[#ED7B32]">{errors.required_levels}</span>}
        </div>

        <div className="col-span-2 flex flex-col gap-1">
          <label className="text-xs font-medium text-[#5F6368]">
            Habilidades requeridas
            {form.skills_required.length > 0 && (
              <span className="ml-2 bg-[#1C6B72] text-white text-[10px] px-2 py-0.5 rounded-full">
                {form.skills_required.length} seleccionadas
              </span>
            )}
          </label>
          <input
            type="text"
            placeholder="Buscar habilidad..."
            value={skillSearch}
            onChange={e => setSkillSearch(e.target.value)}
            className={inputClass(errors.skills_required)}
          />
          {errors.skills_required && <span className="text-[11px] text-[#ED7B32]">{errors.skills_required}</span>}
          <div className="mt-1 max-h-36 overflow-y-auto border border-gray-200 rounded-lg bg-white p-2 flex flex-wrap gap-1.5">
            {skillsLoading ? (
              <span className="text-xs text-[#5F6368] p-1">Cargando habilidades...</span>
            ) : filteredSkills.length === 0 ? (
              <span className="text-xs text-[#5F6368] p-1">No se encontraron habilidades.</span>
            ) : (
              filteredSkills.map(skill => {
                const active = form.skills_required.includes(skill.id);
                return (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => toggleSkill(skill.id)}
                    className={`h-7 px-3 rounded-full text-[11px] font-medium border transition-colors ${
                      active
                        ? "bg-[#1C6B72] text-white border-[#1C6B72]"
                        : "bg-white text-[#5F6368] border-gray-200 hover:border-[#1C6B72] hover:text-[#1C6B72]"
                    }`}
                  >
                    {skill.name}
                    {skill.category ? <span className="ml-1 opacity-60">· {skill.category}</span> : null}
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div className="col-span-2 flex flex-col gap-1">
          <label className="text-xs font-medium text-[#5F6368]">Descripción del puesto</label>
          <textarea
            rows={5}
            placeholder="Describe las responsabilidades principales..."
            value={form.description}
            onChange={set("description")}
            className={inputClass(errors.description)}
          />
          {errors.description && <span className="text-[11px] text-[#ED7B32]">{errors.description}</span>}
        </div>

        {isEdit && (
          <div className="col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              checked={form.is_active}
              onChange={e => setForm(prev => ({ ...prev, is_active: e.target.checked }))}
              className="accent-[#1C6B72] w-4 h-4 cursor-pointer"
            />
            <label htmlFor="is_active" className="text-sm text-[#5F6368] cursor-pointer">
              Oferta activa
            </label>
          </div>
        )}
      </div>

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
          className="h-9 px-4 rounded-lg bg-[#1C6B72] text-sm text-white hover:bg-[#132E41] transition-colors disabled:opacity-60 flex items-center gap-2"
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