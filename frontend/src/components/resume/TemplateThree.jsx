import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";
import {
  WorkExperienceItem, EducationItem, ProjectItem, CertificationItem, SkillBar, LanguageDots,
} from "./ResumeSection";
import { formatYearMonth } from "@/lib/resumeUtils";

const ACCENT = "#854D43";
const DARK = "#632B2B";

// Template 03 — Bold Chocolate: full-width header banner
export default function TemplateThree({ resumeData }) {
  const {
    profileInfo = {}, contactInfo = {}, education = [], workExperience = [],
    projects = [], skills = [], certifications = [], languages = [], interests = [],
  } = resumeData;

  return (
    <div className="a4-page font-body text-gray-800" style={{ color: "#374151" }}>
      {/* Header banner */}
      <div className="px-10 py-7 text-white" style={{ backgroundColor: DARK }}>
        <h1 className="text-4xl font-bold tracking-tight">{profileInfo.fullName}</h1>
        <p className="text-lg mt-1" style={{ color: "#F7E58C" }}>{profileInfo.designation}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-white/85">
          {contactInfo.email && <span className="flex items-center gap-1 text-[11px]"><Mail size={11} />{contactInfo.email}</span>}
          {contactInfo.phone && <span className="flex items-center gap-1 text-[11px]"><Phone size={11} />{contactInfo.phone}</span>}
          {contactInfo.location && <span className="flex items-center gap-1 text-[11px]"><MapPin size={11} />{contactInfo.location}</span>}
          {contactInfo.linkedin && <span className="flex items-center gap-1 text-[11px]"><Linkedin size={11} />LinkedIn</span>}
          {contactInfo.github && <span className="flex items-center gap-1 text-[11px]"><Github size={11} />GitHub</span>}
        </div>
      </div>

      <div className="px-10 py-6">
        {profileInfo.summary && (
          <div className="mb-5 p-4 rounded-xl" style={{ backgroundColor: "#FFFBF4", border: "1px solid #f0e0d8" }}>
            <p className="text-[12px] leading-relaxed text-gray-600">{profileInfo.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-7">
          <div className="col-span-2 space-y-5">
            {workExperience.length > 0 && (
              <div>
                <h2 className="text-[14px] font-bold uppercase tracking-wider mb-2" style={{ color: DARK }}>Experience</h2>
                <div className="h-[2px] w-full mb-3" style={{ backgroundColor: ACCENT }} />
                {workExperience.map((exp, i) => (
                  <WorkExperienceItem key={i} company={exp.company} role={exp.role} duration={`${formatYearMonth(exp.startDate)} – ${formatYearMonth(exp.endDate)}`} description={exp.description} color={ACCENT} />
                ))}
              </div>
            )}
            {projects.length > 0 && (
              <div>
                <h2 className="text-[14px] font-bold uppercase tracking-wider mb-2" style={{ color: DARK }}>Projects</h2>
                <div className="h-[2px] w-full mb-3" style={{ backgroundColor: ACCENT }} />
                {projects.map((p, i) => <ProjectItem key={i} title={p.title} description={p.description} github={p.github} liveDemo={p.liveDemo} accent={ACCENT} />)}
              </div>
            )}
            {education.length > 0 && (
              <div>
                <h2 className="text-[14px] font-bold uppercase tracking-wider mb-2" style={{ color: DARK }}>Education</h2>
                <div className="h-[2px] w-full mb-3" style={{ backgroundColor: ACCENT }} />
                {education.map((e, i) => <EducationItem key={i} degree={e.degree} institution={e.institution} duration={`${formatYearMonth(e.startDate)} – ${formatYearMonth(e.endDate)}`} />)}
              </div>
            )}
          </div>

          <div className="col-span-1 space-y-5">
            {skills.length > 0 && (
              <div>
                <h2 className="text-[13px] font-bold uppercase tracking-wider mb-2" style={{ color: DARK }}>Skills</h2>
                <div className="h-[2px] w-full mb-2" style={{ backgroundColor: ACCENT }} />
                {skills.map((s, i) => <SkillBar key={i} name={s.name} progress={s.progress} accent={ACCENT} />)}
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <h2 className="text-[13px] font-bold uppercase tracking-wider mb-2" style={{ color: DARK }}>Certs</h2>
                <div className="h-[2px] w-full mb-2" style={{ backgroundColor: ACCENT }} />
                {certifications.map((c, i) => <CertificationItem key={i} title={c.title} issuer={c.issuer} year={c.year} accent={ACCENT} />)}
              </div>
            )}
            {languages.length > 0 && (
              <div>
                <h2 className="text-[13px] font-bold uppercase tracking-wider mb-2" style={{ color: DARK }}>Languages</h2>
                <div className="h-[2px] w-full mb-2" style={{ backgroundColor: ACCENT }} />
                {languages.map((l, i) => <LanguageDots key={i} name={l.name} progress={l.progress} accent={ACCENT} />)}
              </div>
            )}
            {interests.length > 0 && interests.some((i) => i) && (
              <div>
                <h2 className="text-[13px] font-bold uppercase tracking-wider mb-2" style={{ color: DARK }}>Interests</h2>
                <div className="h-[2px] w-full mb-2" style={{ backgroundColor: ACCENT }} />
                <div className="flex flex-wrap gap-1.5">
                  {interests.filter((i) => i).map((int, i) => (
                    <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded text-white" style={{ backgroundColor: ACCENT }}>{int}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
