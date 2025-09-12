import Sidebar from "../Sidebar/Sidebar";

type Props = {
  children: React.ReactNode;
  onSelectPage: (page: "leads" | "opportunities") => void;
};

export function Layout({ children, onSelectPage }: Props) {
  return (
    <div className="flex h-screen">
      <Sidebar onSelect={onSelectPage} />
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">{children}</main>
    </div>
  );
}
