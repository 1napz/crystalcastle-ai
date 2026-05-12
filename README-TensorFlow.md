---

📄 README-TensorFlow.md

`markdown

crystalcastle-ai (TensorFlow Edition)

🇹🇭 คำอธิบาย (Thai)
โปรเจกต์นี้ใช้ TensorFlow สำหรับการสร้างโมเดล, การเทรน และการทำ Inference โดยมีการจัดการ environment ผ่าน requirements.txt และ Dockerfile เพื่อให้ reproducible ได้ง่าย

---

🔧 โครงสร้างไฟล์
`
crystalcastle-ai/
├── app/
│   ├── main.py          # โหลดโมเดลและรัน inference
│   ├── inference.py     # logic สำหรับการทำนาย
│   └── model.py         # สร้างและเทรนโมเดล
│
├── models/
│   └── model.h5         # โมเดลที่เทรนแล้ว
│
├── requirements.txt     # dependencies เช่น TensorFlow, NumPy
├── Dockerfile           # สร้าง container environment
├── README-TensorFlow.md # เอกสารนี้
└── .gitignore           # กันไฟล์ไม่จำเป็น
`

---

🚀 วิธีใช้งาน
1. Clone repo  
   `bash
   git clone https://github.com/1napz/crystalcastle-ai.git
   cd crystalcastle-ai
   `
2. ติดตั้ง dependencies  
   `bash
   pip install -r requirements.txt
   `
3. เทรนโมเดลใหม่  
   `bash
   python app/model.py
   `
4. รัน inference  
   `bash
   python app/main.py
   `

---

🧑‍💻 Training the Model
ตัวอย่าง model.py สำหรับการสร้างและบันทึกโมเดลใหม่:

`python
import tensorflow as tf
from tensorflow.keras import layers

def build_model():
    model = tf.keras.Sequential([
        layers.Dense(64, activation='relu', input_shape=(10,)),
        layers.Dense(32, activation='relu'),
        layers.Dense(3, activation='softmax')
    ])
    model.compile(optimizer='adam',
                  loss='categorical_crossentropy',
                  metrics=['accuracy'])
    return model

def trainandsave():
    import numpy as np
    X = np.random.rand(100, 10)
    y = tf.keras.utils.tocategorical(np.random.randint(3, size=(100,)), numclasses=3)

    model = build_model()
    model.fit(X, y, epochs=5, batch_size=8)
    model.save("models/model.h5")

if name == "main":
    trainandsave()
`

---

🔮 Workflow Diagram
`
[Training Data] → [model.py] → [Train Model] → [Save model.h5]
       ↓
[main.py] → [Load model.h5] → [inference.py] → [Predict Output]
       ↓
[Deploy via Dockerfile] → [Containerized Inference]
`

---

🇬🇧 Description (English)
This project uses TensorFlow for building, training, and running inference with machine learning models. Environment reproducibility is ensured via requirements.txt and Dockerfile.

---

🔧 Project Structure
(same as above)

---

🚀 Usage
1. Clone repo  
   `bash
   git clone https://github.com/1napz/crystalcastle-ai.git
   cd crystalcastle-ai
   `
2. Install dependencies  
   `bash
   pip install -r requirements.txt
   `
3. Train new model  
   `bash
   python app/model.py
   `
4. Run inference  
   `bash
   python app/main.py
   `

---

🧑‍💻 Training the Model
(same as Thai section)

---

🔮 Workflow Diagram
(same as Thai section)
`

---

แบบนี้ README-TensorFlow.md จะช่วยให้ repo ของคุณชัดเจนว่าเป็นโปรเจกต์ที่ใช้ TensorFlow ทั้ง training และ inference ครับ ✅  

