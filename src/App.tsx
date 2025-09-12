import { useEffect, useState } from "react";
import type { Lead } from "./types/lead";
import type { Opportunity } from "./types/opportunity";
import LeadDetail from "./components/LeadDetails";
import { LeadList } from "./components/LeadList";
import { OpportunitiesTable } from "./components/OpportunitiesTable";

function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
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

  const handleConvert = (lead: Lead) => {
    const newOpp: Opportunity = {
      id: opportunities.length + 1,
      name: lead.name,
      stage: "New",
      accountName: lead.company,
    };
    setOpportunities((prev) => [...prev, newOpp]);
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!leads.length) return <p className="p-4">No lead found</p>;

  return (
    <div className="flex h-screen">
      <div className="w-2/3 m-3">
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
          onConvert={handleConvert}
        />
      )}

      <div className="w-1/3 border-l p-4 overflow-y-auto">
        <OpportunitiesTable opportunities={opportunities} />
      </div>
    </div>
  );
}

export default App;
