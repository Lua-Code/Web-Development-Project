import { Link, useLocation } from "react-router-dom";

const tabs = [
  { name: "Dashboard", path: "/" },
  { name: "My Products", path: "/MyProducts" },
  { name: "Orders", path: "/Orders" },
  { name: "Analytics", path: "/Analytics" },
  { name: "Settings", path: "/Settings" },
];

function Tabs() {
  const location = useLocation(); 

  return (
    <div className="flex gap-2 bg-white rounded-full px-2 py-1 w-fit shadow">
      {tabs.map((t) => (
        <Link
          key={t.name}
          to={t.path}
          className={`px-4 py-2 rounded-full text-sm transition ${
            location.pathname === t.path
              ? "bg-white shadow font-medium text-[#1D3557]"
              : "text-gray-500 hover:bg-[#F1F1F1]"
          }`}
        >
          {t.name}
        </Link>
      ))}
    </div>
  );
}

export default Tabs;
