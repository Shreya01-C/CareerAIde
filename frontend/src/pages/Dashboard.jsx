import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import Navbar from "@/components/Navbar";
import AuthModal from "@/components/AuthModal";
import { calculateCompletion } from "@/lib/resumeUtils";
import { TEMPLATE_LIST } from "@/lib/sampleData";
import { FilePlus, CirclePlus, Trash2, PenLine, FileText, Clock, Loader2 } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const fetchResumes = async () => {
    if (!isAuthenticated) { setLoading(false); return; }
    try {
      setLoading(true);
      const list = await base44.entities.Resume.filter({}, "-updated_date", 50);
      setResumes(list);
    } catch (e) {
      console.error("Failed to load resumes", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchResumes(); }, [isAuthenticated]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await base44.entities.Resume.delete(deleteTarget);
      setResumes((r) => r.filter((x) => x.id !== deleteTarget));
    } catch (e) {
      console.error("Delete failed", e);
    } finally {
      setDeleteTarget(null);
    }
  };

  // Not logged in — show a friendly gate (building is always free; sign in only to save/download)
  if (!isLoadingAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <div className="brand-card p-10 animate-pop-in">
            <div className="w-20 h-20 rounded-3xl bg-brand-rose/15 text-brand-rose flex items-center justify-center mx-auto mb-6">
              <FileText size={36} />
            </div>
            <h1 className="font-heading font-bold text-3xl text-chocolate mb-3">Your saved resumes live here</h1>
            <p className="text-chocolate/60 mb-8">Sign in to see resumes you've saved. Or start building right away — no account needed until you download.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => navigate("/edit")} className="pill-btn bg-brand-rose text-white hover:bg-brand-brown px-6 py-3">
                <PenLine size={18} /> Start Building
              </button>
              <button onClick={() => setShowAuth(true)} className="pill-btn bg-white border-2 border-border text-chocolate hover:border-brand-rose px-6 py-3">
                Sign in
              </button>
            </div>
          </div>
        </div>
        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onSuccess={() => navigate("/dashboard")} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 animate-fade-up">
          <div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-chocolate">My Resumes</h1>
            <p className="text-chocolate/60 mt-1">
              {resumes.length > 0 ? `You have ${resumes.length} resume${resumes.length !== 1 ? "s" : ""}` : "Start building your professional resume"}
            </p>
          </div>
          <button onClick={() => navigate("/edit")} className="pill-btn bg-brand-rose text-white hover:bg-brand-brown px-6 py-3">
            <FilePlus size={18} /> Create New
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 size={32} className="animate-spin text-brand-rose" />
          </div>
        ) : resumes.length === 0 ? (
          <div className="brand-card p-12 text-center">
            <div className="w-16 h-16 rounded-3xl bg-brand-rose/15 text-brand-rose flex items-center justify-center mx-auto mb-5">
              <FilePlus size={28} />
            </div>
            <h3 className="font-heading font-bold text-2xl text-chocolate mb-2">No resumes yet</h3>
            <p className="text-chocolate/60 mb-6 max-w-md mx-auto">You haven't created any resumes yet. Start building your professional resume to land your dream job.</p>
            <button onClick={() => navigate("/edit")} className="pill-btn bg-brand-rose text-white hover:bg-brand-brown px-6 py-3">
              <FilePlus size={18} /> Create Your First Resume
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {/* new card */}
            <button onClick={() => navigate("/edit")} className="brand-card brand-card-hover p-8 flex flex-col items-center justify-center text-center min-h-[220px] border-2 border-dashed border-brand-rose/30">
              <div className="w-14 h-14 rounded-2xl bg-brand-rose text-white flex items-center justify-center mb-3">
                <CirclePlus size={28} />
              </div>
              <h3 className="font-heading font-bold text-lg text-chocolate">Create New Resume</h3>
              <p className="text-sm text-chocolate/50">Start building your career</p>
            </button>

            {resumes.map((r) => {
              const completion = r.completion || calculateCompletion(r);
              const template = TEMPLATE_LIST.find((t) => t.id === r.template) || TEMPLATE_LIST[0];
              return (
                <div key={r.id} className="brand-card brand-card-hover overflow-hidden flex flex-col">
                  <div className="h-3" style={{ backgroundColor: template.accent }} />
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-heading font-bold text-lg text-chocolate leading-tight">{r.title || "Untitled"}</h3>
                      <span className="chip bg-brand-yellow text-chocolate shrink-0">{completion}%</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-chocolate/50 mb-4">
                      <Clock size={12} />
                      Updated {new Date(r.updated_date || r.created_date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <button onClick={() => navigate(`/edit/${r.id}`)} className="pill-btn bg-brand-rose/10 text-brand-rose hover:bg-brand-rose hover:text-white text-sm px-4 py-2">
                        <PenLine size={14} /> Edit
                      </button>
                      <button onClick={() => setDeleteTarget(r.id)} className="p-2.5 rounded-xl text-destructive/60 hover:bg-destructive/10 hover:text-destructive transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* delete confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-chocolate/40 backdrop-blur-md" onClick={() => setDeleteTarget(null)} />
          <div className="relative glass rounded-3xl border-2 border-white/60 p-8 max-w-sm w-full text-center animate-pop-in">
            <div className="w-16 h-16 rounded-2xl bg-destructive/15 text-destructive flex items-center justify-center mx-auto mb-4">
              <Trash2 size={28} />
            </div>
            <h3 className="font-heading font-bold text-xl text-chocolate mb-2">Delete this resume?</h3>
            <p className="text-chocolate/60 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="pill-btn bg-white border-2 border-border text-chocolate hover:border-brand-rose flex-1">Cancel</button>
              <button onClick={handleDelete} className="pill-btn bg-destructive text-white hover:opacity-90 flex-1">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
