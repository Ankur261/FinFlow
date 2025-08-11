import AdminNavBar from "../components/navbars/AdminNavBar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavBar />
      <main className="flex-grow p-4 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
