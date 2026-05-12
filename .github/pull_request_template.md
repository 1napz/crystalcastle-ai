# 🧩 Frontend Restructure PR Template

## 📑 Summary
**EN:** Describe what files were moved into `frontend/` and why.  
**TH:** อธิบายไฟล์ที่ถูกย้ายไปที่ `frontend/` และเหตุผล  

---

## ✅ Checklist
# 📝 Pull Request Template (TH/EN)

## 📌 Summary / สรุป
- [ ] Short description in English
- [ ] คำอธิบายสั้น ๆ ภาษาไทย

---

## ✅ Checklist / รายการตรวจสอบ
### Pre-Merge Validation / การตรวจสอบก่อน Merge
- [ ] All CI/CD checks passed (ทุกการตรวจสอบ CI/CD ผ่านเรียบร้อย)
- [ ] No deployment errors (ไม่มี error ในการ deploy เช่น Vercel)
- [ ] YAML/Config validated (ตรวจสอบไฟล์ `.coderabbit.yaml` ด้วย validator)
- [ ] Security scan passed (การตรวจสอบ Security ผ่านเรียบร้อย)
- [ ] Reviewer approval required (ต้องมีการอนุมัติจาก Reviewer อย่างน้อย 1 คน)

### Governance & Audit Trail / การกำกับดูแลและบันทึกตรวจสอบ
- [ ] Commit messages follow bilingual template (ข้อความ commit ต้องใช้ template บิลิงกวล)
- [ ] PR linked to issue/ticket (PR ต้องเชื่อมโยงกับ issue หรือ ticket ที่เกี่ยวข้อง)
- [ ] Checklist attached in PR body (แนบ checklist นี้ใน PR body ทุกครั้ง)
- [ ] Cross-repo references updated (อัปเดต cross-repo references ให้ชัดเจน)
- [ ] Audit log entry created (สร้างบันทึก audit log สำหรับ PR นี้)

### File Organization
- [ ] List any moved/renamed files and rationale
- [ ] Update README if structure changed

For migration-specific guidance, see [MIGRATION_CHECKLIST.md](../MIGRATION_CHECKLIST.md)

### Governance
- [ ] Bilingual documentation headers (`### English` / `### ภาษาไทย`) present in updated files
- [ ] Pre-commit hook passes locally
- [ ] Verified reviewer followed instructions/ReviewerChecklist.md
- [ ] GitHub Action `bilingual-check.yml` passes in CI/CD

### Reviewer Notes
- [ ] Cache logs visible in workflow run
- [ ] CodeRabbit feedback addressed (security scan, docs, folder structure)
- [ ] PR title follows convention (`chore: move UI files to frontend/`)

---

## 📜 Additional Context
**EN:** Add any notes about dependencies, CI/CD path updates, or dashboard integration.  
**TH:** เพิ่มหมายเหตุเกี่ยวกับ dependencies, การอัปเดต path ใน CI/CD หรือการเชื่อมต่อ dashboard
## 🔎 Issue Reference / การอ้างอิง Issue
- Related Issue: #<issue-number>

---

## 🛡 Reviewer/Admin Sign-off / การอนุมัติ
- Reviewer: ______________________
- Admin: ______________________
