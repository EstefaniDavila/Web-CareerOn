import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import api from "../services/api";

export function useUserStatus() {
  const { accounts } = useMsal();
  const [userType, setUserType] = useState(null); // null = cargando, "Pendiente", "Estudiante", "Empresa"
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      if (!accounts || accounts.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const timestamp = new Date().getTime();
        const response = await api.get(`/onboarding/status?t=${timestamp}`);
        setUserType(response.data.type);
        setUserData(response.data.user);
      } catch (err) {
        console.warn("No se pudo verificar el status del usuario, usando modo demo", err);
        setUserType("Pending"); // Modo demo: asumir que es nuevo
      }
      setLoading(false);
    };

    checkStatus();
  }, [accounts]);

  return { userType, userData, loading, setUserType };
}
