import React from "react";

const Challenge  = () => {

    return(
        <div className="bg-white rounded-3xl shadow-md p-6 sticky top-6">

            <div className="flex items-center gap-3 mb-4">

                <div className="w-12 h-12 rounded-xl bg-[#5B34F2] flex items-center justify-center text-white text-2xl">
                🏆
                </div>

                <div>
                <h2 className="font-bold text-xl text-[#1C1C1C]">
                    Challenge
                </h2>

                <p className="text-sm text-[#5F6368]">
                    Evalúa el talento
                </p>
                </div>

            </div>

            <p className="text-[#5F6368] leading-relaxed mb-6">
                Asigna un reto a tus postulantes para conocer sus habilidades ocultas y
                evaluar su desempeño antes de la entrevista.
            </p>

            <div className="group relative inline-block w-full">

                <button
                className="
                    w-full
                    py-3
                    rounded-xl
                    bg-[#5B34F2]
                    text-white
                    font-semibold
                    hover:bg-[#4320C9]
                    transition
                "
                >
                + Nuevo reto
                </button>

                {/* Tooltip */}

                <div
                className="
                    absolute
                    left-1/2
                    -translate-x-1/2
                    mt-2
                    opacity-0
                    group-hover:opacity-100
                    transition
                    pointer-events-none
                    bg-[#1C1C1C]
                    text-white
                    text-xs
                    rounded-lg
                    px-3
                    py-2
                    whitespace-nowrap
                "
                >
                Crear un reto cuesta 5 créditos
                </div>

            </div>

            </div>
    );

}

export default Challenge;