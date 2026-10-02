import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";
import {
  SectionTitle, WorkExperienceItem, EducationItem, ProjectItem,
  CertificationItem, SkillBar, LanguageDots, ContactRow,
} from "./ResumeSection";
import { formatYearMonth } from "@/lib/resumeUtils";

const ACCENT = "#B3576A";

// Template 01 — Classic Rose: header + two-column body
export default function TemplateOne({ resumeData }) {
  const {
    profileInfo = {}, contactInfo = {}, education = [], workExperience = [],
    projects = [], skills = [], certifications = [], languages = [], interests = [],
  } = resumeData;

  return (
    <div className="a4-page p-10 font-body text-gray-800" style={{ color: "#374151" }}>
      {/* Header */}
      <div className="pb-5 mb-5" style={{ borderBottom: `3px solid ${ACCENT}` }}>
        <h1 className="text-3xl font-bold" style={{ color: "#632B2B" }}>{profileInfo.fullName}</h1>
        <p className="text-lg mt-0.5" style={{ color: ACCENT }}>{profileInfo.designation}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2.5 text-gray-600">
          {contactInfo.email && <ContactRow icon={<Mail size={11} />} value={contactInfo.email} />}
          {contactInfo.phone && <ContactRow icon={<Phone size={11} />} value={contactInfo.phone} />}
          {contactInfo.location && <ContactRow icon={<MapPin size={11} />} value={contactInfo.location} />}
          {contactInfo.linkedin && <ContactRow icon={<Linkedin size={11} />} value="LinkedIn" />}
          {contactInfo.github && <ContactRow icon={<Github size={11} />} value="GitHub" />}
          {contactInfo.website && <ContactRow icon={<Globe size={11} />} value="Portfolio" />}
        </div>
      </div>

      {profileInfo.summary && (
        <div className="mb-5">
          <SectionTitle text="Professional Summary" color={ACCENT} />
          <p className="text-[12px] leading-relaxed text-gray-600">{profileInfo.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-7">
        <div className="col-span-2 space-y-5">
          {workExperience.length > 0 && (
            <div>
              <SectionTitle text="Work Experience" color={ACCENT} />
              {workExperience.map((exp, i) => (
                <WorkExperienceItem
                  key={i}
                  company={exp.company}
                  role={exp.role}
                  duration={`${formatYearMonth(exp.startDate)} – ${formatYearMonth(exp.endDate)}`}
                  description={exp.description}
                  color={ACCENT}
                />
              ))}
            </div>
          )}
          {projects.length > 0 && (
            <div>
              <SectionTitle text="Projects" color={ACCENT} />
              {projects.map((p, i) => (
                <ProjectItem key={i} title={p.title} description={p.description} github={p.github} liveDemo={p.liveDemo} accent={ACCENT} />
              ))}
            </div>
          )}
        </div>

        <div className="col-span-1 space-y-5">
          {skills.length > 0 && (
            <div>
              <SectionTitle text="Skills" color={ACCENT} />
              {skills.map((s, i) => <SkillBar key={i} name={s.name} progress={s.progress} accent={ACCENT} />)}
            </div>
          )}
          {education.length > 0 && (
            <div>
              <SectionTitle text="Education" color={ACCENT} />
              {education.map((e, i) => (
                <EducationItem key={i} degree={e.degree} institution={e.institution} duration={`${formatYearMonth(e.startDate)} – ${formatYearMonth(e.endDate)}`} />
              ))}
            </div>
          )}
          {certifications.length > 0 && (
            <div>
              <SectionTitle text="Certifications" color={ACCENT} />
              {certifications.map((c, i) => <CertificationItem key={i} title={c.title} issuer={c.issuer} year={c.year} accent={ACCENT} />)}
            </div>
          )}
          {languages.length > 0 && (
            <div>
              <SectionTitle text="Languages" color={ACCENT} />
              {languages.map((l, i) => <LanguageDots key={i} name={l.name} progress={l.progress} accent={ACCENT} />)}
            </div>
          )}
          {interests.length > 0 && interests.some((i) => i) && (
            <div>
              <SectionTitle text="Interests" color={ACCENT} />
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
  );
}
