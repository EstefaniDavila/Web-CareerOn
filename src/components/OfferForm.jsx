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
      <div className="form-back" onClick={onBack}>
        <span className="back-arrow">←</span> Volver a mis ofertas
      </div>

      <div className="form-title">
        {isEdit ? "Editar oferta" : "Nueva oferta laboral"}
      </div>

      <div className="form-section">

        <div className="form-row">
          <div className="form-group full">
            <label htmlFor="f-title">Título del puesto</label>
            <input
              id="f-title"
              type="text"
              placeholder="Ej: Desarrollador Backend Python"
              value={form.title}
              onChange={set("title")}
              className={errors.title ? "input-error" : ""}
            />
            {errors.title && <span className="field-error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="f-area">Área</label>
            <select id="f-area" value={form.area} onChange={set("area")}>
              {AREAS.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="f-modality">Modalidad</label>
            <select id="f-modality" value={form.modality} onChange={set("modality")}>
              {MODALITIES.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="f-location">Ubicación</label>
            <input
              id="f-location"
              type="text"
              placeholder="Ciudad o Remoto"
              value={form.location}
              onChange={set("location")}
              className={errors.location ? "input-error" : ""}
            />
            {errors.location && <span className="field-error">{errors.location}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="f-salary">Rango salarial</label>
            <input
              id="f-salary"
              type="text"
              placeholder="Ej: S/. 3000 – 4500"
              value={form.salary}
              onChange={set("salary")}
            />
          </div>

          {isEdit && (
            <div className="form-group full">
              <label htmlFor="f-status">Estado de la oferta</label>
              <select id="f-status" value={form.status} onChange={set("status")}>
                {STATUSES.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group full">
            <label htmlFor="f-desc">Descripción del puesto</label>
            <textarea
              id="f-desc"
              rows={5}
              placeholder="Describe las responsabilidades principales..."
              value={form.description}
              onChange={set("description")}
              className={errors.description ? "input-error" : ""}
            />
            {errors.description && <span className="field-error">{errors.description}</span>}
          </div>

          <div className="form-group full">
            <label htmlFor="f-req">Requisitos</label>
            <textarea
              id="f-req"
              rows={4}
              placeholder="Experiencia mínima, habilidades técnicas, idiomas, etc."
              value={form.requirements}
              onChange={set("requirements")}
            />
          </div>
        </div>

        <div className="form-actions">
          <button className="btn" onClick={onBack}>Cancelar</button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            ✓ {isEdit ? "Guardar cambios" : "Publicar oferta"}
          </button>
        </div>

      </div>
    </>
  );
};

export default OfferForm;
