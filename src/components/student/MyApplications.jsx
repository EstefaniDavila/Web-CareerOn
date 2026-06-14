import React, { useState, useEffect } from 'react';
import useCrud from '../../hooks/useCrud';
import { FiMapPin, FiClock, FiCheckCircle, FiBriefcase } from 'react-icons/fi';

const COLUMNS = [
  { id: 'Pendiente', apiId: 'Pendiente', label: 'Postulado', color: 'bg-gray-100', text: 'text-gray-600' },
  { id: 'En_revision', apiId: 'En revision', label: 'En Revisión', color: 'bg-blue-50', text: 'text-blue-600' },
  { id: 'Entrevista', apiId: 'Entrevista', label: 'Entrevista', color: 'bg-purple-50', text: 'text-purple-600' },
  { id: 'Rechazado', apiId: 'Rechazado', label: 'Rechazado', color: 'bg-red-50', text: 'text-red-600' },
];

const BADGE = {
  'Pendiente': { label: 'Postulado', cls: 'bg-gray-100 text-gray-600', icon: '🕐' },
  'En revision': { label: 'En Revisión', cls: 'bg-blue-50 text-blue-800', icon: '👁' },
  'Entrevista': { label: 'Entrevista', cls: 'bg-purple-50 text-purple-800', icon: '👥' },
  'Rechazado': { label: 'Rechazado', cls: 'bg-red-50 text-red-800', icon: '✕' },
};

export default function MyApplications() {
  const { getModel, deleteModel } = useCrud('/api/student/applications');
  const [columns, setColumns] = useState(Object.fromEntries(COLUMNS.map(c => [c.id, []])));
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const results = await Promise.all(
          COLUMNS.map(col =>
            getModel(`/api/student/applications/${encodeURIComponent(col.apiId)}`).catch(() => [])
          )
        );
        const newCols = {};
        COLUMNS.forEach((col, i) => {
          const data = results[i];
          newCols[col.id] = Array.isArray(data) ? data : [];
        });
        setColumns(newCols);
      } catch (err) {
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const openDeleteModal = (app, columnId) => {
    setSelectedApplication({
      id: app.id,
      title: app.JobPost?.title,
      columnId
    });
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedApplication) return;

    try {
      setDeleting(true);

      await deleteModel(
        `/api/student/applications/${selectedApplication.id}`
      );

      setColumns(prev => ({
        ...prev,
        [selectedApplication.columnId]:
          prev[selectedApplication.columnId].filter(
            app => app.id !== selectedApplication.id
          )
      }));

      setShowDeleteModal(false);
      setSelectedApplication(null);

    } catch (error) {
      console.error(error);
      alert("No se pudo desvincular la postulación");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Mis Postulaciones</h1>
          <p className="text-gray-500">Da seguimiento a todos tus procesos de selección en un solo lugar.</p>
        </div>
        <div className="flex gap-6 h-[600px]">
          {COLUMNS.map(c => (
            <div key={c.id} className="min-w-[300px] bg-gray-50 rounded-2xl p-4 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
              <div className="space-y-3">
                <div className="h-24 bg-gray-200 rounded-xl" />
                <div className="h-24 bg-gray-200 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Mis Postulaciones</h1>
        <p className="text-gray-500">Da seguimiento a todos tus procesos de selección en un solo lugar.</p>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 h-[650px] snap-x">
        {COLUMNS.map(col => {
          const items = columns[col.id] ?? [];
          return (
            <div key={col.id} className="min-w-[300px] w-[300px] bg-white border border-gray-100 rounded-2xl flex flex-col snap-center shadow-sm">
              <div className={`p-4 border-b border-gray-100 flex items-center justify-between rounded-t-2xl ${col.color}`}>
                <h2 className={`font-bold ${col.text}`}>{col.label}</h2>
                <span className="bg-white text-gray-500 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                  {items.length}
                </span>
              </div>

              <div className="p-4 flex-1 overflow-y-auto space-y-4 bg-gray-50/50">
                {items.map(app => {
                  const job = app.JobPost ?? {};
                  console.log(app)
                  const badge = BADGE[app.status] ?? BADGE['Pendiente'];
                  console.log(app.status);
                  return (
                    <div
                      key={app.id}
                      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-[#1D9E75] cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 text-sm leading-snug mb-1.5">
                            {job.title ?? "—"}
                          </p>
                          <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full ${badge.cls}`}>
                            {badge.icon} {badge.label}
                          </span>
                        </div>
                        {app.status !== 'Rechazado' && (
                          <button
                            onClick={() => openDeleteModal(app, col.id)}
                            className="flex items-center gap-1 h-7 px-2.5 rounded-md border border-gray-200 text-xs text-gray-500 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors whitespace-nowrap flex-shrink-0"
                          >
                            ✕ Desvincular
                          </button>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        {job.location && (
                          <div className="flex items-center text-xs text-gray-500 gap-2">
                            <FiMapPin size={11} className="shrink-0" />
                            <span className="truncate">{job.location}</span>
                          </div>
                        )}
                        {job.salary_range && (
                          <div className="flex items-center text-xs text-gray-500 gap-2">
                            <FiBriefcase size={11} className="shrink-0" />
                            <span>{job.salary_range}</span>
                          </div>
                        )}
                        <div className="flex items-center text-xs text-gray-500 gap-2">
                          <FiClock size={11} className="shrink-0" />
                          <span>
                            Postulado:{" "}
                            {new Date(app.created_at ?? Date.now()).toLocaleDateString("es-PE")}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {items.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 p-6 text-center space-y-2 opacity-50">
                    <FiCheckCircle size={32} />
                    <p className="text-sm">No hay postulaciones en esta etapa</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">
                Desvincular postulación
              </h2>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4">

              <p className="text-sm text-gray-500 leading-relaxed">
                ¿Seguro que deseas desvincularte del siguiente proceso de selección?
              </p>

              <div className="bg-[#1D9E75]/5 border border-[#1D9E75]/20 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-800">
                  {selectedApplication?.title}
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                <p className="text-xs text-amber-700">
                  Esta acción eliminará tu postulación y no se podrá recuperar posteriormente.
                </p>
              </div>

            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">

              <button
                disabled={deleting}
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedApplication(null);
                }}
                className="px-4 py-2 text-sm rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-100 transition"
              >
                Cancelar
              </button>

              <button
                disabled={deleting}
                onClick={handleDelete}
                className="px-4 py-2 text-sm rounded-xl bg-[#1D9E75] text-white hover:bg-[#168764] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? "Desvinculando..." : "Desvincular"}
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}