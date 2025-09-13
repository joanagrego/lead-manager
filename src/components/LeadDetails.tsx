import { useState, useEffect } from "react";
import type { Lead } from "../types/lead";
import type { Opportunity } from "../types/opportunity";
import { LeadStatus } from "../enum/LeadStatus";
import { OpportunityStage } from "../enum/OpportunityStage";
import { generateId } from "../utils";

type Props = {
  lead: Lead;
  onClose: () => void;
  onSave: (lead: Lead) => void;
  onConvert: (opportunity: Opportunity) => void;
};

export default function LeadDetail({
  lead,
  onClose,
  onSave,
  onConvert,
}: Props) {
  const [edited, setEdited] = useState<Lead>({ ...lead });
  const [error, setError] = useState("");
  const [showConvertForm, setShowConvertForm] = useState(false);

  const [conversionData, setConversionData] = useState({
    stage: "",
    amount: undefined as number | undefined,
    accountName: lead.company || "",
  });

  useEffect(() => {
    setEdited({ ...lead });
    setError("");
    setConversionData({
      stage: "",
      amount: undefined,
      accountName: lead.company || "",
    });
  }, [lead]);

  const handleSave = () => {
    if (!/\S+@\S+\.\S+/.test(edited.email)) {
      setError("Email inválido");
      return;
    }
    onSave(edited);
    onClose();
  };

  return (
    <div className="fixed right-0 top-0 h-full w-1/3 bg-white shadow-2xl border-l border-gray-200 p-6 flex flex-col overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6">{edited.name}</h2>

      <label className="mb-4 block">
        <span className="text-sm text-gray-600">Email</span>
        <input
          type="email"
          className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={edited.email}
          onChange={(e) => {
            setEdited({ ...edited, email: e.target.value });
            setError("");
          }}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </label>

      <label className="mb-4 block">
        <span className="text-sm text-gray-600">Status</span>
        <select
          className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={edited.status}
          onChange={(e) => setEdited({ ...edited, status: e.target.value })}
        >
          {Object.values(LeadStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>

      {showConvertForm && (
        <div className="mt-6 border-t pt-4 space-y-4">
          <label className="block">
            <span className="text-sm text-gray-600">Stage</span>
            <select
              value={conversionData.stage}
              onChange={(e) =>
                setConversionData((prev) => ({
                  ...prev,
                  stage: e.target.value as OpportunityStage,
                }))
              }
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              {Object.values(OpportunityStage).map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm text-gray-600">Amount (optional)</span>
            <input
              type="number"
              value={conversionData.amount ?? ""}
              onChange={(e) =>
                setConversionData((prev) => ({
                  ...prev,
                  amount: Number(e.target.value),
                }))
              }
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-600">Account Name</span>
            <input
              value={conversionData.accountName}
              onChange={(e) =>
                setConversionData((prev) => ({
                  ...prev,
                  accountName: e.target.value,
                }))
              }
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </label>

          <button
            onClick={() =>
              onConvert({
                id: generateId(),
                name: lead.name,
                ...conversionData,
              })
            }
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-full"
          >
            Confirm Conversion
          </button>
        </div>
      )}

      <div className="mt-auto flex gap-3">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Cancel
        </button>

        {!showConvertForm && (
          <button
            onClick={() => setShowConvertForm((prev) => !prev)}
            className="ml-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Convert Lead
          </button>
        )}
      </div>
    </div>
  );
}
