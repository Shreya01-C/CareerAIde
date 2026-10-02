import { formatYearMonth } from "@/lib/resumeUtils";

export const SectionTitle = ({ text, color = "#632B2B" }) => (
  <div className="mb-2.5">
    <h2 className="text-[13px] font-bold uppercase tracking-wider pb-1" style={{ color }}>
      {text}
    </h2>
    <div className="h-[2px] w-full" style={{ backgroundColor: color }} />
  </div>
);

export const WorkExperienceItem = ({ company, role, duration, description, color }) => (
  <div className="mb-3.5">
    <div className="flex justify-between items-baseline gap-2">
      <div>
        <h3 className="text-[13px] font-bold text-gray-800">{company}</h3>
        <p className="text-[12px] font-medium" style={{ color }}>{role}</p>
      </div>
      <p className="text-[10.5px] text-gray-500 whitespace-nowrap">{duration}</p>
    </div>
    <p className="text-[11px] text-gray-600 leading-relaxed mt-1 whitespace-pre-line">{description}</p>
  </div>
);

export const EducationItem = ({ degree, institution, duration }) => (
  <div className="mb-3">
    <h3 className="text-[12px] font-bold text-gray-800">{degree}</h3>
    <p className="text-[11px] text-gray-600">{institution}</p>
    <p className="text-[10px] text-gray-400">{duration}</p>
  </div>
);

export const ProjectItem = ({ title, description, github, liveDemo, accent }) => (
  <div className="mb-3">
    <h3 className="text-[12px] font-bold text-gray-800">{title}</h3>
    <p className="text-[11px] text-gray-600 leading-relaxed mt-0.5">{description}</p>
    <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
      {github && <span className="text-[10px] font-medium" style={{ color: accent }}>GitHub ↗</span>}
      {liveDemo && <span className="text-[10px] font-medium" style={{ color: accent }}>Live ↗</span>}
    </div>
  </div>
);

export const CertificationItem = ({ title, issuer, year, accent }) => (
  <div className="mb-2">
    <h3 className="text-[12px] font-bold text-gray-800">{title}</h3>
    <div className="flex items-center gap-2">
      {year && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: accent }}>{year}</span>}
      <p className="text-[10px] text-gray-500">{issuer}</p>
    </div>
  </div>
);

export const SkillBar = ({ name, progress, accent }) => (
  <div className="mb-1.5">
    <div className="flex justify-between items-center mb-0.5">
      <span className="text-[11px] font-medium text-gray-700">{name}</span>
    </div>
    <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: accent }} />
    </div>
  </div>
);

export const LanguageDots = ({ name, progress, accent }) => {
  const filled = Math.round((progress / 100) * 5);
  return (
    <div className="flex items-center justify-between mb-1.5">
      <span className="text-[11px] font-medium text-gray-700">{name}</span>
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: i < filled ? accent : "#e5e7eb" }} />
        ))}
      </div>
    </div>
  );
};

export const ContactRow = ({ icon, value }) => (
  <div className="flex items-center gap-1.5 mb-1">
    <span className="shrink-0">{icon}</span>
    <span className="text-[10.5px] text-gray-600 truncate">{value}</span>
  </div>
);
