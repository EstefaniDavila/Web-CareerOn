import React, { useState } from "react";
import CreateModal from "../../../composables/Recutrier/Postulation/Challengecreatemodal";
import ViewChallengeModal from "../../../composables/Recutrier/Postulation/Chellengeview";

const MAX_CHALLENGES = 3;

const Challenge = () => {
  const [openCreate, setOpenCreate] = useState(false);

  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const [challenges, setChallenges] = useState([
    // Ejemplo:
    // {
    //   id: 1,
    //   name: "Reto Frontend",
    //   description: "Crear una landing responsive."
    // }
  ]);

  const handleCreate = (newChallenge) => {
    setChallenges((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newChallenge,
      },
    ]);
  };
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-3xl shadow-md p-6 sticky top-6">

        {/* Header */}

        <div className="flex items-center gap-3 mb-4">

          <div className="w-12 h-12 rounded-xl bg-[#1C6B72] flex items-center justify-center text-white text-2xl">
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
          Asigna un reto a tus postulantes para conocer sus habilidades ocultas
          y evaluar su desempeño antes de la entrevista.
        </p>

        {/* Botón */}

        <div className="group relative inline-block w-full mb-6">

          <button
            onClick={() => setOpenCreate(true)}
            disabled={challenges.length >= MAX_CHALLENGES}
            className={`
              w-full
              py-3
              rounded-xl
              font-semibold
              transition

              ${
                challenges.length >= MAX_CHALLENGES
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#1C6B72] text-white hover:bg-[#132E41]"
              }
            `}
          >
            + Nuevo reto
          </button>

          {challenges.length < MAX_CHALLENGES && (
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
          )}

        </div>

        {/* Lista */}

        <div className="space-y-3">

          {Array.from({ length: MAX_CHALLENGES }).map((_, index) => {
            const challenge = challenges[index];

            if (challenge) {
              return (
                <button
                  key={challenge.id}
                  onClick={() => {
                    setSelectedChallenge(challenge);
                    setOpenModal(true);
                    }}
                  className="
                    w-full
                    p-4
                    rounded-xl
                    bg-[#F4F1FF]
                    border
                    border-[#1C6B72]
                    hover:bg-[#ECE6FF]
                    transition
                    text-left
                  "
                >
                  <p className="font-semibold text-[#1C6B72]">
                    {challenge.name}
                  </p>

                  <p className="text-sm text-gray-500 truncate mt-1">
                    {challenge.description}
                  </p>
                   <p className="text-sm text-gray-500 truncate mt-1">
                    {challenge.skill}
                  </p>

                </button>
              );
            }

            return (
              <div
                key={index}
                className="
                  w-full
                  p-4
                  rounded-xl
                  border-2
                  border-dashed
                  border-gray-300
                  flex
                  justify-center
                  items-center
                  text-gray-400
                "
              >
                + Reto disponible
              </div>
            );
          })}

        </div>

      </div>

      {/* Crear */}

      <CreateModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreate={(challenge) => {
        handleCreate(challenge);
        }}
      />

      {/* Más adelante */}

      
      <ViewChallengeModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        challenge={selectedChallenge}
        />
      
    </>
  );
};

export default Challenge;

