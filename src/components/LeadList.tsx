import { useState } from "react";
import type { Lead } from "../types/lead";

type Props = {
  leads: Lead[];
  onSelect: (lead: Lead) => void;
};

export default function LeadList({ leads, onSelect }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = leads
    .filter(
      (l) =>
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.company.toLowerCase().includes(search.toLowerCase())
    )
    .filter((l) => (statusFilter ? l.status === statusFilter : true))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="w-2/3 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Buscar por nome/empresa"
          className="border border-gray-300 rounded-lg px-3 py-2 flex-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
        </select>
      </div>

      <table className="w-full border-collapse rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 text-left">Nome</th>
            <th className="p-3 text-left">Empresa</th>
            <th className="p-3 text-left">Pontuação</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((lead) => (
            <tr
              key={lead.id}
              className="hover:bg-gray-50 cursor-pointer transition"
              onClick={() => onSelect(lead)}
            >
              <td className="p-3">{lead.name}</td>
              <td className="p-3">{lead.company}</td>
              <td className="p-3 font-medium text-blue-600">{lead.score}</td>
              <td className="p-3">{lead.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

