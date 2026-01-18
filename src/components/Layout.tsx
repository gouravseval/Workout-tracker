import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, Dumbbell, Utensils, TrendingUp, User, Calendar } from "lucide-react";

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/calendar", icon: Calendar, label: "Calendar" },
    { path: "/workout", icon: Dumbbell, label: "Workout" },
    { path: "/diet", icon: Utensils, label: "Diet" },
    { path: "/progress", icon: TrendingUp, label: "Progress" },
    { path: "/profile", icon: User, label: "Profile" }
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pl-64">
      {/* Desktop Sidebar (Hidden on mobile) */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 glass-panel border-r border-gray-800 z-50 p-6">
        <div className="mb-10 flex items-center gap-3 px-2">
            <img src="/logo.png" alt="VantaTrack" className="w-10 h-10 rounded-full" />
            <h1 className="text-2xl font-bold text-white tracking-tight">
              VantaTrack
            </h1>
        </div>
        <div className="flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                location.pathname === item.path
                  ? "bg-white text-black shadow-lg shadow-white/10 font-bold"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      {/* Main Content Area */}
      <main className="p-3 md:p-8 max-w-5xl mx-auto w-full overflow-x-hidden">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full glass-panel border-t border-gray-800 z-50 px-2 py-3 backdrop-blur-xl bg-black/80">
        <div className="flex justify-between items-center max-w-md mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 transition-all ${
                location.pathname === item.path
                  ? "text-white scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  : "text-gray-500"
              }`}
            >
              <item.icon size={24} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
