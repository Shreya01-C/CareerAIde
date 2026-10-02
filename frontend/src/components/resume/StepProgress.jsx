import { Check } from "lucide-react";

export const STEPS = [
  { id: "profile-info", label: "Profile", icon: "👤" },
  { id: "contact-info", label: "Contact", icon: "✉️" },
  { id: "work-experience", label: "Work", icon: "💼" },
  { id: "education-info", label: "Education", icon: "🎓" },
  { id: "skills", label: "Skills", icon: "🛠️" },
  { id: "projects", label: "Projects", icon: "📁" },
  { id: "certifications", label: "Certs", icon: "🏅" },
  { id: "additionalInfo", label: "More", icon: "🌍" },
];

export default function StepProgress({ currentPage, onJump }) {
  const activeIndex = STEPS.findIndex((s) => s.id === currentPage);
  const progress = Math.round(((activeIndex + 1) / STEPS.length) * 100);

  return (
    <div className="mb-6">
      {/* progress bar */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 h-2.5 rounded-full bg-border overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-rose to-brand-brown transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm font-heading font-bold text-chocolate">{progress}%</span>
      </div>
      {/* step chips */}
      <div className="flex flex-wrap gap-2">
        {STEPS.map((step, i) => {
          const done = i < activeIndex;
          const active = i === activeIndex;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onJump?.(step.id)}
              className={`chip transition-all ${
                active
                  ? "bg-brand-rose text-white scale-105 shadow-soft"
                  : done
                  ? "bg-brand-green/20 text-brand-green hover:bg-brand-green/30"
                  : "bg-white/60 text-chocolate/50 hover:bg-white"
              }`}
            >
              {done ? <Check size={12} /> : <span>{step.icon}</span>}
              {step.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
