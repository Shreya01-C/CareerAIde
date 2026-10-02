import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { validateEmail } from "@/lib/resumeUtils";
import { Mail, Lock, User, Eye, EyeOff, Sparkles, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

// AuthModal — appears only when the user clicks Download.
// Auth happens in-place (no hard redirect), so the resume draft in the editor
// is never lost. After success, onSuccess() fires and the editor continues.
export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const { checkUserAuth } = useAuth();
  const [mode, setMode] = useState("login"); // login | signup
  const [step, setStep] = useState("form"); // form | otp
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");

  if (!isOpen) return null;

  const finishAuth = async () => {
    await checkUserAuth();
    setLoading(false);
    onSuccess?.();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateEmail(email)) return setError("Please enter a valid email address.");
    if (!password) return setError("Please enter your password.");
    setLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      await finishAuth();
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.message || err?.message || "Invalid credentials. Please try again.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateEmail(email)) return setError("Please enter a valid email address.");
    if (!password || password.length < 8) return setError("Password must be at least 8 characters.");
    setLoading(true);
    try {
      await base44.auth.register({ email, password });
      setLoading(false);
      setStep("otp");
      setInfo(`We sent a 6-digit code to ${email}. Enter it below to verify.`);
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.message || err?.message || "Could not sign up. Please try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (!otp) return setError("Please enter the 6-digit code.");
    setLoading(true);
    try {
      const data = await base44.auth.verifyOtp({ email, otpCode: otp });
      if (data?.access_token) base44.auth.setToken(data.access_token);
      await finishAuth();
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.message || err?.message || "Invalid or expired code.");
    }
  };

  const handleResend = async () => {
    setError("");
    setInfo("");
    try {
      await base44.auth.resendOtp(email);
      setInfo("A new code was sent to your email.");
    } catch (err) {
      setError("Could not resend the code. Please try again.");
    }
  };

  const handleGoogle = () => {
    // OAuth redirects away; the draft is safe in localStorage and will be restored on return.
    base44.auth.loginWithProvider("google", window.location.pathname + window.location.search);
  };

  const switchMode = (m) => {
    setMode(m);
    setStep("form");
    setError("");
    setInfo("");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* blurred backdrop — the workspace stays visible behind */}
      <div
        className="absolute inset-0 bg-chocolate/40 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md animate-pop-in">
        <div className="glass rounded-[2rem] border-2 border-white/60 shadow-[0_30px_80px_-20px_rgba(99,43,43,0.5)] overflow-hidden">
          {/* header band */}
          <div className="relative px-7 pt-8 pb-6 bg-gradient-to-br from-brand-rose to-brand-brown text-white overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-brand-yellow/30 animate-blob" />
            <div className="absolute -bottom-12 -left-6 w-28 h-28 rounded-full bg-brand-teal/30 animate-blob" style={{ animationDelay: "3s" }} />
            <div className="relative flex items-center gap-2 mb-2">
              <Sparkles size={20} className="text-brand-yellow" />
              <span className="font-heading font-semibold tracking-wide">CareerAIde</span>
            </div>
            <h2 className="relative font-heading text-2xl font-bold leading-tight">
              {step === "otp"
                ? "Verify your email"
                : mode === "login"
                ? "Welcome back!"
                : "Create your account"}
            </h2>
            <p className="relative text-white/80 text-sm mt-1">
              {step === "otp"
                ? "One last step to secure your resume."
                : "Save your progress & download your resume."}
            </p>
          </div>

          {/* body */}
          <div className="px-7 py-6">
            {error && (
              <div className="mb-4 flex items-start gap-2 rounded-xl bg-destructive/10 border border-destructive/30 px-3 py-2.5 text-sm text-destructive font-medium">
                <ShieldCheck size={16} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {info && (
              <div className="mb-4 rounded-xl bg-brand-teal/15 border border-brand-teal/30 px-3 py-2.5 text-sm text-chocolate/80 font-medium">
                {info}
              </div>
            )}

            {step === "otp" ? (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-chocolate mb-2 font-heading">Verification code</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="••••••"
                    className="w-full text-center text-2xl font-heading font-bold tracking-[0.5em] rounded-2xl border-2 border-border bg-white/70 px-4 py-3 text-chocolate focus:border-brand-rose focus:outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="pill-btn w-full bg-brand-rose text-white hover:bg-brand-brown disabled:opacity-60"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
                  {loading ? "Verifying…" : "Verify & continue"}
                </button>
                <div className="flex items-center justify-between text-sm">
                  <button type="button" onClick={() => setStep("form")} className="text-chocolate/60 hover:text-chocolate font-semibold">
                    Back
                  </button>
                  <button type="button" onClick={handleResend} className="text-brand-rose hover:underline font-semibold">
                    Resend code
                  </button>
                </div>
              </form>
            ) : (
              <>
                <form onSubmit={mode === "login" ? handleLogin : handleSignup} className="space-y-4">
                  {mode === "signup" && (
                    <Field icon={<User size={18} />} label="Full name">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jordan Lee"
                        className="w-full bg-transparent px-4 py-3 text-chocolate placeholder:text-chocolate/30 focus:outline-none"
                      />
                    </Field>
                  )}
                  <Field icon={<Mail size={18} />} label="Email">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-transparent px-4 py-3 text-chocolate placeholder:text-chocolate/30 focus:outline-none"
                    />
                  </Field>
                  <Field icon={<Lock size={18} />} label="Password">
                    <input
                      type={showPwd ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 8 characters"
                      className="w-full bg-transparent px-4 py-3 text-chocolate placeholder:text-chocolate/30 focus:outline-none"
                    />
                    <button type="button" onClick={() => setShowPwd((s) => !s)} className="px-3 text-chocolate/40 hover:text-chocolate">
                      {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </Field>

                  <button
                    type="submit"
                    disabled={loading}
                    className="pill-btn w-full bg-brand-rose text-white hover:bg-brand-brown disabled:opacity-60"
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                    {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
                  </button>
                </form>

                <div className="flex items-center gap-3 my-2">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs font-bold text-chocolate/40 font-heading">OR</span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <button
                  onClick={handleGoogle}
                  className="pill-btn w-full bg-white border-2 border-border text-chocolate hover:border-brand-rose/40 hover:bg-white"
                >
                  <GoogleIcon /> Continue with Google
                </button>

                <p className="text-center text-sm text-chocolate/70 pt-1">
                  {mode === "login" ? "New to CareerAIde? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => switchMode(mode === "login" ? "signup" : "login")}
                    className="font-heading font-bold text-brand-rose hover:underline"
                  >
                    {mode === "login" ? "Sign up free" : "Sign in"}
                  </button>
                </p>
              </>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/70 hover:bg-white text-chocolate flex items-center justify-center font-heading font-bold shadow-md transition-colors"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function Field({ icon, label, children }) {
  return (
    <div>
      <label className="block text-sm font-bold text-chocolate mb-1.5 font-heading">{label}</label>
      <div className="flex items-center rounded-2xl border-2 border-border bg-white/70 focus-within:border-brand-rose transition-colors overflow-hidden">
        <span className="pl-3.5 text-chocolate/40">{icon}</span>
        {children}
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );
}
