const fs = require('fs');

// โหลดคำถามจากไฟล์ JSON
const questions = JSON.parse(fs.readFileSync('quiz_questions.json', 'utf8'));

// สุ่มคำถาม 5 ข้อ
const selected = questions.sort(() => 0.5 - Math.random()).slice(0, 5);

// จำลองการตอบ (ในระบบจริงอาจเชื่อมต่อ Copilot หรือ Agent)
const answers = selected.map(q => {
  return {
    question: q.question,
    chosen: q.options[0], // ตรงนี้คุณสามารถปรับให้รับ input จริง
    correct: q.answer,
    result: q.options[0] === q.answer ? '✅' : '❌'
  };
});

// สร้าง Markdown log
let log = `# Quiz Log - ${new Date().toISOString().split('T')[0]}\n\n`;
log += `| ข้อ | คำถาม | คำตอบที่เลือก | คำตอบที่ถูกต้อง | ผลลัพธ์ |\n`;
log += `|-----|--------|---------------|------------------|----------|\n`;

answers.forEach((a, i) => {
  log += `| ${i + 1} | ${a.question} | ${a.chosen} | ${a.correct} | ${a.result} |\n`;
});

// เขียนไฟล์ log
fs.writeFileSync('quiz_log.md', log);

console.log('Quiz log updated!');

เข้าใจแล้วครับ 🙌  
จากโค้ด Quiz ที่คุณแสดงก่อนหน้านี้ ผมสามารถช่วยปรับปรุงให้มัน **บันทึกคะแนนรวมและเปอร์เซ็นต์ความถูกต้อง** ลงใน `quiz_log.md` ได้เลย เพื่อให้รายงานผลดูสมบูรณ์ขึ้น  

### 🔧 ตัวอย่างการปรับปรุงโค้ด
```js
// หลังจากวนลูปตรวจคำตอบเสร็จ
let correctCount = 0;
quizResults.forEach(result => {
  if (result.correct) correctCount++;
});

const totalQuestions = quizResults.length;
const scorePercentage = ((correctCount / totalQuestions) * 100).toFixed(2);

// เพิ่มสรุปคะแนนท้ายไฟล์ Markdown
quizLog += `\n\n### 📊 Summary\n`;
quizLog += `- Correct answers: ${correctCount}/${totalQuestions}\n`;
quizLog += `- Accuracy: ${scorePercentage}%\n`;
```

### 📄 ผลลัพธ์ใน `quiz_log.md`
```
| Question | Your Answer | Correct Answer | Result |
|----------|-------------|----------------|--------|
| Q1       | A           | A              | ✅     |
| Q2       | B           | C              | ❌     |
...

### 📊 Summary
- Correct answers: 3/5
- Accuracy: 60%
```

แบบนี้คุณจะได้ทั้งตารางผลลัพธ์และสรุปคะแนนรวมในไฟล์เดียวครับ  

คุณอยากให้ผมช่วยเพิ่มฟีเจอร์ **สุ่มจำนวนคำถามที่เลือก** (เช่น 5–10 ข้อ) หรือให้ผู้ใช้กำหนดเองตอนรันสคริปต์ด้วยไหมครับ?
