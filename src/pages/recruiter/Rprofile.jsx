import { useState } from "react";
import EditCompanyModal from "../../components/EditCompanyModal";
import EditRecruiterModal from "../../components/EditRecruiterModal";

export default function Rprofile() {
    const [company, setCompany] = useState({
        name: "Yape Perú",
        position: "Cobrador de cupos",
        location: "Lima, Perú",
        description: `Yape es la billetera digital del BCP, líder en pagos móviles en el Perú.
    Conectamos a millones de personas con servicios financieros simples, rápidos y sin comisiones.`,
        mission: "nuestra mision es mandar a infocorp a usuarios estupidos con nuestros creditos sabrosos",
        vision: "vision un poco mala debido al astigmatismo",
    });

    const [editingRecruiter, setEditingRecruiter] = useState(false);

    const [recruiter, setRecruiter] = useState({
    name: "Carlos Ramírez",
    position: "Talent Acquisition Specialist",
    email: "c.ramirez@yape.com.pe"
    });

    const initials = company.name.substring(0, 2).toUpperCase();
    const [editingCompany, setEditingCompany] = useState(false);
    const recruiterInitials = recruiter.name
  .split(" ")
  .map(word => word[0])
  .slice(0, 2)
  .join("")
  .toUpperCase();

    return (
        <div className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-5 items-start">

                {/* Columna izquierda */}
                <div className="flex flex-col gap-5">

                    {/* Card empresa */}
                    <div className="bg-white border border-black/10 rounded-xl overflow-hidden">
                        <div className="h-20 bg-[#1C6B72] relative">
                            <div
                                className="
                absolute bottom-[-26px] left-5
                w-[52px] h-[52px]
                rounded-lg bg-white border-2 border-black/10
                flex items-center justify-center
                text-[18px] font-medium text-[#132E41]
              "
                            >
                                {initials}
                            </div>
                        </div>

                        <div className="pt-9 px-5 pb-5">
                            <div className="flex items-start justify-between mb-3">

                                <div>
                                    <p className="text-lg font-medium mb-1">
                                        {company.name}
                                    </p>

                                    <p className="text-xs text-gray-500 flex items-center gap-[10px] flex-wrap">
                                        <i className="ti ti-building" />
                                        {company.position}

                                        <span>·</span>

                                        <i className="ti ti-map-pin" />
                                        {company.location}

                                        <span>·</span>
                                    </p>
                                </div>

                                <button
                                    onClick={() => setEditingCompany(true)}
                                    className="
                        flex items-center gap-[5px]
                        px-3 py-[5px]
                        text-xs
                        border border-black/25
                        rounded-lg
                        text-gray-500
                        whitespace-nowrap shrink-0
                        hover:bg-gray-50 hover:text-gray-900
                    "
                                >
                                    <i className="ti ti-edit" />
                                    Editar empresa
                                </button>
                            </div>

                            <p className="text-[13px] text-gray-500 leading-[1.65] mb-4">
                                <b>Descripcion</b><br />
                                {company.description}
                            </p>

                            <p className="text-[13px] text-gray-500 leading-[1.65] mb-4">
                                <b>Mision</b><br />
                                {company.mission}
                            </p>

                            <p className="text-[13px] text-gray-500 leading-[1.65] mb-4">
                                <b>Vision</b><br />
                                {company.vision}
                            </p>

                            {/* Métricas */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">

                                <div className="bg-gray-50 rounded-lg px-3 py-[10px]">
                                    <p className="text-[11px] text-gray-500 mb-[3px]">
                                        Ofertas activas
                                    </p>
                                    <p className="text-[20px] font-medium">
                                        3
                                    </p>
                                </div>

                                <div className="bg-gray-50 rounded-lg px-3 py-[10px]">
                                    <p className="text-[11px] text-gray-500 mb-[3px]">
                                        Postulantes
                                    </p>
                                    <p className="text-[20px] font-medium">
                                        47
                                    </p>
                                </div>

                                <div className="bg-gray-50 rounded-lg px-3 py-[10px]">
                                    <p className="text-[11px] text-gray-500 mb-[3px]">
                                        En proceso
                                    </p>
                                    <p className="text-[20px] font-medium">
                                        4
                                    </p>
                                </div>

                                <div className="bg-gray-50 rounded-lg px-3 py-[10px]">
                                    <p className="text-[11px] text-gray-500 mb-[3px]">
                                        Contratados
                                    </p>
                                    <p className="text-[20px] font-medium">
                                        12
                                    </p>
                                </div>

                            </div>

                            <div className="border-t border-black/10 my-4"></div>

                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-[0.06em] mb-3">
                                Redes sociales
                            </p>

                            <div className="flex gap-[6px] flex-wrap">

                                <a
                                    href="#"
                                    className="
                  inline-flex items-center gap-[5px]
                  px-[10px] py-1
                  text-[11px]
                  text-gray-500
                  border border-black/10
                  rounded-full
                  bg-white
                  hover:bg-gray-50 hover:text-gray-900
                "
                                >
                                    <i className="ti ti-brand-linkedin" />
                                    LinkedIn
                                </a>

                                <a
                                    href="#"
                                    className="
                  inline-flex items-center gap-[5px]
                  px-[10px] py-1
                  text-[11px]
                  text-gray-500
                  border border-black/10
                  rounded-full
                  bg-white
                  hover:bg-gray-50 hover:text-gray-900
                "
                                >
                                    <i className="ti ti-world" />
                                    yape.com.pe
                                </a>

                                <a
                                    href="#"
                                    className="
                  inline-flex items-center gap-[5px]
                  px-[10px] py-1
                  text-[11px]
                  text-gray-500
                  border border-black/10
                  rounded-full
                  bg-white
                  hover:bg-gray-50 hover:text-gray-900
                "
                                >
                                    <i className="ti ti-brand-instagram" />
                                    @yape.pe
                                </a>

                                <a
                                    href="#"
                                    className="
                                        inline-flex items-center gap-[5px]
                                        px-[10px] py-1
                                        text-[11px]
                                        text-gray-500
                                        border border-black/10
                                        rounded-full
                                        bg-white
                                        hover:bg-gray-50 hover:text-gray-900
                                    "
                                >
                                    <i className="ti ti-brand-x" />
                                    @YapePeru
                                </a>

                            </div>
                        </div>
                    </div>

                    {/* Reclutador */}
                    <div className="bg-white border border-black/10 rounded-xl p-5">

                        <div className="flex justify-between items-start mb-4">

                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-[0.06em]">
                                Reclutador responsable
                            </p>

                            <button
                                onClick={() => setEditingRecruiter(true)}
                                className="
                                    flex items-center gap-[5px]
                                    px-3 py-[5px]
                                    text-xs
                                    border border-black/25
                                    rounded-lg  
                                    text-gray-500
                                    hover:bg-gray-50 hover:text-gray-900
                                "
                            >
                                <i className="ti ti-edit" />
                                Editar
                            </button>

                        </div>

                        <div className="flex items-center gap-3">

                            <div className="
                                w-11 h-11
                                rounded-full
                                bg-[#F0F4F8]
                                flex items-center justify-center
                                text-sm font-medium
                                text-[#085041]
                            ">
                                {recruiterInitials}
                            </div>

                            <div>
                                <p className="text-[15px] font-medium mb-[2px]">
                                    {recruiter.name}
                                </p>

                                <p className="text-xs text-gray-500 mb-[6px]">
                                    {recruiter.position}
                                </p>

                                <span className="inline-flex items-center gap-[5px] text-xs text-gray-500">
                                    <i className="ti ti-mail" />
                                    {recruiter.email}
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Columna derecha */}
                <div className="
          bg-white
          border border-black/10
          rounded-xl
          p-5
          flex items-center justify-center
          min-h-[300px] md:min-h-[420px]
        ">
                    <img src="/src/assets/pengueno.png" alt="" />
                </div>

            </div>
            <EditCompanyModal
                open={editingCompany}
                company={company}
                onClose={() => setEditingCompany(false)}
                onSave={setCompany}
            />
            <EditRecruiterModal
                open={editingRecruiter}
                recruiter={recruiter}
                onClose={() => setEditingRecruiter(false)}
                onSave={setRecruiter}
            />
        </div>

    );
}
