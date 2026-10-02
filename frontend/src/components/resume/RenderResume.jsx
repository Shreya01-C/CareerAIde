import TemplateOne from "./TemplateOne";
import TemplateTwo from "./TemplateTwo";
import TemplateThree from "./TemplateThree";
export default function RenderResume({ templateId, resumeData }) {
  switch (templateId) {
    case "02":
      return <TemplateTwo resumeData={resumeData} />;
    case "03":
      return <TemplateThree resumeData={resumeData} />;
    case "01":
    default:
      return <TemplateOne resumeData={resumeData} />;
  }
}
