export default function AdminNavBar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  return (
    <nav className="bg-purple-700 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">Admin Panel</h1>
      <ul className="flex gap-4">
        <li><a href="/admin/dashboard" className="hover:underline">Dashboard</a></li>
        <li><a href="/admin/users" className="hover:underline">Users</a></li>
        <li><a href="/admin/settings" className="hover:underline">Settings</a></li>
        <li>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
