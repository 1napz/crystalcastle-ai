#!/bin/bash
# cleanup.sh
mkdir -p docs
# ย้ายไฟล์ md ทั้งหมดที่ root เข้า docs ยกเว้น README.md
find . -maxdepth 1 -name "*.md" -type f -not -name "README.md" -exec mv {} docs/ \;
# ย้ายไฟล์ config ที่กระจัดกระจายไปไว้ที่ configs
mkdir -p configs
# ตัวอย่าง: ถ้ามีไฟล์ .config นามสกุลต่างๆ ย้ายไปไว้ที่นี่
# mv *.config configs/ 2>/dev/null
