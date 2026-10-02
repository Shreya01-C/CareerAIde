// Sample resume data used for template previews on the landing page.
export const DUMMY_RESUME_DATA = {
  profileInfo: {
    fullName: "Alex Johnson",
    designation: "Senior Software Developer",
    summary:
      "Full-stack developer with 5+ years building scalable web apps using modern JavaScript frameworks. Specialized in React, Node.js, and cloud technologies with a focus on clean architecture and performance.",
    previewUrl: "",
  },
  contactInfo: {
    email: "alex.johnson.dev@gmail.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "https://linkedin.com/in/alexjohnson-dev",
    github: "https://github.com/alexjohnson-code",
    website: "https://alexjohnson.dev",
  },
  education: [
    { degree: "M.S. Computer Science", institution: "Stanford University", startDate: "2016", endDate: "2018" },
    { degree: "B.S. Software Engineering", institution: "UC Berkeley", startDate: "2012", endDate: "2016" },
  ],
  workExperience: [
    {
      role: "Senior Software Engineer",
      company: "TechSolutions Inc.",
      location: "San Francisco, CA",
      startDate: "2020-06",
      endDate: "2023-12",
      description:
        "Led a team of 5 developers building a SaaS platform serving 50,000+ users. Architected microservices that improved performance by 40%.",
    },
    {
      role: "Software Developer",
      company: "InnovateSoft",
      location: "San Jose, CA",
      startDate: "2018-07",
      endDate: "2020-05",
      description:
        "Developed RESTful APIs handling 10,000+ requests/min with 99.9% uptime. Redesigned the frontend in React, improving load speed by 60%.",
    },
  ],
  projects: [
    {
      title: "E-commerce Analytics Dashboard",
      description: "Real-time analytics dashboard tracking sales, inventory, and customer behavior.",
      github: "https://github.com/alex/ecommerce-analytics",
      liveDemo: "https://demo.alex.dev/analytics",
    },
  ],
  skills: [
    { name: "JavaScript", progress: 90 },
    { name: "React", progress: 88 },
    { name: "Node.js", progress: 85 },
    { name: "AWS", progress: 75 },
    { name: "Python", progress: 70 },
    { name: "Docker", progress: 72 },
  ],
  certifications: [
    { title: "AWS Solutions Architect", issuer: "Amazon", year: "2022" },
    { title: "Scrum Master", issuer: "Scrum Alliance", year: "2020" },
  ],
  languages: [
    { name: "English", progress: 100 },
    { name: "Spanish", progress: 60 },
  ],
  interests: ["Open Source", "Machine Learning", "Hiking", "Photography"],
};

export const TEMPLATE_LIST = [
  { id: "01", name: "Classic Rose", accent: "#B3576A", tag: "Timeless" },
  { id: "02", name: "Modern Teal", accent: "#74B5B5", tag: "Clean" },
  { id: "03", name: "Bold Chocolate", accent: "#854D43", tag: "Striking" },
];
