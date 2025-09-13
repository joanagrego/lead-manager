import { useState } from "react";
import LeadDetail from "../LeadDetails";
import { LeadList } from "../LeadList";
import type { Lead } from "../../types/lead";
import { useLeadsContext } from "../../context/useLeadsContext";
import type { Opportunity } from "../../types/opportunity";

type Props = {
  onConvert: (opportunity: Opportunity) => void;
};

export function LeadsPage({ onConvert }: Props) {
  const { leads, setLeads, loading, error } = useLeadsContext();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);


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
              prev.map((lead) =>
                lead.id === updatedLead.id ? updatedLead : lead
              )
            )
          }
          onConvert={onConvert}
        />
      )}
    </div>
  );
}
