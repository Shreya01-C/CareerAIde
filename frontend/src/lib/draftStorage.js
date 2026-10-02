// localStorage draft persistence — keeps guest edits alive across login/signup (the "Auth-Bridge").
const DRAFT_KEY = "careeraide_draft";
const PENDING_KEY = "careeraide_pending_download";

export const saveDraft = (resumeData) => {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(resumeData));
  } catch (e) {
    /* ignore quota errors */
  }
};

export const loadDraft = () => {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export const clearDraft = () => {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch (e) {
    /* noop */
  }
};

export const hasDraft = () => {
  try {
    return !!localStorage.getItem(DRAFT_KEY);
  } catch (e) {
    return false;
  }
};

// Pending download remembers the chosen format ("pdf" | "doc") so the export
// still runs after the user signs in.
export const setPendingDownload = (format) => {
  try {
    if (format) localStorage.setItem(PENDING_KEY, format === true ? "pdf" : format);
    else localStorage.removeItem(PENDING_KEY);
  } catch (e) {
    /* noop */
  }
};

export const consumePendingDownload = () => {
  try {
    const v = localStorage.getItem(PENDING_KEY);
    localStorage.removeItem(PENDING_KEY);
    return v;
  } catch (e) {
    return null;
  }
};

export const peekPendingDownload = () => {
  try {
    return localStorage.getItem(PENDING_KEY);
  } catch (e) {
    return null;
  }
};
