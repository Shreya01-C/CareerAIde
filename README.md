# 🚀 CareerAIde
CareerAIde is an **AI-powered resume builder and analyzer** that helps users create, optimize, and evaluate resumes for ATS (Applicant Tracking Systems) and recruiter screening.

---
## Live Demo

[Launch CareerAIde](https://career-a-ide.vercel.app/)

---

## Features

* **AI Resume Builder**
  Create professional resumes using customizable templates with real-time preview.

* **AI Resume Analysis (ATS Optimizer)**
  Get ATS score, keyword suggestions, and actionable feedback.

* **Job Description Matcher**
  Compare resume with job description and get a **match score** with missing keywords.

* **Bullet Point Rewriter**
  Improve weak resume bullet points using AI with strong action verbs and measurable impact.

* **Resume Quality Dashboard**
  Visual analysis including:
  * ATS Score
  * Keyword Coverage
  * Skills Coverage
  * Bullet Strength
  * Formatting Score

* **PDF Export**
  Download optimized resumes instantly.

---

## Tech Stack

**Frontend:** React.js, Tailwind CSS
**Backend:** Node.js, Express.js
**Database:** MongoDB
**AI Integration:** Google Gemini API

---

## AI Capabilities

* ATS Score Calculation
* Resume–Job Match Analysis
* Keyword Gap Detection
* Resume Improvement Suggestions
* Bullet Point Optimization
* Structured JSON-based AI responses

---

## Screenshots

### Landing Page
<p align="center">
  <img src="https://github.com/user-attachments/assets/d0a030ee-8d68-4552-98f1-ff327ff3a321" width="700"/>
</p>

---

### Resume Builder
<p align="center">
  <img src="https://github.com/user-attachments/assets/2a90b1a0-cdb7-4220-b5be-97f6f7f9a707" width="700"/>
</p>

---

### AI Resume Analysis
<p align="center">
  <img src="https://github.com/user-attachments/assets/7a315c0c-e7a8-4c9b-b406-5ed939067cea" width="700"/>
</p>

---

### ATS Score & Dashboard
<p align="center">
  <img src="https://github.com/user-attachments/assets/0380a531-9aaf-4fdd-8702-7cc43018dff0" width="300"/>
  <img src="https://github.com/user-attachments/assets/a63f250d-283e-4859-ae3f-61475b0e8a7b" width="300"/>
  <img src="https://github.com/user-attachments/assets/0a1b628b-48c4-434c-8b5a-e70976430c32" width="300"/>
</p>

---

### Bullet Point Rewriter
<p align="center">
  <img src="https://github.com/user-attachments/assets/5119845a-ee93-42e4-ad39-987c7709c57f" width="350"/>
  &nbsp;&nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/834f83a5-f2df-4f46-9e3b-6898d7105e39" width="350"/>
</p>

---
## Setup Instructions

### Clone the repository

```bash
git clone https://github.com/Shreya01-C/CareerAIde.git
cd CareerAIde
```

### Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:

```env
GEMINI_API_KEY=your_api_key_here
```

Run backend:

```bash
npm start
```

---

### Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

### Open the App

```
http://localhost:5173
```

---

## Project Structure

```
CareerAIde/
│
├── backend/
│   ├── services/
│   │   └── aiService.js
│   ├── routes/
│   └── controllers/
│
├── frontend/
│   ├── pages/
│   ├── components/
│   └── assets/
│
└── README.md
```

---

## Security

* API keys are stored in `.env`
* `.env` is ignored via `.gitignore`
* No sensitive data is exposed publicly

---

## Future Improvements

* Resume version comparison
* AI resume chatbot
* Multi-language resume support
* Cloud deployment (AWS/GCP)

---

## Thanks for reading!
