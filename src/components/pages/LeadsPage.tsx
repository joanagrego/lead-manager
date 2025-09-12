import { useEffect, useState } from "react";
import LeadDetail from "../LeadDetails";
import { LeadList } from "../LeadList";
import type { Lead } from "../../types/lead";

export function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/leads.json")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar leads");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!leads.length) return <p className="p-4">No lead found</p>;

  return (
    <div className="flex h-full">
      <div className="flex-1 mr-3">
        <LeadList leads={leads} onSelect={setSelectedLead} />
      </div>

      {selectedLead && (
        <LeadDetail
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onSave={(updatedLead) =>
            setLeads((prev) =>
              prev.map((l) => (l.id === updatedLead.id ? updatedLead : l))
            )
          }
        />
      )}
    </div>
  );
}
