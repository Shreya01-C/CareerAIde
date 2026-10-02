import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import Navbar from "@/components/Navbar";
import AuthModal from "@/components/AuthModal";
import StepProgress, { STEPS } from "@/components/resume/StepProgress";
import ScaledPreview from "@/components/resume/ScaledPreview";
import RenderResume from "@/components/resume/RenderResume";
import ThemeSelector from "@/components/resume/ThemeSelector";
import {
  ProfileInfoForm, ContactInfoForm, WorkExperienceForm, EducationDetailsForm,
  SkillsInfoForm, ProjectDetailForm, CertificationInfoForm, AdditionalInfoForm,
} from "@/components/resume/Forms";
import { emptyResume, calculateCompletion, downloadElementAsPDF } from "@/lib/resumeUtils";
import { downloadResumeAsDoc } from "@/lib/exportDoc";
import { saveDraft, loadDraft, clearDraft, setPendingDownload, consumePendingDownload } from "@/lib/draftStorage";
import { ArrowLeft, ArrowRight, Download, Palette, Save, Trash2, Check, Loader2, AlertCircle, Eye, Sparkles, FileText, PenLine } from "lucide-react";

export default function EditResume() {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const pdfRef = useRef(null);

  const [resumeData, setResumeData] = useState(emptyResume());
  const [currentPage, setCurrentPage] = useState("profile-info");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(!isAuthenticated && !!resumeId);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showTheme, setShowTheme] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showFormat, setShowFormat] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(false);
  const [toast, setToast] = useState("");

  const completion = calculateCompletion(resumeData);

  // Load: existing DB record, or guest draft from localStorage, or empty
  useEffect(() => {
    (async () => {
      if (resumeId && isAuthenticated) {
        try {
          setLoading(true);
          const r = await base44.entities.Resume.get(resumeId);
          setResumeData({ ...emptyResume(), ...r });
        } catch (e) {
          console.error("Failed to load resume", e);
          showToast("Could not load that resume");
        } finally {
          setLoading(false);
        }
      } else if (!resumeId && !isAuthenticated) {
        // guest — restore any saved draft so work is never lost
        const draft = loadDraft();
        if (draft) {
          setResumeData({ ...emptyResume(), ...draft });
          showToast("Restored your previous session");
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    })();
    window.scrollTo(0, 0);
  }, [resumeId, isAuthenticated]);

  // Honour a template picked on the landing page (e.g. /edit?template=02)
  useEffect(() => {
    if (resumeId) return;
    const tpl = new URLSearchParams(window.location.search).get("template");
    if (tpl && ["01", "02", "03"].includes(tpl)) {
      setResumeData((p) => ({ ...p, template: tpl }));
    }
  }, [resumeId]);

  // Auto-save: guests → localStorage; logged-in with record → DB (debounced)
  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      saveDraft(resumeData); // the Auth-Bridge: survives login/signup
    }
  }, [resumeData, isAuthenticated, loading]);

  useEffect(() => {
    if (!isAuthenticated || !resumeId || loading) return;
    const t = setTimeout(async () => {
      try {
        await base44.entities.Resume.update(resumeId, { ...resumeData, completion });
      } catch (e) {
        /* silent autosave */
      }
    }, 1200);
    return () => clearTimeout(t);
  }, [resumeData, isAuthenticated, resumeId, loading, completion]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  // ---- mutations ----
  const updateSection = (section, key, value) =>
    setResumeData((p) => ({ ...p, [section]: { ...p[section], [key]: value } }));

  const updateArrayItem = (section, index, key, value) =>
    setResumeData((p) => {
      const arr = [...p[section]];
      arr[index] = key === null ? value : { ...arr[index], [key]: value };
      return { ...p, [section]: arr };
    });

  const addArrayItem = (section, newItem) =>
    setResumeData((p) => ({ ...p, [section]: [...p[section], newItem] }));

  const removeArrayItem = (section, index) =>
    setResumeData((p) => {
      const arr = [...p[section]];
      arr.splice(index, 1);
      return { ...p, [section]: arr };
    });

  // ---- navigation ----
  const validateStep = () => {
    const errors = [];
    switch (currentPage) {
      case "profile-info":
        if (!resumeData.profileInfo.fullName.trim()) errors.push("Full name is required");
        if (!resumeData.profileInfo.designation.trim()) errors.push("Designation is required");
        if (!resumeData.profileInfo.summary.trim()) errors.push("Summary is required");
        break;
      case "contact-info":
        if (!resumeData.contactInfo.email.trim()) errors.push("Email is required");
        break;
      case "work-experience":
        resumeData.workExperience.forEach((e, i) => {
          if (!e.company.trim()) errors.push(`Company required in experience ${i + 1}`);
        });
        break;
      default:
        break;
    }
    return errors;
  };

  const goNext = () => {
    const errors = validateStep();
    if (errors.length) { setErrorMsg(errors.join(", ")); return; }
    setErrorMsg("");
    const idx = STEPS.findIndex((s) => s.id === currentPage);
    if (idx < STEPS.length - 1) {
      setCurrentPage(STEPS[idx + 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setShowPreview(true);
    }
  };

  const goBack = () => {
    setErrorMsg("");
    const idx = STEPS.findIndex((s) => s.id === currentPage);
    if (idx > 0) setCurrentPage(STEPS[idx - 1].id);
    else navigate(resumeId ? "/dashboard" : "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---- download (format choice, then the auth gate) ----
  const handleDownload = () => {
    setShowPreview(false);
    setShowFormat(true);
  };

  const startDownload = async (format) => {
    setShowFormat(false);
    // If not logged in, gate behind auth — data is already safe in localStorage + state
    if (!isAuthenticated) {
      setPendingDownload(format);
      setShowAuth(true);
      return;
    }
    await doDownload(format);
  };

  const doDownload = async (format = "pdf") => {
    setDownloading(true);
    try {
      // persist to DB if logged in and this is a new (unsaved) resume
      let id = resumeId;
      if (isAuthenticated && !id) {
        const created = await base44.entities.Resume.create({ ...resumeData, completion });
        id = created.id;
        clearDraft();
        showToast("Resume saved to your account");
      } else if (isAuthenticated && id) {
        await base44.entities.Resume.update(id, { ...resumeData, completion });
      }
      if (format === "doc") {
        downloadResumeAsDoc(resumeData, resumeData.title || "resume");
        showToast("Word document downloaded!");
      } else {
        if (!pdfRef.current) return;
        await downloadElementAsPDF(pdfRef.current, resumeData.title || "resume");
        showToast("PDF downloaded!");
      }
    } catch (e) {
      console.error(e);
      showToast("Download failed — please try again");
    } finally {
      setDownloading(false);
      setPendingDownload(false);
    }
  };

  // After successful auth in the modal, continue the pending download
  const onAuthSuccess = async () => {
    setShowAuth(false);
    const pending = consumePendingDownload();
    if (pending) {
      await doDownload(pending === "doc" ? "doc" : "pdf");
    }
  };

  // ---- save & exit (logged in) ----
  const saveAndExit = async () => {
    if (!isAuthenticated) {
      // guest: draft already in localStorage; go home
      showToast("Saved locally — sign in on download to keep it in your account");
      navigate("/");
      return;
    }
    setSaving(true);
    try {
      if (resumeId) {
        await base44.entities.Resume.update(resumeId, { ...resumeData, completion });
      } else {
        const created = await base44.entities.Resume.create({ ...resumeData, completion });
        clearDraft();
        showToast("Saved!");
        navigate(`/edit/${created.id}`);
        return;
      }
      showToast("Saved!");
      navigate("/dashboard");
    } catch (e) {
      showToast("Save failed — please try again");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!resumeId || !isAuthenticated) { setDeleteTarget(false); return; }
    try {
      await base44.entities.Resume.delete(resumeId);
      navigate("/dashboard");
    } catch (e) {
      showToast("Delete failed");
    }
  };

  const renderForm = () => {
    switch (currentPage) {
      case "profile-info":
        return <ProfileInfoForm profileData={resumeData.profileInfo} updateSection={(k, v) => updateSection("profileInfo", k, v)} />;
      case "contact-info":
        return <ContactInfoForm contactInfo={resumeData.contactInfo} updateSection={(k, v) => updateSection("contactInfo", k, v)} />;
      case "work-experience":
        return <WorkExperienceForm workExperience={resumeData.workExperience} updateArrayItem={(i, k, v) => updateArrayItem("workExperience", i, k, v)} addArrayItem={(n) => addArrayItem("workExperience", n)} removeArrayItem={(i) => removeArrayItem("workExperience", i)} />;
      case "education-info":
        return <EducationDetailsForm educationInfo={resumeData.education} updateArrayItem={(i, k, v) => updateArrayItem("education", i, k, v)} addArrayItem={(n) => addArrayItem("education", n)} removeArrayItem={(i) => removeArrayItem("education", i)} />;
      case "skills":
        return <SkillsInfoForm skillsInfo={resumeData.skills} updateArrayItem={(i, k, v) => updateArrayItem("skills", i, k, v)} addArrayItem={(n) => addArrayItem("skills", n)} removeArrayItem={(i) => removeArrayItem("skills", i)} />;
      case "projects":
        return <ProjectDetailForm projectInfo={resumeData.projects} updateArrayItem={(i, k, v) => updateArrayItem("projects", i, k, v)} addArrayItem={(n) => addArrayItem("projects", n)} removeArrayItem={(i) => removeArrayItem("projects", i)} />;
      case "certifications":
        return <CertificationInfoForm certifications={resumeData.certifications} updateArrayItem={(i, k, v) => updateArrayItem("certifications", i, k, v)} addArrayItem={(n) => addArrayItem("certifications", n)} removeArrayItem={(i) => removeArrayItem("certifications", i)} />;
      case "additionalInfo":
        return <AdditionalInfoForm languages={resumeData.languages} interests={resumeData.interests} updateArrayItem={(s, i, k, v) => updateArrayItem(s, i, k, v)} addArrayItem={(s, n) => addArrayItem(s, n)} removeArrayItem={(s, i) => removeArrayItem(s, i)} />;
      default:
        return null;
    }
  };

  if (loading || isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-brand-rose" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* hidden full-size resume for PDF capture */}
      <div style={{ position: "fixed", left: "-99999px", top: 0 }} aria-hidden>
        <div ref={pdfRef}>
          <RenderResume templateId={resumeData.template} resumeData={resumeData} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 animate-fade-up">
          <div className="flex items-center gap-3 flex-1 min-w-[200px]">
            <input
              value={resumeData.title}
              onChange={(e) => setResumeData((p) => ({ ...p, title: e.target.value }))}
              className="font-heading font-bold text-2xl text-chocolate bg-transparent border-b-2 border-transparent focus:border-brand-rose focus:outline-none px-1 max-w-[300px]"
              placeholder="Untitled Resume"
            />
            <span className="chip bg-brand-yellow text-chocolate">{completion}%</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowTheme(true)} className="pill-btn bg-white border-2 border-border text-chocolate hover:border-brand-rose text-sm px-4 py-2">
              <Palette size={16} /> Theme
            </button>
            {resumeId && isAuthenticated && (
              <button onClick={() => setDeleteTarget(true)} className="pill-btn bg-white border-2 border-border text-destructive hover:bg-destructive/10 text-sm px-4 py-2">
                <Trash2 size={16} />
              </button>
            )}
            <button onClick={saveAndExit} disabled={saving} className="pill-btn bg-white border-2 border-border text-chocolate hover:border-brand-rose text-sm px-4 py-2">
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save
            </button>
            <button onClick={handleDownload} disabled={downloading} className="pill-btn bg-brand-rose text-white hover:bg-brand-brown text-sm px-5 py-2 shadow-soft">
              {downloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} Download
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* form column */}
          <div className="order-2 lg:order-1">
            <StepProgress currentPage={currentPage} onJump={(id) => { setCurrentPage(id); setErrorMsg(""); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
            {renderForm()}
            {errorMsg && (
              <div className="mt-4 flex items-start gap-2 rounded-2xl bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive font-medium animate-fade-in">
                <AlertCircle size={16} className="mt-0.5 shrink-0" /> {errorMsg}
              </div>
            )}
            <div className="flex items-center justify-between gap-3 mt-6">
              <button onClick={goBack} className="pill-btn bg-white border-2 border-border text-chocolate hover:border-brand-rose px-5 py-2.5">
                <ArrowLeft size={16} /> Back
              </button>
              <button onClick={goNext} className="pill-btn bg-brand-rose text-white hover:bg-brand-brown px-6 py-2.5 shadow-soft">
                {currentPage === "additionalInfo" ? <Download size={16} /> : <ArrowRight size={16} />}
                {currentPage === "additionalInfo" ? "Preview & Download" : "Next"}
              </button>
            </div>
          </div>

          {/* live preview column */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-20 self-start">
            <div className="brand-card p-4">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="chip bg-brand-rose/10 text-brand-rose">
                  <Eye size={12} /> Live Preview
                </span>
                <span className="text-xs font-heading font-bold text-chocolate/50">{completion}% complete</span>
              </div>
              <div className="max-h-[75vh] overflow-auto rounded-2xl bg-brand-peach/20 p-3">
                <ScaledPreview templateId={resumeData.template} resumeData={resumeData} maxWidth={420} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* theme modal */}
      {showTheme && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-chocolate/40 backdrop-blur-md" onClick={() => setShowTheme(false)} />
          <div className="relative glass rounded-3xl border-2 border-white/60 p-6 max-w-4xl w-full max-h-[90vh] overflow-auto animate-pop-in">
            <button onClick={() => setShowTheme(false)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/70 text-chocolate flex items-center justify-center font-bold z-10">✕</button>
            <ThemeSelector selectedTheme={resumeData.template} setSelectedTheme={(t) => setResumeData((p) => ({ ...p, template: t }))} resumeData={resumeData} onClose={() => setShowTheme(false)} />
          </div>
        </div>
      )}

      {/* preview modal */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-chocolate/50 backdrop-blur-md" onClick={() => setShowPreview(false)} />
          <div className="relative glass rounded-3xl border-2 border-white/60 p-6 max-w-3xl w-full max-h-[90vh] overflow-auto animate-pop-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-xl text-chocolate">{resumeData.title}</h3>
              <button onClick={() => setShowPreview(false)} className="w-9 h-9 rounded-full bg-white/70 text-chocolate flex items-center justify-center font-bold">✕</button>
            </div>
            <div className="max-h-[60vh] overflow-auto rounded-2xl bg-white">
              <ScaledPreview templateId={resumeData.template} resumeData={resumeData} maxWidth={680} />
            </div>
            <button onClick={handleDownload} disabled={downloading} className="pill-btn bg-brand-rose text-white hover:bg-brand-brown w-full mt-5 py-3 text-lg shadow-soft">
              {downloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
              {downloading ? "Generating…" : "Download resume"}
            </button>
            {!isAuthenticated && (
              <p className="text-center text-sm text-chocolate/60 mt-3 flex items-center justify-center gap-1.5">
                <Sparkles size={14} className="text-brand-rose" /> You'll sign in to secure your resume — your work is already saved.
              </p>
            )}
          </div>
        </div>
      )}

      {/* format chooser — opens from every Download button */}
      {showFormat && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-chocolate/50 backdrop-blur-md" onClick={() => setShowFormat(false)} />
          <div className="relative glass rounded-3xl border-2 border-white/60 p-7 max-w-lg w-full animate-pop-in">
            <button
              onClick={() => setShowFormat(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/70 hover:bg-white text-chocolate flex items-center justify-center font-bold transition-colors"
            >
              ✕
            </button>
            <h3 className="font-heading font-bold text-2xl text-chocolate mb-1">Download your resume</h3>
            <p className="text-chocolate/60 mb-6">Pick the format that suits you best.</p>

            <div className="grid sm:grid-cols-2 gap-4">
              <button onClick={() => startDownload("pdf")} className="brand-card brand-card-hover p-5 text-left group">
                <div className="w-12 h-12 rounded-2xl bg-brand-rose text-white flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <FileText size={22} />
                </div>
                <div className="font-heading font-bold text-lg text-chocolate">PDF</div>
                <p className="text-sm text-chocolate/60 mt-1">Print-ready and pixel-perfect — ideal for applying online.</p>
              </button>

              <button onClick={() => startDownload("doc")} className="brand-card brand-card-hover p-5 text-left group">
                <div className="w-12 h-12 rounded-2xl bg-brand-teal text-white flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <PenLine size={22} />
                </div>
                <div className="font-heading font-bold text-lg text-chocolate">Word (.doc)</div>
                <p className="text-sm text-chocolate/60 mt-1">Fully editable — tweak the wording and layout in Word.</p>
              </button>
            </div>

            {!isAuthenticated && (
              <p className="text-center text-sm text-chocolate/60 mt-5 flex items-center justify-center gap-1.5">
                <Sparkles size={14} className="text-brand-rose" /> You'll sign in to secure your resume — your work is already saved.
              </p>
            )}
          </div>
        </div>
      )}

      {/* auth modal — only opens from Download */}
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onSuccess={onAuthSuccess} />

      {/* delete confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-chocolate/40 backdrop-blur-md" onClick={() => setDeleteTarget(false)} />
          <div className="relative glass rounded-3xl border-2 border-white/60 p-8 max-w-sm w-full text-center animate-pop-in">
            <div className="w-16 h-16 rounded-2xl bg-destructive/15 text-destructive flex items-center justify-center mx-auto mb-4">
              <Trash2 size={28} />
            </div>
            <h3 className="font-heading font-bold text-xl text-chocolate mb-2">Delete this resume?</h3>
            <p className="text-chocolate/60 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(false)} className="pill-btn bg-white border-2 border-border text-chocolate hover:border-brand-rose flex-1">Cancel</button>
              <button onClick={handleDelete} className="pill-btn bg-destructive text-white hover:opacity-90 flex-1">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] animate-pop-in">
          <div className="glass rounded-full border-2 border-white/60 px-5 py-2.5 font-heading font-semibold text-chocolate shadow-soft flex items-center gap-2">
            <Check size={16} className="text-brand-green" /> {toast}
          </div>
        </div>
      )}
    </div>
  );
}
