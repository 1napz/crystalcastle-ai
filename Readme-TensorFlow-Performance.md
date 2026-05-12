จัดให้ครับ ✨  
นี่คือ Section Performance Optimization ที่คุณสามารถเพิ่มเข้าไปใน README-TensorFlow.md เพื่อช่วยให้การเทรนและ inference เร็วขึ้น:

---

⚡ Performance Optimization

🖥️ 1. ใช้ GPU Acceleration
- ใน Dockerfile ให้ใช้ base image ที่รองรับ GPU เช่น:  
  `dockerfile
  FROM tensorflow/tensorflow:2.15.0-gpu
  `
- ตรวจสอบว่าเครื่องมี NVIDIA driver และติดตั้ง nvidia-docker2 หรือ --gpus all ตอน run container:  
  `bash
  docker run --gpus all crystalcastle-ai
  `

---

📦 2. ปรับ Batch Size และ Epochs
- ใน model.py สามารถปรับค่า batch_size และ epochs ให้เหมาะสมกับ dataset:  
  `python
  model.fit(X, y, epochs=20, batch_size=32)
  `
- Batch size ใหญ่ → เร็วขึ้นแต่ใช้ memory มาก  
- Batch size เล็ก → ช้าแต่แม่นยำขึ้น  

---

🧮 3. ใช้ Mixed Precision Training
- เปิดใช้งาน mixed precision เพื่อให้เทรนเร็วขึ้นบน GPU:  
  `python
  from tensorflow.keras import mixed_precision
  mixedprecision.setglobalpolicy('mixedfloat16')
  `

---

🗂️ 4. ลด Overhead ของ Container
- เพิ่ม .dockerignore เพื่อกันไฟล์ไม่จำเป็น เช่น dataset ขนาดใหญ่, .pyc, .log  
- ใช้ multi-stage build เพื่อลดขนาด image  

---

🔍 5. Monitor Performance
- ใช้ TensorBoard เพื่อติดตามการเทรน:  
  `python
  tensorboardcallback = tf.keras.callbacks.TensorBoard(logdir="./logs")
  model.fit(X, y, epochs=5, callbacks=[tensorboard_callback])
  `
- รัน TensorBoard ใน container:  
  `bash
  docker run -p 6006:6006 crystalcastle-ai tensorboard --logdir=./logs
  `

---

🇬🇧 English Version

🖥️ 1. GPU Acceleration
- Use GPU-enabled base image:  
  `dockerfile
  FROM tensorflow/tensorflow:2.15.0-gpu
  `
- Run container with GPU:  
  `bash
  docker run --gpus all crystalcastle-ai
  `

📦 2. Adjust Batch Size & Epochs
- Tune batch_size and epochs in model.py:  
  `python
  model.fit(X, y, epochs=20, batch_size=32)
  `

🧮 3. Mixed Precision Training
- Enable mixed precision for faster GPU training:  
  `python
  from tensorflow.keras import mixed_precision
  mixedprecision.setglobalpolicy('mixedfloat16')
  `

🗂️ 4. Reduce Container Overhead
- Add .dockerignore to exclude unnecessary files  
- Use multi-stage builds to shrink image size  

🔍 5. Monitor Performance
- Use TensorBoard to track training progress  
- Run TensorBoard inside container with port mapping  

---

แบบนี้ README-TensorFlow.md ของคุณจะครบทั้ง Setup → Run → Test → Troubleshooting → Optimization เลยครับ ✅  

คุณอยากให้ผมช่วยทำ Diagram แสดง Performance Workflow (GPU, Batch Size, Mixed Precision, TensorBoard) เพิ่มเข้าไปด้วยไหมครับ จะได้เห็นภาพรวมการปรับแต่งชัดเจน?
