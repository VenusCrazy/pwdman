import { useState, useEffect, useCallback } from "react";
import api from "../api";

function useVault() {
  const [entries, setEntries] = useState([]);

  const reload = useCallback(async () => {
    const { data } = await api.get("/api/vault");
    setEntries(data.map((e) => ({ id: e._id, label: e.label, password: e.password })));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const addEntry = async (label, password) => {
    const { data } = await api.post("/api/vault", { label, password });
    setEntries((prev) => [...prev, { id: data._id, label: data.label, password: data.password }]);
  };

  const deleteEntry = async (id) => {
    await api.delete(`/api/vault/${id}`);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return { entries, addEntry, deleteEntry };
}

export default useVault;