import React from "react";

export default function ProfileModal({ applicant, onClose }) {
  if (!applicant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 relative">

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-2xl text-gray-500 hover:text-red-500 transition"
        >
          ✕
        </button>

        {/* Encabezado */}
        <div className="flex items-center gap-5 mb-8">

          <div className="w-20 h-20 rounded-full bg-[#5B34F2] text-white flex items-center justify-center text-3xl font-bold">

            {applicant.name
              .split(" ")
              .map((n) => n[0])
              .join("")}

          </div>

          <div>

            <h2 className="text-3xl font-bold text-[#1C1C1C]">
              {applicant.name}
            </h2>

            <p className="text-[#5F6368]">
              {applicant.career}
            </p>
           
            <span className="inline-block mt-2 bg-[#0F6C7A] text-white px-3 py-1 rounded-full text-sm">
              Ciclo {applicant.cycle}
            </span>
          </div>

        </div>

        <div className="mb-6">

          <h3 className="font-bold text-lg text-[#1C1C1C] mb-3">
            Medio de contacto
          </h3>
           <div className="flex flex-wrap gap-2">
            <span className="inline-block mt-2 bg-[#0F6C7A] text-white px-3 py-1 rounded-full text-sm">
             {applicant.email}
            </span>
            <span className="inline-block mt-2 bg-[#0F6C7A] text-white px-3 py-1 rounded-full text-sm">
             {applicant.cellphone}
            </span>
          </div>
        </div>

        {/* Habilidades blandas */}

        <div className="mb-6">

          <h3 className="font-bold text-lg text-[#1C1C1C] mb-3">
            Habilidades blandas
          </h3>

          <div className="flex flex-wrap gap-2">

            {applicant.softSkills.map((skill) => (
              <span
                key={skill}
                className="bg-[#F3F3F3] text-[#1C1C1C] px-3 py-2 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}

          </div>

        </div>

        {/* Conocimientos */}

        <div className="mb-8">

          <h3 className="font-bold text-lg text-[#1C1C1C] mb-3">
            Conocimientos
          </h3>

          <div className="flex flex-wrap gap-2">

            {applicant.knowledge.map((item) => (
              <span
                key={item}
                className="bg-[#DCE5EC] text-[#0F6C7A] px-3 py-2 rounded-full text-sm font-medium"
              >
                {item}
              </span>
            ))}

          </div>

        </div>

        {/* Botón */}

        <div className="flex justify-end">

          <button
            className="
              bg-[#5B34F2]
              hover:bg-[#4320C9]
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            📄 Descargar CV
          </button>

        </div>

      </div>

    </div>
  );
}