/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import type { Lead } from "../types/lead";

type LeadsContextType = {
  leads: Lead[];
  setLeads: (leads: Lead[] | ((prev: Lead[]) => Lead[])) => void;
  loading: boolean;
  error: string | null;
};

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

export function LeadsProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeadsState] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const setLeads = (newLeads: Lead[] | ((prev: Lead[]) => Lead[])) => {
    setLeadsState((prev) =>
      typeof newLeads === "function" ? newLeads(prev) : newLeads
    );
  };

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/leads.json");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data: Lead[] = await res.json();

        if (JSON.stringify(data) !== JSON.stringify(leads)) {
          setLeads(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch leads");
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [leads]);

  return (
    <LeadsContext.Provider value={{ leads, setLeads, loading, error }}>
      {children}
    </LeadsContext.Provider>
  );
}

export function useLeadsContext() {
  const context = useContext(LeadsContext);
  if (!context) throw new Error("useLeadsContext must be used within a LeadsProvider");
  return context;
}
