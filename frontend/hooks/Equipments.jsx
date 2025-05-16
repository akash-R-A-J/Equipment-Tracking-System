import { useEffect, useState } from "react";
import axios from "axios";

export const useEquipments = (role) => {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEquipments() {
      try {
        if(role === "manufacturers") role = "manufacturer";
        const xauthToken = localStorage.getItem("x-auth-token");
        const response = await axios.get(
          `http://localhost:5000/api/v0/${role}s/my-equipment`,
          {
            headers: {
              "x-auth-token": xauthToken,
            },
          }
        );
        setEquipments(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error while fetching equipments", err);
        setError(err?.response?.data?.message || "Failed to fetch equipment.");
        setLoading(false);
      }
    }

    if (role) {
      fetchEquipments();
    }
  }, [role]);

  return { equipments, loading, error };
};
