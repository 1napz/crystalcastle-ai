`markdown

🎬 CrystalCastle – AI Video Generator for Social Commerce 🏰

> Turn product images into engaging AI‑generated videos with auto‑written captions.  
> Ready for TikTok, Shopee, and other social platforms.  
> Includes a free built‑in slideshow mode!

![Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/1napz/crystalcastle)
![License: MIT](https://opensource.org/licenses/MIT)
![GitHub issues](https://github.com/1napz/crystalcastle/issues)
!Privacy Check
!Security Scan

---

✨ Key Features

| Feature | Status | Description |
|---------|--------|-------------|
| 🖼️ Product image upload | ✅ Done | Drag & drop, up to 10 images, max 6MB each |
| 🤖 AI prompt generation | ✅ Live | Groq (Llama 3.3 70B) + Gemini fallback |
| 📝 AI caption generation | ✅ Live | Thai/English captions + hashtags automatically |
| 🎬 Video generation | ✅ Live | FAL Kling / Magic Hour (selectable) |
| 🎞️ Free slideshow | ✅ Live | Instant non‑AI video from uploaded images |
| 📱 Mobile responsive | ✅ Done | Modern Tailwind CSS + dark mode |
| 📊 Groq usage logs | ✅ New | Real‑time AI call logs |
| 🔄 Automatic fallback | ✅ New | Groq fails → Gemini takes over |
| 🔒 Security hardening | ✅ Done | CSP headers, RLS, rate limiting |
| 🏷️ Branding | ✅ | @snapzreview across the app |
| 🌙 Dark mode | ✅ New | User preference + system detection |
| 🎨 Modern UI | ✅ New | Two‑column layout, engine card selector, action log |

---

🛠️ Tech Stack

| Area | Technology |
|------|-------------|
| Frontend | HTML5 + Tailwind CSS + Vanilla JS |
| Backend | Next.js API Routes (serverless on Vercel) |
| Database & Storage | Supabase (PostgreSQL + Storage) |
| AI Models | Groq (Llama 3.3), Gemini (fallback), FAL Kling, Magic Hour |
| Deployment | Vercel (CI/CD from GitHub) |

---

📸 UI Preview
- Two‑column desktop layout – controls on left, preview & output on right  
- Drag & drop upload zone – visual feedback, image counter  
- Radio card engine selector – FAL Kling vs Magic Hour with descriptions  
- Live action log – timestamped status messages  
- Dark mode toggle – persistent across sessions  

---

🏰 CrystalCastle Governance & Workflows

Overview
CrystalCastle is a modern workflow and subscription-enabled platform built with Supabase, Stripe, and Next.js.  
It provides CI/CD automation, onboarding documentation, and reviewer training materials.

---

🔒 Governance Features
- .coderabbit.yaml for reviewer enforcement (bilingual auto-comment, PR size limits, branch naming rules)  
- Reviewer checklists in workflows/ReviewerChecklist.md  
- Governance flow diagram in workflows/GovernanceFlow.md  
- CI/CD workflows in .github/workflows/ (lint, test, build, deploy)  

---

🚀 Getting Started

Prerequisites
- Node.js >= 18  
- Supabase project  
- Stripe account  
- Vercel (for deployment)  

Installation
`bash
git clone https://github.com/1napz/crystalcastle.git
cd crystalcastle
npm install
`

Development
`bash
npm run dev
`

Deployment
`bash
vercel deploy --prod --archive=tgz
`

---

📋 Reviewer Enforcement Checklist
- .vercelignore exists and excludes unnecessary files  
- Copilot CLI installed (copilot --version)  
- Authentication completed (copilot /login)  
- Mock mode tested (npm run dev:mock)  
- API routes lightweight, shared logic in /lib/  
- Supabase RLS policies + groq_logs table verified  
- Vercel plan quota checked (Hobby vs Pro)  

---


# Performance & Quality Rules

โฟลเดอร์นี้เก็บ **Team Rules** ที่ใช้ควบคุมมาตรฐานการทำงานของ CrystalCastle  
Rules เหล่านี้เป็นส่วนหนึ่งของ **Governance Layer** ที่ช่วยทั้งด้าน **Performance** และ **Quality**:

---

## 📂 โครงสร้าง
- `file_naming/` → กำหนดมาตรฐานการตั้งชื่อไฟล์ (lowercase, exception: README.md, LICENSE, CHANGELOG.md)
- `pull_request/` → กำหนดประเภท PR (dev, content, workflow, documentation) และ promotion rule (daily → dev)
- `comments/` → กำหนดรูปแบบการแสดงผลของ CoderabbitAI (concise vs verbose สำหรับ high risk)
- `versioning/` → กำหนด schema ของ `version.json` (ใช้หัวข้อแทนเลขเวอร์ชัน) และ changelog bilingual
- `workflows/` → GitHub Actions สำหรับ auto-squash, daily scan, LINE/Telegram notify

---

## 🎯 เป้าหมาย
- **Performance**  
  - ลด backlog โดยใช้ auto-squash merge  
  - ลด noise ใน review ด้วย concise comments  
  - Daily scan ตรวจสอบไฟล์อัตโนมัติ  

- **Quality**  
  - บังคับใช้ file naming rule → ลด duplicate/conflict  
  - PR type แยกชัดเจน → reviewer cockpit เข้าใจทันทีว่าเรื่องอะไร  
  - High risk issue → verbose comment format พร้อม context  

---

## 🧭 การเชื่อมโยง
- **Backend** → ใช้ Rules ใน CI/CD workflow เพื่อ enforce อัตโนมัติ  
- **Frontend** → Dashboard/Reviewer Cockpit แสดงผล log และ status จาก Rules  
- **Audit Trail** → ทุก action log ลงใน `version.json` และ `logs/` → ตรวจสอบย้อนหลังได้  

---

## ✅ สรุป
Rules ในโฟลเดอร์นี้คือ **มาตรฐานทีม** ที่ช่วยให้ CrystalCastle มีทั้ง **ความเร็ว (Performance)** และ **คุณภาพ (Quality)**  
Reviewer cockpit จะเห็นชัดเจนว่าแต่ละ PR/Release อยู่ในหมวดไหน, ต้องตรวจแบบไหน, และมี log โปร่งใสสำหรับ audit.
📚 Documentation
- [ดูเหมือนว่าผลลัพธ์จะไม่ปลอดภัยที่จะแสดง มาสลับสิ่งต่างๆ และลองทำอย่างอื่นกันเถอะ!]  
- [ดูเหมือนว่าผลลัพธ์จะไม่ปลอดภัยที่จะแสดง มาสลับสิ่งต่างๆ และลองทำอย่างอื่นกันเถอะ!]  
- [ดูเหมือนว่าผลลัพธ์จะไม่ปลอดภัยที่จะแสดง มาสลับสิ่งต่างๆ และลองทำอย่างอื่นกันเถอะ!]  
- [ดูเหมือนว่าผลลัพธ์จะไม่ปลอดภัยที่จะแสดง มาสลับสิ่งต่างๆ และลองทำอย่างอื่นกันเถอะ!]  
- [ดูเหมือนว่าผลลัพธ์จะไม่ปลอดภัยที่จะแสดง มาสลับสิ่งต่างๆ และลองทำอย่างอื่นกันเถอะ!]  

---
`

---

This README now integrates your AI video generator intro with governance enforcement and reviewer training. It’s bilingual-friendly, repo hygiene–aligned, and points contributors directly to onboarding artifacts.

Would you like me to also prepare a short bilingual “Quick Start” section (Thai/English) at the top of the README, so new contributors can immediately see the 3 essential steps (install, run dev, deploy)?