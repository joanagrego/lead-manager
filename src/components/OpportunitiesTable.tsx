import type { Opportunity } from "../types/opportunity";
import { Table } from "./ui/Table/Table";

type Props = {
  opportunities: Opportunity[];
};

export const OpportunitiesTable = ({ opportunities }: Props) => {
  const columns = [
    { header: "ID", accessor: (opportunity: Opportunity) => opportunity.id },

    {
      header: "Name",
      accessor: (opportunity: Opportunity) => opportunity.name,
    },
    {
      header: "Stage",
      accessor: (opportunity: Opportunity) => opportunity.stage,
    },
    {
      header: "Amount",
      accessor: (opportunity: Opportunity) => opportunity.amount,
    },
    {
      header: "Account",
      accessor: (opportunity: Opportunity) => opportunity.accountName,
    },
  ];

  return (
    <Table
      columns={columns}
      data={opportunities}
      emptyMessage="No opportunities created"
    />
  );
};
