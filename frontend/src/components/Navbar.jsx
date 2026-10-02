import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { FileText, Menu, X, LayoutDashboard, LogOut, PenLine } from "lucide-react";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const goBuild = () => {
    setOpen(false);
    navigate("/edit");
  };

  const handleLogout = () => {
    setOpen(false);
    logout(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="glass border-b border-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-rose to-brand-brown flex items-center justify-center shadow-soft group-hover:rotate-6 transition-transform">
                <FileText size={20} className="text-white" />
              </div>
              <div className="leading-none">
                <span className="font-heading font-bold text-xl text-chocolate tracking-tight">CareerAIde</span>
                <span className="block text-[10px] font-heading font-semibold text-brand-rose tracking-widest uppercase">Resume Studio</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="pill-btn bg-white/60 text-chocolate hover:bg-white border border-border">
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  <button onClick={goBuild} className="pill-btn bg-brand-rose text-white hover:bg-brand-brown">
                    <PenLine size={16} /> New Resume
                  </button>
                  <div className="flex items-center gap-2 pl-2 ml-1 border-l border-border">
                    <div className="w-9 h-9 rounded-full bg-brand-yellow text-chocolate font-heading font-bold flex items-center justify-center">
                      {(user?.full_name || user?.email || "U").charAt(0).toUpperCase()}
                    </div>
                    <button onClick={handleLogout} className="p-2 rounded-full text-chocolate/60 hover:text-brand-rose hover:bg-white/60 transition-colors" title="Sign out">
                      <LogOut size={18} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="px-4 py-2 rounded-full font-heading font-semibold text-chocolate/70 hover:text-chocolate hover:bg-white/50 transition-colors">
                    My Resumes
                  </Link>
                  <button onClick={goBuild} className="pill-btn bg-brand-rose text-white hover:bg-brand-brown animate-pulse-ring">
                    <PenLine size={16} /> Start Building
                  </button>
                </>
              )}
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setOpen((o) => !o)} className="md:hidden p-2 rounded-xl text-chocolate hover:bg-white/50">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-white/40 bg-cream/95 backdrop-blur animate-fade-in">
            <div className="px-4 py-4 space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 px-2 py-2">
                    <div className="w-10 h-10 rounded-full bg-brand-yellow text-chocolate font-heading font-bold flex items-center justify-center">
                      {(user?.full_name || user?.email || "U").charAt(0).toUpperCase()}
                    </div>
                    <div className="text-sm">
                      <div className="font-heading font-bold text-chocolate">{user?.full_name || "Member"}</div>
                      <div className="text-chocolate/60 text-xs truncate max-w-[180px]">{user?.email}</div>
                    </div>
                  </div>
                  <Link to="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-xl font-heading font-semibold text-chocolate hover:bg-white/60">
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                  <button onClick={goBuild} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl font-heading font-semibold text-white bg-brand-rose">
                    <PenLine size={18} /> New Resume
                  </button>
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl font-heading font-semibold text-chocolate/70 hover:bg-white/60">
                    <LogOut size={18} /> Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/dashboard" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-xl font-heading font-semibold text-chocolate hover:bg-white/60">
                    My Resumes
                  </Link>
                  <button onClick={goBuild} className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-heading font-semibold text-white bg-brand-rose">
                    <PenLine size={18} /> Start Building
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
