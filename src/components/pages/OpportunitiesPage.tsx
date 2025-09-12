import type { Opportunity } from "../../types/opportunity";
import { OpportunitiesTable } from "../OpportunitiesTable";


type Props = {
  opportunities: Opportunity[];
};

export function OpportunitiesPage({ opportunities }: Props) {
  return (
    <div className="h-full">
      <h2 className="text-lg font-semibold mb-4">Opportunities</h2>
      <OpportunitiesTable opportunities={opportunities} />
    </div>
  );
}
