import React, { useState, useEffect, useRef, useCallback } from "react";
import useCrud from "../hooks/useCrud";
import { useNavigate } from "react-router-dom";


const STATUS_CONFIG = {
  true: { label: "Activa", className: "bg-emerald-50 text-emerald-800" },
  false: { label: "Cerrada", className: "bg-red-50 text-red-800" },
};

const JOB_TYPE_LABELS = {
  full_time: "Tiempo completo",
  part_time: "Medio tiempo",
  contract: "Contrato",
  internship: "Prácticas",
  remote: "Remoto",
};

const OffersList = ({ onEdit, onDeletePick }) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("deadline_asc");
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [activeCount, setActiveCount] = useState(0);
  const limit = 10;

  const observer = useRef();

  const { getModel } = useCrud("/api/recruiter/jobs");

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchOffers = async (isLoadMore = false, currentOffset = 0) => {
    try {
      if (!isLoadMore) setLoading(true);
      const queryParams = `?limit=${limit}&offset=${currentOffset}&sort_by=${sortBy}${debouncedSearch ? `&search=${encodeURIComponent(debouncedSearch)}` : ""}`;
      const data = await getModel(queryParams);

      setHasMore(data.has_more ?? false);
      if (data.total_count !== undefined && !isLoadMore) {
      }

      if (isLoadMore) {
        setOffers(prev => [...prev, ...(data.jobs ?? [])]);
      } else {
        setOffers(data.jobs ?? []);
      }
    } catch (err) {
      setError("No se pudieron cargar las ofertas.");
      setHasMore(false); // Stop infinite loop
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setOffset(0);
    fetchOffers(false, 0);
  }, [debouncedSearch, sortBy]);

  const loadMore = () => {
    if (loading || !hasMore) return;
    const nextOffset = offset + limit;
    setOffset(nextOffset);
    fetchOffers(true, nextOffset);
  };

  const lastOfferElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, offset]);

  // Recalculate local activeCount based on loaded offers
  useEffect(() => {
    setActiveCount(offers.filter(o => o.is_active).length);
  }, [offers]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
    if (diff === 0) return "Hoy";
    if (diff === 1) return "Hace 1 día";
    return `Hace ${diff} días`;
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 px-4 py-3 animate-pulse">
            <div className="h-4 bg-gray-100 rounded w-2/3 mb-3" />
            <div className="h-3 bg-gray-100 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center py-10 text-sm text-red-500">{error}</p>
    );
  }


  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[15px] font-medium text-[#1C1C1C]">
          Mis ofertas publicadas
        </span>
        <span className="bg-[#1D9E75] text-white text-[11px] font-medium px-3 py-0.5 rounded-full">
          {activeCount} activas
        </span>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 h-9 border border-gray-200 rounded-lg px-3 text-sm text-[#1C1C1C] bg-white outline-none focus:border-[#1D9E75] transition-colors"
        />
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="h-9 px-3 border border-gray-200 rounded-lg text-sm text-[#5F6368] bg-white outline-none focus:border-[#1C6B72]"
        >
          <option value="deadline_asc">Próximas a vencer</option>
          <option value="created_desc">Creadas recientemente</option>
        </select>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {offers.length === 0 && !loading && (
          <p className="text-center py-10 text-sm text-[#5F6368]">
            No se encontraron ofertas.
          </p>
        )}

        {offers.map((offer, index) => {
          const st = STATUS_CONFIG[String(offer.is_active)] ?? STATUS_CONFIG["false"];
          const jobTypeLabel = JOB_TYPE_LABELS[offer.job_type] ?? offer.job_type ?? "—";
          const isLastElement = offers.length === index + 1;

          return (
            <div
              ref={isLastElement ? lastOfferElementRef : null}
              key={offer.id}
              className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex flex-col gap-2"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-medium text-[#1C1C1C] leading-snug">
                  {offer.title}
                </span>
                <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap ${st.className}`}>
                  {st.label}
                </span>
              </div>

              {/* Meta */}
              <div className="flex gap-3 flex-wrap">
                {offer.location && (
                  <span className="text-[11px] text-[#5F6368]">📍 {offer.location}</span>
                )}
                {offer.job_type && (
                  <span className="text-[11px] text-[#5F6368]">💼 {jobTypeLabel}</span>
                )}
                {offer.salary_range && (
                  <span className="text-[11px] text-[#5F6368]">💰 {offer.salary_range}</span>
                )}
                <span className="text-[11px] text-[#5F6368]">📅 {formatDate(offer.created_at)}</span>
                {offer.deadline && (
                  <span className="text-[11px] text-[#5F6368]">
                    ⏳ Cierra: {new Date(offer.deadline).toLocaleDateString("es-PE")}
                  </span>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-[#5F6368]">
                  <strong className="text-[#1D9E75]">{offer.applicants_count}</strong> postulantes
                </span>
                <div className="flex gap-2">
                  {offer.is_active ? (
                    <button
                      onClick={() => onEdit(offer)}
                      className="h-7 px-3 rounded-md border border-gray-200 bg-white text-xs text-[#5F6368] hover:bg-gray-100 transition-colors"
                    >
                      ✏ Editar
                    </button>
                  ) : (
                    <button className="h-7 px-3 rounded-md border border-gray-200 bg-white text-xs text-[#5F6368] hover:bg-gray-100 transition-colors">
                      ⧉ Duplicar
                    </button>
                  )}
                  <button
                    onClick={() => onDeletePick(offer)}
                    className="h-7 px-3 rounded-md bg-[#F25F63] text-xs text-white hover:bg-[#d94f53] transition-colors"
                  >
                    🗑 Eliminar
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/offers/${offer.id}`, {
                        state: { offer },
                      })
                    }
                    className="h-7 px-3 rounded-md bg-[#1C6B72] text-xs text-white hover:bg-[#155359] transition-colors font-medium flex items-center gap-1"
                  >
                    👁 Evaluar candidatos
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {loading && hasMore && (
          <div className="py-4 text-center">
            <div className="inline-block w-6 h-6 border-2 border-[#1C6B72] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default OffersList;
