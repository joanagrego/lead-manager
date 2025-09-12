import { useEffect, useState } from "react";
import type { Lead } from "./types/lead";
import type { Opportunity } from "./types/opportunity";

import { Layout } from "./components/ui/Layout/Layout";
import { LeadsPage } from "./components/pages/LeadsPage";
import { OpportunitiesPage } from "./components/pages/OpportunitiesPage";

function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [page, setPage] = useState<"leads" | "opportunities">("leads");
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
    setPage("opportunities");
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!leads.length) return <p className="p-4">No lead found</p>;

  return (
    <Layout onSelectPage={setPage}>
      {page === "leads" ? (
        <LeadsPage />
      ) : (
        <OpportunitiesPage opportunities={opportunities} />
      )}
    </Layout>
  );
}

export default App;
