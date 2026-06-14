import { useNavigate } from "react-router-dom";
import { Briefcase } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (role) => {
    try {
      let mockUser;
      if (role === 'student') {
        mockUser = {
          email: "u24230547@utp.edu.pe",
          name: "Estudiante UTP",
          microsoft_id: "mock_student_123"
        };
      } else {
        mockUser = {
          email: "diana.lopez@bcp.com",
          name: "Diana Lopez",
          microsoft_id: "mock_hr_123"
        };
      }

      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockUser)
      });

      const data = await response.json();
      console.log("Respuesta del Backend:", data);

      if (data.status === "success" || data.status === "warning") {
        localStorage.setItem("mock_token", data.user.email);
        localStorage.setItem("user_data", JSON.stringify(data.user));

        if (data.user.type === "Recruiter") {
          navigate("/recruiter/dashboard");
        } else {
          navigate(data.user.type === "Pending" ? "/onboarding" : "/dashboard");
        }
      }
    } catch (e) {
      console.error("Error conectando al backend:", e);
      alert("Error conectando al backend. ¿Está encendido uvicorn?");
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col md:flex-row bg-[var(--color-brand-bg)]">
      <div className="md:w-1/2 bg-[var(--color-brand-primary)] p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-hover)] opacity-90 z-0"></div>

        <div className="z-10 flex flex-col items-center">
          <div className="mb-8 bg-white/10 p-6 rounded-3xl backdrop-blur-sm border border-white/20">
            <img src="https://res.cloudinary.com/dpuu7ddmk/image/upload/f_auto,q_auto/v1/WhatsApp_Image_2026-05-15_at_07.33.47_f5iq9x" alt="CarrerOn Logo" className="w-48 h-auto object-contain drop-shadow-xl" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
            <Briefcase style={{ display: 'none' }} className="w-24 h-24 text-white opacity-90" />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-center tracking-tight">CarrerOn</h1>
          <p className="text-xl text-center text-[var(--color-brand-bg)] opacity-90 max-w-md font-medium">
            Tu copiloto de empleabilidad. Descubre tus brechas, optimiza tu CV y conecta con el mercado real.
          </p>
        </div>
      </div>

      <div className="md:w-1/2 flex items-center justify-center p-8 bg-[var(--color-brand-surface)]">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[var(--color-brand-text)] mb-3">Iniciar Sesión</h2>
            <p className="text-[var(--color-brand-subtext)]">Ingresa con tu cuenta institucional de la universidad para continuar.</p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => handleLogin('student')}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-[var(--color-brand-primary)] hover:bg-gray-50 text-[var(--color-brand-text)] font-semibold py-4 px-4 rounded-xl shadow-sm transition-all duration-200"
            >
              <svg width="24" height="24" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
              </svg>
              Ingresar como Estudiante
            </button>

            <button
              onClick={() => handleLogin('recruiter')}
              className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 px-4 rounded-xl shadow-sm transition-all duration-200"
            >
              <Briefcase className="w-5 h-5" />
              Ingresar como Reclutador B2B
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
