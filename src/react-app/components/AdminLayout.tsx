import {
  BookOpen,
  Calendar,
  FlaskConical,
  MessageSquare,
  X
} from "lucide-react";
import { useState } from "react";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const navigation = [
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Blog Posts", href: "/admin/blog", icon: BookOpen },
  { name: "Research", href: "/admin/research", icon: FlaskConical },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check auth synchronously on every render
  const token = localStorage.getItem("admin_token");
  const isAuthenticated = !!token;

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    window.location.href = "/";
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-brand-beige">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-border transform transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border">
            <Link
              to="/"
              className="flex items-center gap-3"
              data-testid="navbar-logo"
            >
              <img
                src="/logo-48.png"
                alt="ManoShastra Logo"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
              />
              <div className="hidden sm:block">
                <p className="font-heading font-bold text-brand-text text-sm md:text-base leading-tight">
                  ManoShastra
                </p>
                <p className="text-brand-muted text-xs leading-tight">
                  Counseling & Research Center
                </p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-brand-muted hover:text-brand-text"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive
                    ? "bg-brand-green text-white"
                    : "text-brand-muted hover:bg-brand-beige hover:text-brand-text"
                    }`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          {/* <div className="p-4 border-t border-border">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div> */}
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-72">
        <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Page content is rendered by parent route via Outlet */}
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
