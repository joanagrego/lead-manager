import type { Opportunity } from "../types/opportunity";

type Props = {
  opportunities: Opportunity[];
};

export default function OpportunitiesTable({ opportunities }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-4">Oportunidades</h2>
      {opportunities.length === 0 ? (
        <p className="text-gray-500">Nenhuma oportunidade criada</p>
      ) : (
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Nome</th>
              <th className="p-3 text-left">Estágio</th>
              <th className="p-3 text-left">Conta</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((opp) => (
              <tr
                key={opp.id}
                className="hover:bg-gray-50 transition"
              >
                <td className="p-3">{opp.id}</td>
                <td className="p-3">{opp.name}</td>
                <td className="p-3">{opp.stage}</td>
                <td className="p-3">{opp.accountName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

