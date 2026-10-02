import { Check } from "lucide-react";
import { TEMPLATE_LIST } from "@/lib/sampleData";
import { DUMMY_RESUME_DATA } from "@/lib/sampleData";
import ScaledPreview from "./ScaledPreview";

export default function ThemeSelector({ selectedTheme, setSelectedTheme, resumeData, onClose }) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* template picker */}
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-chocolate text-lg">Choose a template</h3>
          {TEMPLATE_LIST.map((t) => {
            const active = selectedTheme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTheme(t.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                  active
                    ? "border-brand-rose bg-brand-rose/5 shadow-soft"
                    : "border-border bg-white/60 hover:border-brand-rose/40"
                }`}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-heading font-bold" style={{ backgroundColor: t.accent }}>
                  {t.id}
                </div>
                <div className="flex-1">
                  <div className="font-heading font-bold text-chocolate">{t.name}</div>
                  <div className="text-xs text-chocolate/50">{t.tag}</div>
                </div>
                {active && (
                  <div className="w-7 h-7 rounded-full bg-brand-rose text-white flex items-center justify-center">
                    <Check size={16} />
                  </div>
                )}
              </button>
            );
          })}
          <button
            onClick={onClose}
            className="pill-btn w-full bg-brand-rose text-white hover:bg-brand-brown mt-2"
          >
            <Check size={18} /> Apply Template
          </button>
        </div>

        {/* live preview */}
        <div className="rounded-2xl bg-white/60 border border-border p-4 max-h-[70vh] overflow-auto">
          <ScaledPreview templateId={selectedTheme} resumeData={resumeData || DUMMY_RESUME_DATA} />
        </div>
      </div>
    </div>
  );
}
