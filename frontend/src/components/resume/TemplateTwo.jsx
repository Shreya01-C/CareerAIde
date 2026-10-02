import { Mail, Phone, MapPin, Linkedin, Github, Globe, Star } from "lucide-react";
import {
  WorkExperienceItem, EducationItem, ProjectItem, CertificationItem, SkillBar, LanguageDots,
} from "./ResumeSection";
import { formatYearMonth } from "@/lib/resumeUtils";

const ACCENT = "#74B5B5";
const DARK = "#4a8a8a";

// Template 02 — Modern Teal: colored sidebar + main column
export default function TemplateTwo({ resumeData }) {
  const {
    profileInfo = {}, contactInfo = {}, education = [], workExperience = [],
    projects = [], skills = [], certifications = [], languages = [], interests = [],
  } = resumeData;

  const SideTitle = ({ text }) => (
    <h2 className="text-[12px] font-bold uppercase tracking-wider text-white pb-1 mb-2" style={{ borderBottom: "1.5px solid rgba(255,255,255,0.4)" }}>
      {text}
    </h2>
  );

  return (
    <div className="a4-page font-body text-gray-800 flex" style={{ color: "#374151" }}>
      {/* Sidebar */}
      <div className="w-[34%] p-7 text-white" style={{ backgroundColor: DARK }}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold leading-tight">{profileInfo.fullName}</h1>
          <p className="text-sm mt-1" style={{ color: "#cfeaea" }}>{profileInfo.designation}</p>
        </div>

        <div className="mb-6">
          <SideTitle text="Contact" />
          {contactInfo.email && <div className="flex items-center gap-1.5 mb-1.5"><Mail size={11} /><span className="text-[10px] break-all">{contactInfo.email}</span></div>}
          {contactInfo.phone && <div className="flex items-center gap-1.5 mb-1.5"><Phone size={11} /><span className="text-[10px]">{contactInfo.phone}</span></div>}
          {contactInfo.location && <div className="flex items-center gap-1.5 mb-1.5"><MapPin size={11} /><span className="text-[10px]">{contactInfo.location}</span></div>}
          {contactInfo.linkedin && <div className="flex items-center gap-1.5 mb-1.5"><Linkedin size={11} /><span className="text-[10px]">LinkedIn</span></div>}
          {contactInfo.github && <div className="flex items-center gap-1.5 mb-1.5"><Github size={11} /><span className="text-[10px]">GitHub</span></div>}
          {contactInfo.website && <div className="flex items-center gap-1.5 mb-1.5"><Globe size={11} /><span className="text-[10px]">Portfolio</span></div>}
        </div>

        {skills.length > 0 && (
          <div className="mb-6">
            <SideTitle text="Skills" />
            {skills.map((s, i) => (
              <div key={i} className="mb-2">
                <div className="text-[10.5px] font-medium mb-0.5">{s.name}</div>
                <div className="h-1.5 w-full rounded-full bg-white/25 overflow-hidden">
                  <div className="h-full rounded-full bg-white" style={{ width: `${s.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div className="mb-6">
            <SideTitle text="Languages" />
            {languages.map((l, i) => <LanguageDots key={i} name={l.name} progress={l.progress} accent="#ffffff" />)}
          </div>
        )}

        {interests.length > 0 && interests.some((i) => i) && (
          <div>
            <SideTitle text="Interests" />
            <div className="flex flex-wrap gap-1.5">
              {interests.filter((i) => i).map((int, i) => (
                <span key={i} className="text-[9.5px] font-medium px-2 py-0.5 rounded-full bg-white/20">{int}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main */}
      <div className="flex-1 p-7">
        {profileInfo.summary && (
          <div className="mb-5">
            <h2 className="text-[13px] font-bold uppercase tracking-wider pb-1 mb-1.5" style={{ color: DARK, borderBottom: `2px solid ${ACCENT}` }}>Summary</h2>
            <p className="text-[12px] leading-relaxed text-gray-600">{profileInfo.summary}</p>
          </div>
        )}
        {workExperience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-[13px] font-bold uppercase tracking-wider pb-1 mb-2" style={{ color: DARK, borderBottom: `2px solid ${ACCENT}` }}>Experience</h2>
            {workExperience.map((exp, i) => (
              <WorkExperienceItem key={i} company={exp.company} role={exp.role} duration={`${formatYearMonth(exp.startDate)} – ${formatYearMonth(exp.endDate)}`} description={exp.description} color={ACCENT} />
            ))}
          </div>
        )}
        {projects.length > 0 && (
          <div className="mb-5">
            <h2 className="text-[13px] font-bold uppercase tracking-wider pb-1 mb-2" style={{ color: DARK, borderBottom: `2px solid ${ACCENT}` }}>Projects</h2>
            {projects.map((p, i) => <ProjectItem key={i} title={p.title} description={p.description} github={p.github} liveDemo={p.liveDemo} accent={ACCENT} />)}
          </div>
        )}
        {education.length > 0 && (
          <div className="mb-5">
            <h2 className="text-[13px] font-bold uppercase tracking-wider pb-1 mb-2" style={{ color: DARK, borderBottom: `2px solid ${ACCENT}` }}>Education</h2>
            {education.map((e, i) => <EducationItem key={i} degree={e.degree} institution={e.institution} duration={`${formatYearMonth(e.startDate)} – ${formatYearMonth(e.endDate)}`} />)}
          </div>
        )}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-[13px] font-bold uppercase tracking-wider pb-1 mb-2" style={{ color: DARK, borderBottom: `2px solid ${ACCENT}` }}>Certifications</h2>
            {certifications.map((c, i) => <CertificationItem key={i} title={c.title} issuer={c.issuer} year={c.year} accent={ACCENT} />)}
          </div>
        )}
      </div>
    </div>
  );
}
