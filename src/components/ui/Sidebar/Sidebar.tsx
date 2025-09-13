import { useState } from "react";

type Props = {
  onSelect?: (page: "leads" | "opportunities") => void;
};

export default function Sidebar({ onSelect }: Props) {
  const [active, setActive] = useState<"leads" | "opportunities">("leads");

  const handleClick = (page: "leads" | "opportunities") => {
    setActive(page);
    onSelect?.(page);
  };

  return (
    <aside className="w-64 bg-white border-r p-4">
      <h1 className="text-xl font-bold mb-6">Seller Console</h1>
      <nav className="space-y-2">
        <button
          onClick={() => handleClick("leads")}
          className={`block w-full text-left px-3 py-2 rounded ${
            active === "leads" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
          }`}
        >
          Leads
        </button>
        <button
          onClick={() => handleClick("opportunities")}
          className={`block w-full text-left px-3 py-2 rounded ${
            active === "opportunities"
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Opportunities
        </button>
      </nav>
    </aside>
  );
}
