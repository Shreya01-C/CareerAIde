import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ScaledPreview from "@/components/resume/ScaledPreview";
import { DUMMY_RESUME_DATA, TEMPLATE_LIST } from "@/lib/sampleData";
import AnimatedEmblem from "@/components/AnimatedEmblem";
import TemplatePreviewModal from "@/components/TemplatePreviewModal";
import { ArrowRight, Sparkles, Download, Zap, ShieldCheck, Palette, MousePointerClick, FileCheck2, Star, Quote, Eye } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  const [activeTemplate, setActiveTemplate] = useState("01");
  const [previewTemplate, setPreviewTemplate] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const features = [
    { icon: <Zap size={22} />, title: "Lightning Fast", desc: "Build a polished resume in under 5 minutes with our guided, step-by-step editor.", color: "bg-brand-yellow", text: "text-chocolate" },
    { icon: <Palette size={22} />, title: "Beautiful Templates", desc: "Three recruiter-approved designs, each tuned for ATS readability and visual appeal.", color: "bg-brand-teal", text: "text-white" },
    { icon: <ShieldCheck size={22} />, title: "ATS-Friendly", desc: "Every template is structured so parsing software reads your details correctly.", color: "bg-brand-green", text: "text-white" },
    { icon: <Download size={22} />, title: "Instant PDF Export", desc: "Download a crisp, print-ready PDF with a single click — no watermarks, ever.", color: "bg-brand-rose", text: "text-white" },
    { icon: <MousePointerClick size={22} />, title: "Live Preview", desc: "Watch your resume take shape in real time as you type — no surprises.", color: "bg-brand-brown", text: "text-white" },
    { icon: <FileCheck2 size={22} />, title: "Auto-Saved", desc: "Your work is saved automatically. Sign in only when you're ready to download.", color: "bg-chocolate", text: "text-white" },
  ];

  const steps = [
    { n: "01", title: "Fill in your details", desc: "Our friendly form walks you through every section, one card at a time." },
    { n: "02", title: "Pick a template", desc: "Switch between three elegant designs and see changes instantly." },
    { n: "03", title: "Download your PDF", desc: "Sign in to secure your resume, then export a crisp PDF in one click." },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-brand-rose/20 blur-3xl animate-floaty-slow" />
        <div className="absolute top-40 right-0 w-80 h-80 rounded-full bg-brand-teal/20 blur-3xl animate-floaty" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-brand-yellow/30 blur-3xl animate-floaty-slow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="stagger">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-border px-4 py-1.5 mb-6">
                <Sparkles size={16} className="text-brand-rose" />
                <span className="font-heading font-semibold text-sm text-chocolate">Professional Resume Studio</span>
              </div>
              <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-chocolate">
                Craft resumes that
                <span className="block shimmer-text">get you hired.</span>
              </h1>
              <p className="mt-6 text-lg text-chocolate/70 max-w-lg leading-relaxed">
                Build a job-winning resume with elegant, ATS-friendly templates. Live preview, one-click PDF export,
                and your work is saved automatically — sign in only when you're ready to download.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button onClick={() => navigate("/edit")} className="pill-btn bg-brand-rose text-white hover:bg-brand-brown text-lg px-8 py-4 shadow-soft hover:shadow-glow">
                  <Sparkles size={20} /> Start Building — Free <ArrowRight size={20} />
                </button>
                <Link to="/dashboard" className="pill-btn bg-white/70 border-2 border-border text-chocolate hover:border-brand-rose text-lg px-8 py-4">
                  View My Resumes
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                {[{ v: "50K+", l: "Resumes created" }, { v: "4.9★", l: "User rating" }, { v: "5 min", l: "Average build time" }].map((s) => (
                  <div key={s.l}>
                    <div className="font-heading font-bold text-2xl text-brand-rose">{s.v}</div>
                    <div className="text-sm text-chocolate/60">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="absolute -top-10 -left-10 z-20 hidden sm:block">
                <AnimatedEmblem size={124} />
              </div>
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-3xl bg-brand-yellow flex items-center justify-center shadow-soft animate-floaty rotate-6 z-10">
                <Download size={32} className="text-chocolate" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-2xl bg-brand-teal flex items-center justify-center shadow-soft animate-floaty-slow -rotate-6 z-10">
                <Star size={28} className="text-white" />
              </div>
              <div className="brand-card p-3 rotate-2 hover:rotate-0 transition-transform duration-500">
                <ScaledPreview templateId={activeTemplate} resumeData={DUMMY_RESUME_DATA} maxWidth={460} />
              </div>
              <div className="flex justify-center gap-2 mt-5">
                {TEMPLATE_LIST.map((t) => (
                  <button key={t.id} onClick={() => setActiveTemplate(t.id)} className={`px-4 py-1.5 rounded-full text-xs font-heading font-bold transition-all ${activeTemplate === t.id ? "bg-brand-rose text-white scale-110" : "bg-white/70 text-chocolate/60 hover:bg-white"}`}>
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="chip bg-brand-yellow text-chocolate mb-4">Why Choose Us</span>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-chocolate">Everything you need to shine</h2>
            <p className="mt-4 text-chocolate/60 max-w-xl mx-auto">Thoughtfully designed tools that make resume building feel effortless.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {features.map((f, i) => (
              <div key={f.title} className="brand-card brand-card-hover sheen p-7 tilt-card group">
                <div className={`w-14 h-14 rounded-2xl ${f.color} ${f.text} flex items-center justify-center mb-5 shadow-soft transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`}>
                  <span className="animate-icon-bob inline-flex" style={{ animationDelay: `${i * 0.3}s` }}>{f.icon}</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-chocolate mb-2 transition-colors duration-300 group-hover:text-brand-rose">{f.title}</h3>
                <p className="text-chocolate/60 leading-relaxed">{f.desc}</p>
                <div className={`mt-5 h-1 w-0 rounded-full ${f.color} transition-all duration-500 ease-out group-hover:w-full`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates showcase */}
      <section id="templates" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-brand-peach/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="chip bg-brand-teal/20 text-chocolate mb-4">Templates</span>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-chocolate">Pick your perfect look</h2>
            <p className="mt-4 text-chocolate/60 max-w-xl mx-auto">Three distinct designs, each crafted to make your experience pop.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 stagger">
            {TEMPLATE_LIST.map((t) => (
              <div
                key={t.id}
                role="button"
                tabIndex={0}
                onClick={() => setPreviewTemplate(t)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPreviewTemplate(t);
                  }
                }}
                className="brand-card brand-card-hover overflow-hidden group cursor-pointer relative focus:outline-none focus:ring-2 focus:ring-brand-rose/40"
              >
                <div
                  className="absolute -top-16 -right-16 w-44 h-44 rounded-full opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: t.accent }}
                />
                <div className="relative bg-gradient-to-br from-brand-peach/40 to-white p-4 overflow-hidden">
                  <div className="transition-transform duration-700 ease-out group-hover:scale-[1.07] group-hover:-rotate-1">
                    <ScaledPreview templateId={t.id} resumeData={DUMMY_RESUME_DATA} maxWidth={300} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-chocolate/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="pill-btn bg-white text-chocolate text-sm px-5 py-2.5 shadow-soft translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye size={16} /> Preview
                    </span>
                  </div>
                </div>
                <div className="relative p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-chocolate">{t.name}</h3>
                    <span className="text-xs text-chocolate/50">{t.tag}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit?template=${t.id}`);
                    }}
                    className="pill-btn bg-brand-rose/10 text-brand-rose hover:bg-brand-rose hover:text-white text-sm px-4 py-2"
                  >
                    Use this <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="chip bg-brand-green/20 text-chocolate mb-4">How it works</span>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-chocolate">Three steps ➟ Done!</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 stagger">
            {steps.map((s) => (
              <div key={s.n} className="brand-card p-7 relative">
                <div className="font-heading font-bold text-6xl text-brand-rose/15 absolute top-4 right-5">{s.n}</div>
                <h3 className="font-heading font-bold text-xl text-chocolate mb-2 relative">{s.title}</h3>
                <p className="text-chocolate/60 relative">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="brand-card p-10 text-center relative overflow-hidden">
            <Quote size={64} className="absolute top-4 left-4 text-brand-rose/10" />
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} size={22} className="fill-brand-yellow text-brand-yellow" />)}
            </div>
            <p className="font-heading text-2xl text-chocolate leading-relaxed relative">
              "I built and downloaded my resume in under 10 minutes. The templates look stunning and the live preview is addictive!"
            </p>
            <p className="mt-5 font-bold text-chocolate">Priya Sharma</p>
            <p className="text-sm text-chocolate/50">Frontend Engineer</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-[2.5rem] bg-gradient-to-br from-brand-rose to-brand-brown p-12 text-center overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-brand-yellow/30 animate-blob" />
            <div className="absolute -bottom-12 -left-8 w-44 h-44 rounded-full bg-brand-teal/30 animate-blob" style={{ animationDelay: "4s" }} />
            <div className="relative">
              <h2 className="font-heading font-bold text-4xl sm:text-5xl text-white">Ready to land your dream job?</h2>
              <p className="mt-4 text-white/85 text-lg max-w-xl mx-auto">Start building your resume now — no sign-up needed until you download.</p>
              <button onClick={() => navigate("/edit")} className="pill-btn bg-white text-brand-rose hover:bg-brand-yellow hover:text-chocolate text-lg px-8 py-4 mt-8 shadow-soft">
                <Sparkles size={20} /> Build My Resume <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <TemplatePreviewModal template={previewTemplate} onClose={() => setPreviewTemplate(null)} />

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-chocolate text-cream/80 pt-14 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-brand-rose flex items-center justify-center">
                <Sparkles size={18} className="text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-cream">CareerAIde</span>
            </div>
            <p className="text-sm text-cream/60 max-w-xs">Crafting beautiful, recruiter-ready resumes for professionals worldwide.</p>
          </div>
          <div>
            <h4 className="font-heading font-bold text-cream mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/edit" className="hover:text-brand-yellow transition-colors">Resume Builder</Link></li>
              <li><Link to="/dashboard" className="hover:text-brand-yellow transition-colors">My Resumes</Link></li>
              <li><a href="#templates" className="hover:text-brand-yellow transition-colors">Templates</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold text-cream mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-brand-yellow transition-colors">About</a></li>
              <li><a href="#" className="hover:text-brand-yellow transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-brand-yellow transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/10 pt-6 text-center text-sm text-cream/50">
          © {new Date().getFullYear()} CareerAIde. Built with care.
        </div>
      </div>
    </footer>
  );
}
