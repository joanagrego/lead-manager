import { useState } from "react";
import type { Lead } from "../types/lead";

type Props = {
  lead: Lead;
  onClose: () => void;
  onSave: (lead: Lead) => void;
};

export default function LeadDetail({ lead, onClose, onSave }: Props) {
  const [edited, setEdited] = useState<Lead>({ ...lead });
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!/\S+@\S+\.\S+/.test(edited.email)) {
      setError("Email inválido");
      return;
    }
    onSave(edited);
    onClose();
  };

  return (
    <div className="fixed right-0 top-0 h-full w-1/3 bg-white shadow-2xl border-l border-gray-200 p-6 flex flex-col">
      <h2 className="text-2xl font-semibold mb-6">{edited.name}</h2>

      <label className="mb-4 block">
        <span className="text-sm text-gray-600">Email</span>
        <input
          type="email"
          className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={edited.email}
          onChange={(e) => setEdited({ ...edited, email: e.target.value })}
        />
      </label>

      <label className="mb-4 block">
        <span className="text-sm text-gray-600">Status</span>
        <select
          className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={edited.status}
          onChange={(e) => setEdited({ ...edited, status: e.target.value })}
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
        </select>
      </label>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="mt-auto flex gap-3">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Salvar
        </button>
        <button
          onClick={onClose}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

