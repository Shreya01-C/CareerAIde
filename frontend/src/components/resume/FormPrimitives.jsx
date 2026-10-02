import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function TextInput({ value, onChange, label, placeholder, type = "text" }) {
  const [show, setShow] = useState(false);
  const isPwd = type === "password";
  return (
    <div>
      {label && <label className="block text-sm font-bold text-chocolate mb-1.5 font-heading">{label}</label>}
      <div className="flex items-center rounded-2xl border-2 border-border bg-white/80 focus-within:border-brand-rose transition-colors overflow-hidden">
        <input
          type={isPwd ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full bg-transparent px-4 py-2.5 text-chocolate placeholder:text-chocolate/30 focus:outline-none text-sm"
          value={value || ""}
          onChange={onChange}
        />
        {isPwd && (
          <button type="button" onClick={() => setShow((s) => !s)} className="px-3 text-chocolate/40 hover:text-chocolate">
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}

export function TextArea({ value, onChange, label, placeholder, rows = 3 }) {
  return (
    <div>
      {label && <label className="block text-sm font-bold text-chocolate mb-1.5 font-heading">{label}</label>}
      <textarea
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-2xl border-2 border-border bg-white/80 focus:border-brand-rose focus:outline-none px-4 py-2.5 text-chocolate placeholder:text-chocolate/30 text-sm resize-none transition-colors"
        value={value || ""}
        onChange={onChange}
      />
    </div>
  );
}

export function RatingInput({ value = 0, total = 5, onChange, color = "#B3576A" }) {
  const display = Math.round((value / 100) * total);
  return (
    <div className="flex items-center gap-1.5">
      {[...Array(total)].map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(Math.round(((i + 1) / total) * 100))}
          className="w-7 h-7 rounded-full transition-transform hover:scale-110"
          style={{ backgroundColor: i < display ? color : "#f0e0d8", border: `2px solid ${i < display ? color : "#e0d0c8"}` }}
          aria-label={`Rate ${i + 1}`}
        />
      ))}
      <span className="ml-1 text-xs font-bold text-chocolate/50 font-heading">{display}/{total}</span>
    </div>
  );
}

export function AddButton({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full mt-2 flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand-rose/40 bg-brand-rose/5 py-2.5 text-sm font-heading font-bold text-brand-rose hover:bg-brand-rose/10 hover:border-brand-rose transition-colors"
    >
      {children}
    </button>
  );
}

export function TrashButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-destructive/70 hover:bg-destructive/10 hover:text-destructive transition-colors"
      title="Remove"
    >
      ✕
    </button>
  );
}

export function FormCard({ title, icon, children }) {
  return (
    <div className="brand-card p-6 animate-fade-up">
      <div className="flex items-center gap-2.5 mb-5">
        {icon && (
          <div className="w-10 h-10 rounded-2xl bg-brand-rose/15 text-brand-rose flex items-center justify-center">
            {icon}
          </div>
        )}
        <h2 className="font-heading text-xl font-bold text-chocolate">{title}</h2>
      </div>
      {children}
    </div>
  );
}
