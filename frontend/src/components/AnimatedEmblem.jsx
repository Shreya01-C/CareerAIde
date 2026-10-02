import { FileText, Briefcase, Award, Sparkles } from "lucide-react";

// Career symbols that orbit the resume glyph — an infinite, always-moving
// emblem that ties the studio's theme (documents + careers) together.
const ORBIT = [
  { Icon: Briefcase, angle: 0, bg: "bg-brand-teal" },
  { Icon: Award, angle: 120, bg: "bg-brand-green" },
  { Icon: Sparkles, angle: 240, bg: "bg-brand-rose" },
];

export default function AnimatedEmblem({ size = 116, className = "" }) {
  const radius = 46; // % of the square box

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      {/* pulsing glow halo */}
      <div className="absolute inset-1 rounded-full bg-brand-rose/25 blur-lg animate-pulse-ring" />

      {/* spinning dashed orbit ring */}
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-rose/50 animate-spin-slow" />

      {/* inner disc */}
      <div className="absolute inset-[14%] rounded-full bg-white/85 backdrop-blur border border-white shadow-soft" />

      {/* orbiting career icons (counter-rotated so they stay upright) */}
      <div className="absolute inset-0 animate-orbit">
        {ORBIT.map(({ Icon, angle, bg }, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <span
              key={i}
              className="absolute"
              style={{
                left: `${50 + radius * Math.sin(rad)}%`,
                top: `${50 - radius * Math.cos(rad)}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full ${bg} text-white border-2 border-white shadow animate-orbit-reverse`}
              >
                <Icon size={12} />
              </span>
            </span>
          );
        })}
      </div>

      {/* centre resume glyph */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-rose to-brand-brown text-white flex items-center justify-center shadow-soft animate-bob">
          <FileText size={20} />
        </div>
      </div>
    </div>
  );
}
