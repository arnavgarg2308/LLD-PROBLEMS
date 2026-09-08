import { Link, useLocation } from "react-router-dom";
import { BrainCircuit, LayoutDashboard, History } from "lucide-react";

function Navbar() {
  const location = useLocation();

  const navItems = [
    {
      name: "Problems",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "History",
      path: "/history",
      icon: History,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-xl bg-slate-900 p-2 text-white">
            <BrainCircuit size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              LLD Coach
            </h1>
            <p className="text-xs text-slate-500">
              Practice. Design. Improve.
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon size={17} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;