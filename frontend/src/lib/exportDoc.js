import { formatYearMonth } from "./resumeUtils";

// Word-compatible HTML export. Word opens the .doc file as a fully editable
// document with real text (not an image), so users can tweak it afterwards.
const ACCENTS = { "01": "#B3576A", "02": "#74B5B5", "03": "#854D43" };

const esc = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const has = (value) => value !== undefined && value !== null && String(value).trim() !== "";

const range = (start, end) => {
  const from = formatYearMonth(start);
  const to = formatYearMonth(end);
  if (!from && !to) return "";
  return `${from}${from && to ? " – " : ""}${to}`;
};

export function buildResumeDocHtml(resumeData) {
  const accent = ACCENTS[resumeData.template] || ACCENTS["01"];
  const profile = resumeData.profileInfo || {};
  const contact = resumeData.contactInfo || {};
  const contacts = [
    contact.email,
    contact.phone,
    contact.location,
    contact.linkedin,
    contact.github,
    contact.website,
  ].filter(has);

  const heading = (text) =>
    `<h2 style="font-family:Georgia,serif;font-size:12pt;color:${accent};text-transform:uppercase;letter-spacing:1pt;border-bottom:1.5pt solid ${accent};padding-bottom:3pt;margin:16pt 0 8pt;">${esc(
      text
    )}</h2>`;

  const blocks = [];

  if (has(profile.summary)) {
    blocks.push(heading("Professional Summary"));
    blocks.push(`<p style="margin:0 0 8pt;line-height:1.5;">${esc(profile.summary)}</p>`);
  }

  const work = (resumeData.workExperience || []).filter((w) => has(w.company) || has(w.role));
  if (work.length) {
    blocks.push(heading("Work Experience"));
    work.forEach((w) => {
      const dates = range(w.startDate, w.endDate);
      const meta = [has(w.company) ? esc(w.company) : "", dates ? `(${esc(dates)})` : ""]
        .filter(Boolean)
        .join(" ");
      blocks.push(
        `<p style="margin:0 0 2pt;"><b style="font-size:11.5pt;">${esc(w.role)}</b>${
          meta ? ` <span style="color:#555;">${meta}</span>` : ""
        }</p>`
      );
      blocks.push(
        has(w.description)
          ? `<p style="margin:0 0 10pt;line-height:1.5;color:#333;">${esc(w.description).replace(
              /\n/g,
              "<br>"
            )}</p>`
          : `<p style="margin:0 0 6pt;"></p>`
      );
    });
  }

  const projects = (resumeData.projects || []).filter((x) => has(x.title));
  if (projects.length) {
    blocks.push(heading("Projects"));
    projects.forEach((x) => {
      const links = [
        has(x.github) ? `GitHub: ${x.github}` : "",
        has(x.liveDemo) ? `Live: ${x.liveDemo}` : "",
      ]
        .filter(Boolean)
        .join("  |  ");
      blocks.push(`<p style="margin:0 0 2pt;"><b style="font-size:11.5pt;">${esc(x.title)}</b></p>`);
      if (has(x.description)) {
        blocks.push(`<p style="margin:0 0 2pt;line-height:1.5;color:#333;">${esc(x.description)}</p>`);
      }
      blocks.push(
        links
          ? `<p style="margin:0 0 10pt;color:#666;font-size:9.5pt;">${esc(links)}</p>`
          : `<p style="margin:0 0 6pt;"></p>`
      );
    });
  }

  const education = (resumeData.education || []).filter((x) => has(x.degree) || has(x.institution));
  if (education.length) {
    blocks.push(heading("Education"));
    education.forEach((x) => {
      const dates = range(x.startDate, x.endDate);
      const meta = [has(x.institution) ? esc(x.institution) : "", dates ? `(${esc(dates)})` : ""]
        .filter(Boolean)
        .join(" ");
      blocks.push(
        `<p style="margin:0 0 6pt;"><b style="font-size:11.5pt;">${esc(x.degree)}</b>${
          meta ? ` <span style="color:#555;">${meta}</span>` : ""
        }</p>`
      );
    });
  }

  const skills = (resumeData.skills || []).map((s) => s.name).filter(has);
  if (skills.length) {
    blocks.push(heading("Skills"));
    blocks.push(`<p style="margin:0 0 8pt;line-height:1.5;">${esc(skills.join("  •  "))}</p>`);
  }

  const certs = (resumeData.certifications || []).filter((x) => has(x.title));
  if (certs.length) {
    blocks.push(heading("Certifications"));
    certs.forEach((x) => {
      const meta = [has(x.issuer) ? esc(x.issuer) : "", has(x.year) ? `(${esc(x.year)})` : ""]
        .filter(Boolean)
        .join(" ");
      blocks.push(
        `<p style="margin:0 0 4pt;">${esc(x.title)}${meta ? ` <span style="color:#555;">${meta}</span>` : ""}</p>`
      );
    });
  }

  const languages = (resumeData.languages || []).map((l) => l.name).filter(has);
  if (languages.length) {
    blocks.push(heading("Languages"));
    blocks.push(`<p style="margin:0 0 8pt;">${esc(languages.join("  •  "))}</p>`);
  }

  const interests = (resumeData.interests || []).filter(has);
  if (interests.length) {
    blocks.push(heading("Interests"));
    blocks.push(`<p style="margin:0 0 8pt;">${esc(interests.join("  •  "))}</p>`);
  }

  return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
<meta charset="utf-8">
<title>${esc(profile.fullName || resumeData.title || "Resume")}</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->
<style>
  @page { size: A4; margin: 1.6cm 1.8cm; }
  body { font-family: Calibri, Arial, sans-serif; font-size: 10.5pt; color: #222222; }
</style>
</head>
<body>
  <h1 style="font-family:Georgia,serif;font-size:24pt;color:#632B2B;margin:0;">${esc(profile.fullName || "")}</h1>
  ${
    has(profile.designation)
      ? `<p style="font-family:Georgia,serif;font-size:13pt;color:${accent};margin:2pt 0 0;">${esc(
          profile.designation
        )}</p>`
      : ""
  }
  ${
    contacts.length
      ? `<p style="margin:6pt 0 0;color:#555555;font-size:9.5pt;">${esc(contacts.join("  •  "))}</p>`
      : ""
  }
  ${blocks.join("\n  ")}
</body>
</html>`;
}

export function downloadResumeAsDoc(resumeData, filename = "resume") {
  const blob = new Blob(["\ufeff", buildResumeDocHtml(resumeData)], {
    type: "application/msword",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.replace(/[^a-z0-9]/gi, "_") + ".doc";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
