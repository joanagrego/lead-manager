import { useState } from "react";
import type { Lead } from "../types/lead";
import { SearchInput } from "./ui/SearchInput/SearchInput";
import { SelectFilter } from "./ui/SelectFilter/SelectFilter";
import { Table } from "./ui/Table/Table";
import { STATUS_OPTIONS } from "../constants/statusOptions";
import type { LeadStatus } from "../enum/LeadStatus";

type Props = {
  leads: Lead[];
  onSelect: (lead: Lead) => void;
};

export const LeadList = ({ leads, onSelect }: Props) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | null>(null);

  const filtered = leads
    .filter(
      (l) =>
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.company.toLowerCase().includes(search.toLowerCase())
    )
    .filter((l) => (statusFilter ? l.status === statusFilter : true))
    .sort((a, b) => b.score - a.score);

  const columns = [
    { header: "ID", accessor: (lead: Lead) => lead.id },

    { header: "Name", accessor: (lead: Lead) => lead.name },
    { header: "Company", accessor: (lead: Lead) => lead.company },
    {
      header: "Score",
      accessor: (lead: Lead) => <span className="font-bold">{lead.score}</span>,
      sortValue: (lead: Lead) => lead.score,
    },
    { header: "Status", accessor: (lead: Lead) => lead.status },
    { header: "Source", accessor: (lead: Lead) => lead.source },
  ];

  return (
    <div className="flex flex-col gap-3 mb-4">
      <div className="flex gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by name or company"
        />

        <SelectFilter
          selectValue={statusFilter}
          onSelectChange={setStatusFilter}
          selectOptions={STATUS_OPTIONS}
        />
      </div>

      <Table
        columns={columns}
        data={filtered}
        onRowClick={onSelect}
        emptyMessage="No leads found"
      />
    </div>
  );
};
