import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export function formatYearMonth(yearMonth) {
  return yearMonth ? moment(yearMonth, "YYYY-MM").format("MMM YYYY") : "";
}

export const emptyResume = () => ({
  title: "Untitled Resume",
  template: "01",
  thumbnailLink: "",
  completion: 0,
  profileInfo: { fullName: "", designation: "", summary: "", previewUrl: "" },
  contactInfo: {
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
  },
  workExperience: [{ company: "", role: "", startDate: "", endDate: "", description: "" }],
  education: [{ degree: "", institution: "", startDate: "", endDate: "" }],
  skills: [{ name: "", progress: 0 }],
  projects: [{ title: "", description: "", github: "", liveDemo: "" }],
  certifications: [{ title: "", issuer: "", year: "" }],
  languages: [{ name: "", progress: 0 }],
  interests: [""],
});

export const calculateCompletion = (resumeData) => {
  let completed = 0;
  let total = 0;

  total += 3;
  if (resumeData.profileInfo?.fullName) completed++;
  if (resumeData.profileInfo?.designation) completed++;
  if (resumeData.profileInfo?.summary) completed++;

  total += 2;
  if (resumeData.contactInfo?.email) completed++;
  if (resumeData.contactInfo?.phone) completed++;

  resumeData.workExperience?.forEach((exp) => {
    total += 5;
    if (exp.company) completed++;
    if (exp.role) completed++;
    if (exp.startDate) completed++;
    if (exp.endDate) completed++;
    if (exp.description) completed++;
  });

  resumeData.education?.forEach((edu) => {
    total += 4;
    if (edu.degree) completed++;
    if (edu.institution) completed++;
    if (edu.startDate) completed++;
    if (edu.endDate) completed++;
  });

  resumeData.skills?.forEach((skill) => {
    total += 2;
    if (skill.name) completed++;
    if (skill.progress > 0) completed++;
  });

  resumeData.projects?.forEach((project) => {
    total += 4;
    if (project.title) completed++;
    if (project.description) completed++;
    if (project.github) completed++;
    if (project.liveDemo) completed++;
  });

  resumeData.certifications?.forEach((cert) => {
    total += 3;
    if (cert.title) completed++;
    if (cert.issuer) completed++;
    if (cert.year) completed++;
  });

  resumeData.languages?.forEach((lang) => {
    total += 2;
    if (lang.name) completed++;
    if (lang.progress > 0) completed++;
  });

  total += resumeData.interests?.length || 0;
  completed += resumeData.interests?.filter((i) => i?.trim() !== "")?.length || 0;

  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

// Generate a PDF from a DOM element using html2canvas + jsPDF (both installed).
export const downloadElementAsPDF = async (element, filename) => {
  const html2canvas = (await import("html2canvas")).default;
  const { jsPDF } = await import("jspdf");

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#FFFFFF",
    logging: false,
    windowWidth: element.scrollWidth,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgHeight = (canvas.height * pageWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;
  pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position -= pageHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(filename.replace(/[^a-z0-9]/gi, "_") + ".pdf");
};
