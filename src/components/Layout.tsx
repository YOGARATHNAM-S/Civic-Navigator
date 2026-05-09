import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileWarning, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  User as UserIcon,
  MapPin
} from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'AI Assistant', path: '/chat', icon: MessageSquare },
  { name: 'Complaints', path: '/complaints', icon: FileWarning },
];

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans text-slate-800">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Atmospheric Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[35%] h-[35%] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-pink-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white/40 backdrop-blur-2xl border-r border-white/40 w-64 flex flex-col transition-all duration-300 z-50 fixed inset-y-0 lg:relative lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="p-6 flex items-center gap-3 mb-6">
          <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-200">
            <MapPin className="text-white h-6 w-6" />
          </div>
          <div className="leading-tight">
            <h1 className="font-bold text-lg tracking-tight">BCN</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Civic Navigator</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group",
                location.pathname === item.path 
                  ? "bg-white/60 text-indigo-600 font-semibold shadow-sm border border-white/20" 
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-colors",
                location.pathname === item.path ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
              )} />
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6">
          <div className="bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-3xl p-5 text-white shadow-xl shadow-indigo-100">
            <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold mb-1">Sahaya Helpline</p>
            <p className="text-lg font-bold">1533 / 1912</p>
            <button 
              onClick={handleLogout}
              className="mt-4 w-full bg-white/20 hover:bg-white/30 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="h-3 w-3" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 hover:bg-white/50 rounded-xl"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X /> : <Menu />}
            </button>
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-slate-800 italic">Namaskara, Bengaluru</h2>
              <p className="text-sm text-slate-500">Your smart civic overview.</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center bg-white/50 backdrop-blur-md border border-white/60 rounded-2xl py-2 pl-4 pr-2 w-72 shadow-inner group transition-all focus-within:ring-2 focus-within:ring-indigo-400">
              <Search className="h-4 w-4 text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search services..." 
                className="bg-transparent border-none text-sm focus:ring-0 w-full outline-none text-slate-700"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2.5 bg-white shadow-sm border border-white/60 rounded-xl text-slate-500 flex items-center justify-center">
                <Bell className="h-5 w-5" />
              </button>
              <div className="h-10 w-10 bg-white border border-white/60 rounded-full flex items-center justify-center shadow-sm font-bold text-sm">
                {auth.currentUser?.email?.[0].toUpperCase() || 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 pt-2">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
