import { useState } from "react";
import type { Opportunity } from "./types/opportunity";

import { Layout } from "./components/ui/Layout/Layout";
import { LeadsPage } from "./components/pages/LeadsPage";
import { OpportunitiesPage } from "./components/pages/OpportunitiesPage";
import { useLeadsContext } from "./context/useLeadsContext";

function App() {
  const { leads, loading, error } = useLeadsContext();

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [page, setPage] = useState<"leads" | "opportunities">("leads");

  const handleConvert = (opportunity: Opportunity) => {
    setOpportunities((prev) => [...prev, opportunity]);
    setPage("opportunities");
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!leads.length) return <p className="p-4">No lead found</p>;

  return (
    <Layout onSelectPage={setPage}>
      {page === "leads" ? (
        <LeadsPage onConvert={handleConvert} />
      ) : (
        <OpportunitiesPage opportunities={opportunities} />
      )}
    </Layout>
  );
}

export default App;
