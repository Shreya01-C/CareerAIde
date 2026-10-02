import { Plus, Trash2, User, Mail, Briefcase, GraduationCap, Wrench, FolderGit2, Award, Globe2 } from "lucide-react";
import { TextInput, TextArea, RatingInput, AddButton, TrashButton, FormCard } from "./FormPrimitives";

export function ProfileInfoForm({ profileData, updateSection }) {
  return (
    <FormCard title="Personal Information" icon={<User size={20} />}>
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TextInput label="Full Name" placeholder="John Doe" value={profileData.fullName} onChange={(e) => updateSection("fullName", e.target.value)} />
          <TextInput label="Designation" placeholder="Full Stack Developer" value={profileData.designation} onChange={(e) => updateSection("designation", e.target.value)} />
        </div>
        <TextArea label="Professional Summary" placeholder="A short introduction about yourself" rows={4} value={profileData.summary} onChange={(e) => updateSection("summary", e.target.value)} />
      </div>
    </FormCard>
  );
}

export function ContactInfoForm({ contactInfo, updateSection }) {
  return (
    <FormCard title="Contact Information" icon={<Mail size={20} />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <TextInput label="Location" placeholder="San Francisco, CA" value={contactInfo.location} onChange={(e) => updateSection("location", e.target.value)} />
        </div>
        <TextInput label="Email" type="email" placeholder="john@example.com" value={contactInfo.email} onChange={(e) => updateSection("email", e.target.value)} />
        <TextInput label="Phone" placeholder="+1 555 123 4567" value={contactInfo.phone} onChange={(e) => updateSection("phone", e.target.value)} />
        <TextInput label="LinkedIn" placeholder="linkedin.com/in/username" value={contactInfo.linkedin} onChange={(e) => updateSection("linkedin", e.target.value)} />
        <TextInput label="GitHub" placeholder="github.com/username" value={contactInfo.github} onChange={(e) => updateSection("github", e.target.value)} />
        <div className="md:col-span-2">
          <TextInput label="Website" placeholder="yourwebsite.com" value={contactInfo.website} onChange={(e) => updateSection("website", e.target.value)} />
        </div>
      </div>
    </FormCard>
  );
}

function ArrayItemCard({ children, onRemove, canRemove }) {
  return (
    <div className="relative rounded-2xl bg-white/60 border border-border p-5">
      {canRemove && <div className="absolute top-3 right-3"><TrashButton onClick={onRemove} /></div>}
      {children}
    </div>
  );
}

export function WorkExperienceForm({ workExperience, updateArrayItem, addArrayItem, removeArrayItem }) {
  return (
    <FormCard title="Work Experience" icon={<Briefcase size={20} />}>
      <div className="space-y-4">
        {workExperience.map((exp, i) => (
          <ArrayItemCard key={i} canRemove={workExperience.length > 1} onRemove={() => removeArrayItem(i)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
              <TextInput label="Company" placeholder="ABC Corp" value={exp.company} onChange={(e) => updateArrayItem(i, "company", e.target.value)} />
              <TextInput label="Role" placeholder="Frontend Developer" value={exp.role} onChange={(e) => updateArrayItem(i, "role", e.target.value)} />
              <TextInput label="Start Date" type="month" value={exp.startDate} onChange={(e) => updateArrayItem(i, "startDate", e.target.value)} />
              <TextInput label="End Date" type="month" value={exp.endDate} onChange={(e) => updateArrayItem(i, "endDate", e.target.value)} />
            </div>
            <div className="mt-4 pr-8">
              <TextArea label="Description" placeholder="What did you achieve in this role?" rows={3} value={exp.description} onChange={(e) => updateArrayItem(i, "description", e.target.value)} />
            </div>
          </ArrayItemCard>
        ))}
        <AddButton onClick={() => addArrayItem({ company: "", role: "", startDate: "", endDate: "", description: "" })}>
          <Plus size={16} /> Add Work Experience
        </AddButton>
      </div>
    </FormCard>
  );
}

export function EducationDetailsForm({ educationInfo, updateArrayItem, addArrayItem, removeArrayItem }) {
  return (
    <FormCard title="Education" icon={<GraduationCap size={20} />}>
      <div className="space-y-4">
        {educationInfo.map((edu, i) => (
          <ArrayItemCard key={i} canRemove={educationInfo.length > 1} onRemove={() => removeArrayItem(i)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
              <TextInput label="Degree" placeholder="B.Tech in Computer Science" value={edu.degree} onChange={(e) => updateArrayItem(i, "degree", e.target.value)} />
              <TextInput label="Institution" placeholder="XYZ University" value={edu.institution} onChange={(e) => updateArrayItem(i, "institution", e.target.value)} />
              <TextInput label="Start Date" type="month" value={edu.startDate} onChange={(e) => updateArrayItem(i, "startDate", e.target.value)} />
              <TextInput label="End Date" type="month" value={edu.endDate} onChange={(e) => updateArrayItem(i, "endDate", e.target.value)} />
            </div>
          </ArrayItemCard>
        ))}
        <AddButton onClick={() => addArrayItem({ degree: "", institution: "", startDate: "", endDate: "" })}>
          <Plus size={16} /> Add Education
        </AddButton>
      </div>
    </FormCard>
  );
}

export function SkillsInfoForm({ skillsInfo, updateArrayItem, addArrayItem, removeArrayItem }) {
  return (
    <FormCard title="Skills" icon={<Wrench size={20} />}>
      <div className="space-y-4">
        {skillsInfo.map((skill, i) => (
          <ArrayItemCard key={i} canRemove={skillsInfo.length > 1} onRemove={() => removeArrayItem(i)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end pr-8">
              <TextInput label="Skill Name" placeholder="JavaScript" value={skill.name} onChange={(e) => updateArrayItem(i, "name", e.target.value)} />
              <div>
                <label className="block text-sm font-bold text-chocolate mb-2 font-heading">Proficiency</label>
                <RatingInput value={skill.progress} onChange={(v) => updateArrayItem(i, "progress", v)} />
              </div>
            </div>
          </ArrayItemCard>
        ))}
        <AddButton onClick={() => addArrayItem({ name: "", progress: 0 })}>
          <Plus size={16} /> Add Skill
        </AddButton>
      </div>
    </FormCard>
  );
}

export function ProjectDetailForm({ projectInfo, updateArrayItem, addArrayItem, removeArrayItem }) {
  return (
    <FormCard title="Projects" icon={<FolderGit2 size={20} />}>
      <div className="space-y-4">
        {projectInfo.map((p, i) => (
          <ArrayItemCard key={i} canRemove={projectInfo.length > 1} onRemove={() => removeArrayItem(i)}>
            <div className="space-y-4 pr-8">
              <TextInput label="Project Title" placeholder="Portfolio Website" value={p.title} onChange={(e) => updateArrayItem(i, "title", e.target.value)} />
              <TextArea label="Description" placeholder="Short description of the project" rows={2} value={p.description} onChange={(e) => updateArrayItem(i, "description", e.target.value)} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput label="GitHub Link" placeholder="github.com/user/project" value={p.github} onChange={(e) => updateArrayItem(i, "github", e.target.value)} />
                <TextInput label="Live Demo" placeholder="yourproject.live" value={p.liveDemo} onChange={(e) => updateArrayItem(i, "liveDemo", e.target.value)} />
              </div>
            </div>
          </ArrayItemCard>
        ))}
        <AddButton onClick={() => addArrayItem({ title: "", description: "", github: "", liveDemo: "" })}>
          <Plus size={16} /> Add Project
        </AddButton>
      </div>
    </FormCard>
  );
}

export function CertificationInfoForm({ certifications, updateArrayItem, addArrayItem, removeArrayItem }) {
  return (
    <FormCard title="Certifications" icon={<Award size={20} />}>
      <div className="space-y-4">
        {certifications.map((c, i) => (
          <ArrayItemCard key={i} canRemove={certifications.length > 1} onRemove={() => removeArrayItem(i)}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pr-8">
              <TextInput label="Title" placeholder="AWS Solutions Architect" value={c.title} onChange={(e) => updateArrayItem(i, "title", e.target.value)} />
              <TextInput label="Issuer" placeholder="Amazon" value={c.issuer} onChange={(e) => updateArrayItem(i, "issuer", e.target.value)} />
              <TextInput label="Year" placeholder="2024" value={c.year} onChange={(e) => updateArrayItem(i, "year", e.target.value)} />
            </div>
          </ArrayItemCard>
        ))}
        <AddButton onClick={() => addArrayItem({ title: "", issuer: "", year: "" })}>
          <Plus size={16} /> Add Certification
        </AddButton>
      </div>
    </FormCard>
  );
}

export function AdditionalInfoForm({ languages, interests, updateArrayItem, addArrayItem, removeArrayItem }) {
  return (
    <FormCard title="Languages & Interests" icon={<Globe2 size={20} />}>
      <div className="space-y-6">
        <div>
          <h3 className="font-heading font-bold text-chocolate mb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-rose" /> Languages
          </h3>
          <div className="space-y-3">
            {languages.map((lang, i) => (
              <ArrayItemCard key={i} canRemove={languages.length > 1} onRemove={() => removeArrayItem("languages", i)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end pr-8">
                  <TextInput label="Language" placeholder="English" value={lang.name} onChange={(e) => updateArrayItem("languages", i, "name", e.target.value)} />
                  <div>
                    <label className="block text-sm font-bold text-chocolate mb-2 font-heading">Proficiency</label>
                    <RatingInput value={lang.progress} color="#74B5B5" onChange={(v) => updateArrayItem("languages", i, "progress", v)} />
                  </div>
                </div>
              </ArrayItemCard>
            ))}
            <AddButton onClick={() => addArrayItem("languages", { name: "", progress: 0 })}>
              <Plus size={16} /> Add Language
            </AddButton>
          </div>
        </div>

        <div>
          <h3 className="font-heading font-bold text-chocolate mb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow" /> Interests
          </h3>
          <div className="space-y-3">
            {interests.map((int, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-1">
                  <TextInput placeholder="e.g. Photography, Hiking" value={int} onChange={(e) => updateArrayItem("interests", i, null, e.target.value)} />
                </div>
                {interests.length > 1 && <TrashButton onClick={() => removeArrayItem("interests", i)} />}
              </div>
            ))}
            <AddButton onClick={() => addArrayItem("interests", "")}>
              <Plus size={16} /> Add Interest
            </AddButton>
          </div>
        </div>
      </div>
    </FormCard>
  );
}
