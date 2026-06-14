import React, { useState, useEffect } from "react";
import api from "../services/api";

const EMPTY_FORM = {
  title: "",
  area: "Tecnología",
  modality: "Tiempo completo",
  location: "",
  salary: "",
  deadline: "",
  status: "publicada",
  description: "",
  requirements: "",
};

const AREAS = ["Tecnología", "Diseño", "Marketing", "Administración", "Finanzas", "Recursos Humanos"];
const MODALITIES = ["Tiempo completo", "Medio tiempo", "Freelance", "Prácticas"];
const STATUSES = [
  { value: "publicada", label: "Publicada" },
  { value: "en revision", label: "En revisión" },
  { value: "entrevista", label: "Entrevista" },
  { value: "terminada", label: "Terminada" },
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
  const [allSkills, setAllSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [pickerSkillId, setPickerSkillId] = useState("");
  const [pickerLevel, setPickerLevel] = useState("Intermedio");
  const [submitting, setSubmitting] = useState(false);

  // Fetch all available skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get("/skill");
        if (response.data && response.data.status === "success") {
          setAllSkills(response.data.skills);
          if (response.data.skills.length > 0) {
            setPickerSkillId(response.data.skills[0].id.toString());
          }
        }
      } catch (err) {
        console.error("Error al cargar habilidades:", err);
      }
    };
    fetchSkills();
  }, []);

  // Prepopulate form if editing
  useEffect(() => {
    if (mode === "edit" && offer) {
      setForm({
        title:        offer.title        ?? "",
        area:         offer.area         ?? "Tecnología",
        modality:     offer.job_type     ?? "Tiempo completo",
        location:     offer.location     ?? "",
        salary:       offer.salary_range ?? "",
        deadline:     offer.deadline ? offer.deadline.substring(0, 10) : "",
        status:       offer.status       ?? "publicada",
        description:  offer.description  ?? "",
        requirements: offer.requirements ?? "",
      });
      setSelectedSkills(offer.skills || []);
    } else {
      setForm(EMPTY_FORM);
      setSelectedSkills([]);
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
    if (selectedSkills.length === 0) {
      next.skills = "Debes agregar al menos una habilidad requerida.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleAddSkill = () => {
    if (!pickerSkillId) return;
    const skillObj = allSkills.find(s => s.id.toString() === pickerSkillId.toString());
    if (!skillObj) return;

    // Avoid duplicates
    if (selectedSkills.some(s => s.id.toString() === pickerSkillId.toString())) {
      return;
    }

    setSelectedSkills(prev => [
      ...prev,
      {
        id: skillObj.id,
        name: skillObj.name,
        level: pickerLevel,
      }
    ]);
  };

  const handleRemoveSkill = (idToRemove) => {
    setSelectedSkills(prev => prev.filter(s => s.id.toString() !== idToRemove.toString()));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);

    try {
      const payload = {
        title: form.title,
        description: form.description,
        location: form.location,
        job_type: form.modality,
        salary_range: form.salary || "No especificado",
        deadline: form.deadline ? new Date(form.deadline).toISOString() : null,
        skills_required: selectedSkills.map(s => s.id),
        required_levels: selectedSkills.map(s => s.level),
      };

      if (mode === "create") {
        const response = await api.post("/recruiter/jobs", payload);
        if (response.data && response.data.status === "success") {
          onBack();
        }
      } else {
        // If edit was implemented on backend: api.put(`/recruiter/jobs/${offer.id}`, payload)
        // For now, since editing is not fully backed in recruiter.py router, we show a success log or placeholder.
        console.log("Guardar edición de oferta:", offer.id, payload);
        onBack();
      }
    } catch (err) {
      console.error("Error al publicar la oferta:", err);
      alert("Hubo un error al procesar tu solicitud: " + (err.response?.data?.detail || err.message));
    } finally {
      setSubmitting(false);
    }
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

        {/* Fecha límite */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#5F6368]">Fecha Límite</label>
          <input
            type="date"
            value={form.deadline}
            onChange={set("deadline")}
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
            rows={4}
            placeholder="Describe las responsabilidades principales..."
            value={form.description}
            onChange={set("description")}
            className={inputClass(errors.description)}
          />
          {errors.description && <span className="text-[11px] text-[#F25F63]">{errors.description}</span>}
        </div>

        {/* Habilidades requeridas (Skills Selector) */}
        <div className="col-span-2 border border-gray-100 rounded-xl p-3 bg-gray-50 flex flex-col gap-3">
          <label className="text-xs font-bold text-gray-700">Habilidades Técnicas / Blandas Requeridas</label>
          
          <div className="flex gap-2 items-end">
            <div className="flex-1 flex flex-col gap-1">
              <span className="text-[10px] text-gray-500">Habilidad</span>
              <select 
                value={pickerSkillId} 
                onChange={e => setPickerSkillId(e.target.value)} 
                className="w-full border border-gray-200 rounded-lg p-2 text-xs outline-none bg-white"
              >
                {allSkills.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.category})</option>
                ))}
              </select>
            </div>
            
            <div className="w-32 flex flex-col gap-1">
              <span className="text-[10px] text-gray-500">Nivel mínimo</span>
              <select 
                value={pickerLevel} 
                onChange={e => setPickerLevel(e.target.value)} 
                className="w-full border border-gray-200 rounded-lg p-2 text-xs outline-none bg-white"
              >
                <option value="Básico">Básico</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>
            
            <button 
              type="button" 
              onClick={handleAddSkill}
              className="h-9 px-4 bg-[#5B34F2] text-white text-xs font-bold rounded-lg hover:bg-[#4320C9]"
            >
              + Agregar
            </button>
          </div>

          {errors.skills && <span className="text-[11px] text-[#F25F63]">{errors.skills}</span>}

          {/* Selected Skills Tags */}
          <div className="flex flex-wrap gap-2 mt-1">
            {selectedSkills.length === 0 ? (
              <span className="text-xs text-gray-400 italic">No has agregado ninguna habilidad aún.</span>
            ) : (
              selectedSkills.map(s => (
                <div key={s.id} className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 text-xs text-gray-800 rounded-full shadow-sm">
                  <span><strong>{s.name}</strong> ({s.level})</span>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveSkill(s.id)}
                    className="text-red-500 font-bold hover:text-red-700 w-4 h-4 flex items-center justify-center rounded-full hover:bg-red-50"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
        <button
          onClick={onBack}
          disabled={submitting}
          className="h-9 px-4 rounded-lg border border-gray-200 bg-white text-sm text-[#5F6368] hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="h-9 px-4 rounded-lg bg-[#5B34F2] text-sm text-white hover:bg-[#4320C9] transition-colors disabled:opacity-50 flex items-center gap-1.5"
        >
          {submitting ? (
            <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></span>
          ) : "✓"}
          {isEdit ? "Guardar cambios" : "Publicar oferta"}
        </button>
      </div>
    </>
  );
};

export default OfferForm;
