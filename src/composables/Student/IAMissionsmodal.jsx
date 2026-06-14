import React from "react";

export default function IAMissionModal({
  selectedIAMission,
  userAnswer,
  setUserAnswer,
  onEvaluate,
  result,
  onClose,
}) {
  if (!selectedIAMission) return null;

  const handleCheckboxChange = (option) => {
    const currentAnswers = Array.isArray(userAnswer)
      ? userAnswer
      : [];

    if (currentAnswers.includes(option)) {
      setUserAnswer(
        currentAnswers.filter((item) => item !== option)
      );
    } else {
      setUserAnswer([...currentAnswers, option]);
    }
  };

  const renderMissionContent = () => {
    switch (selectedIAMission.type) {
      case "text":
        return (
          <textarea
            className="w-full mt-5 border border-gray-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            rows={6}
            placeholder="Escribe tu respuesta aquí..."
            value={userAnswer || ""}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
        );

      case "multiple_choice":
        return (
          <div className="mt-5 space-y-3">
            {selectedIAMission.options?.map((option) => (
              <label
                key={option}
                className={`flex items-center gap-3 border rounded-2xl p-4 cursor-pointer transition-all
                ${
                  userAnswer === option
                    ? "border-violet-500 bg-violet-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="mission-answer"
                  value={option}
                  checked={userAnswer === option}
                  onChange={(e) =>
                    setUserAnswer(e.target.value)
                  }
                />

                <span>{option}</span>
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="mt-5 space-y-3">
            {selectedIAMission.options?.map((option) => (
              <label
                key={option}
                className={`flex items-center gap-3 border rounded-2xl p-4 cursor-pointer transition-all
                ${
                  Array.isArray(userAnswer) &&
                  userAnswer.includes(option)
                    ? "border-violet-500 bg-violet-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={
                    Array.isArray(userAnswer) &&
                    userAnswer.includes(option)
                  }
                  onChange={() =>
                    handleCheckboxChange(option)
                  }
                />

                <span>{option}</span>
              </label>
            ))}
          </div>
        );

      default:
        return (
          <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600">
              Tipo de misión no soportado:
              {" "}
              {selectedIAMission.type}
            </p>
          </div>
        );
    }
  };

  const hasAnswer =
    (typeof userAnswer === "string" &&
      userAnswer.trim() !== "") ||
    (Array.isArray(userAnswer) &&
      userAnswer.length > 0);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white">

          <div className="flex justify-between items-start">

            <div>
              <h2 className="text-2xl font-bold">
                {selectedIAMission.title}
              </h2>

              <p className="text-violet-100 mt-1">
                {selectedIAMission.company}
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-white text-2xl hover:opacity-80"
            >
              ✕
            </button>

          </div>

        </div>

        {/* BODY */}
        <div className="p-6">

          {/* ACTIVIDAD */}
          <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4">

            <h3 className="font-semibold text-violet-700 mb-2">
              Actividad
            </h3>

            <p className="text-gray-700">
              {selectedIAMission.activity}
            </p>

          </div>

          {/* FORMULARIO */}
          {!result && (
            <>
              {renderMissionContent()}

              <button
                onClick={onEvaluate}
                disabled={!hasAnswer}
                className="mt-6 w-full py-3 rounded-2xl bg-[#5B34F2] text-white font-semibold hover:bg-[#4B2BD6] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar a evaluación IA
              </button>

              <button
                onClick={onClose}
                className="mt-3 w-full py-2 text-gray-500 hover:text-gray-700"
              >
                Cancelar
              </button>
            </>
          )}

          {/* RESULTADO */}
          {result && (
            <div className="mt-6">

              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-6 text-center">

                <h3 className="text-5xl font-bold">
                  {result.score}
                </h3>

                <p className="mt-1 opacity-90">
                  puntos obtenidos
                </p>

              </div>

              <div className="mt-4 bg-gray-50 border rounded-2xl p-4">

                <h4 className="font-semibold mb-2">
                  Retroalimentación IA
                </h4>

                <p className="text-gray-700 text-sm leading-relaxed">
                  {result.feedback}
                </p>

              </div>

              <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-2xl p-4">

                <h4 className="font-semibold text-yellow-700">
                  Recompensas obtenidas
                </h4>

                <div className="mt-2 text-sm">
                  🎁 +{selectedIAMission.rewardCoins} monedas
                  <br />
                  ⭐ +{selectedIAMission.rewardXP} XP
                </div>

              </div>

              <button
                onClick={onClose}
                className="mt-5 w-full py-3 rounded-2xl bg-[#5B34F2] text-white font-semibold hover:bg-[#4B2BD6]"
              >
                Cerrar
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}