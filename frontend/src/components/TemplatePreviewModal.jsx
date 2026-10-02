import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScaledPreview from "@/components/resume/ScaledPreview";
import { DUMMY_RESUME_DATA, TEMPLATE_LIST } from "@/lib/sampleData";
import { X, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// Opens a template full-size so visitors can inspect it before choosing.
export default function TemplatePreviewModal({ template, onClose }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(template);

  useEffect(() => {
    setCurrent(template);
  }, [template]);

  useEffect(() => {
    if (!template) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [template, onClose]);

  if (!template || !current) return null;

  const idx = TEMPLATE_LIST.findIndex((t) => t.id === current.id);
  const step = (dir) =>
    setCurrent(TEMPLATE_LIST[(idx + dir + TEMPLATE_LIST.length) % TEMPLATE_LIST.length]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-chocolate/60 backdrop-blur-md" onClick={onClose} />

      <div className="relative glass rounded-3xl border-2 border-white/60 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-pop-in">
        {/* header */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-white/50">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-heading font-bold shadow-soft"
              style={{ backgroundColor: current.accent }}
            >
              {current.id}
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl text-chocolate leading-tight">{current.name}</h3>
              <span className="text-xs text-chocolate/50 font-semibold">{current.tag} · Template {current.id}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close preview"
            className="w-9 h-9 rounded-full bg-white/70 hover:bg-white text-chocolate flex items-center justify-center font-bold transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* preview */}
        <div className="relative flex-1 min-h-0 bg-brand-peach/20">
          <div className="h-full max-h-[62vh] overflow-auto p-5 flex justify-center">
            <div className="animate-fade-up">
              <ScaledPreview templateId={current.id} resumeData={DUMMY_RESUME_DATA} maxWidth={620} />
            </div>
          </div>
          <button
            onClick={() => step(-1)}
            aria-label="Previous template"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-soft text-chocolate flex items-center justify-center hover:bg-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => step(1)}
            aria-label="Next template"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-soft text-chocolate flex items-center justify-center hover:bg-white transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-white/50">
          <div className="flex gap-2">
            {TEMPLATE_LIST.map((t) => {
              const active = current.id === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setCurrent(t)}
                  className={`w-9 h-9 rounded-xl text-xs font-heading font-bold transition-all ${
                    active ? "text-white scale-110 shadow-soft" : "bg-white/70 text-chocolate/60 hover:bg-white"
                  }`}
                  style={active ? { backgroundColor: t.accent } : undefined}
                >
                  {t.id}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => navigate(`/edit?template=${current.id}`)}
            className="pill-btn bg-brand-rose text-white hover:bg-brand-brown px-6 py-2.5 shadow-soft"
          >
            Use this template <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
