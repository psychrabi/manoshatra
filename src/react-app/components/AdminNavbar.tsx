import { LogOut, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface AdminNavbarProps {
  onMenuClick?: () => void;
}

export default function AdminNavbar({ onMenuClick }: AdminNavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Left side - Menu button and nav links */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-brand-muted hover:bg-brand-beige rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>


        </div>

        {/* Right side - User actions */}
        <div className="flex items-center gap-3">
          {/* <button
            className="p-2 text-brand-muted hover:bg-brand-beige rounded-lg transition-colors"
            title="Settings"
          >
            <Settings size={20} />
          </button>
          <button
            className="p-2 text-brand-muted hover:bg-brand-beige rounded-lg transition-colors"
            title="Profile"
          >
            <User size={20} />
          </button> */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

function NavLink({ to, active, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${active
          ? "bg-brand-green text-white"
          : "text-brand-muted hover:bg-brand-beige hover:text-brand-text"
        }`}
    >
      {children}
    </Link>
  );
}
