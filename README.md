# crystalcastle-ai

Runner AI powered by CrystalCastle · TensorFlow Edition

> โปรเจกต์ต้นแบบสำหรับสร้าง, เทรน, และรัน inference โมเดล TensorFlow แบบ reproducible ด้วย Docker

---

## 🇹🇭 ภาพรวม

crystalcastle-ai เป็นโครงสร้างเริ่มต้นสำหรับงาน ML ขนาดเล็กถึงกลาง
- สร้างโมเดลด้วย Keras
- แยกชัดระหว่าง `model.py` (train), `inference.py` (predict), `main.py` (entrypoint)
- รันได้ทั้งบนเครื่อง local และใน Docker container

**ใช้ทำอะไร:** ตัวอย่างใน repo นี้เป็น classifier 3 คลาส รับ input vector ขนาด 10 — ปรับ `input_shape` และจำนวนคลาสได้ตามงานของคุณ (เช่น Runner AI สำหรับวิเคราะห์ท่าทาง, sensor data)

---

## 📁 โครงสร้าง

```
crystalcastle-ai/
├── app/
│   ├── main.py        # โหลดโมเดลและรัน inference
│   ├── inference.py   # logic การทำนาย
│   └── model.py       # สร้างและเทรนโมเดล
├── models/
│   └── model.keras    # โมเดลที่เทรนแล้ว (จะถูกสร้างหลัง train)
├── requirements.txt
├── Dockerfile
└── README.md
```

---

## 🚀 Quick Start

1. Clone
```bash
git clone https://github.com/Zyntro-Media-AI/crystalcastle-ai.git
cd crystalcastle-ai
```

2. ติดตั้ง
```bash
pip install -r requirements.txt
```

3. เทรนโมเดลตัวอย่าง
```bash
python app/model.py
```

4. รัน inference
```bash
python app/main.py
```

---

## 🧑‍💻 Training

`app/model.py`
```python
import tensorflow as tf
from tensorflow.keras import layers
import numpy as np

def build_model(input_dim=10, num_classes=3):
    model = tf.keras.Sequential([
        layers.Dense(64, activation='relu', input_shape=(input_dim,)),
        layers.Dense(32, activation='relu'),
        layers.Dense(num_classes, activation='softmax')
    ])
    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    return model

def train_and_save():
    X = np.random.rand(500, 10)
    y = tf.keras.utils.to_categorical(np.random.randint(3, size=(500,)), num_classes=3)
    
    model = build_model()
    model.fit(X, y, epochs=10, batch_size=32, validation_split=0.2)
    model.save("models/model.keras")

if __name__ == "__main__":
    train_and_save()
```

> เปลี่ยน `X, y` เป็น dataset จริงของคุณ

---

## 🔮 Inference

`app/inference.py`
```python
import numpy as np
import tensorflow as tf

def load_model(path="models/model.keras"):
    return tf.keras.models.load_model(path)

def predict(model, data: np.ndarray):
    return model.predict(data)
```

`app/main.py`
```python
from inference import load_model, predict
import numpy as np

model = load_model()
sample = np.random.rand(1, 10)  # แทนด้วยข้อมูลจริง
pred = predict(model, sample)
print("Prediction:", pred.argmax(axis=1))
```

---

## 🐳 Docker

```bash
docker build -t crystalcastle-ai .
docker run --rm -it crystalcastle-ai python app/main.py
```

---

## 🗺️ Workflow

[Training Data] → model.py → model.keras → main.py → inference.py → Predict

---

## 🇬🇧 English Overview

crystalcastle-ai is a minimal TensorFlow starter for building, training, and serving models reproducibly.

**Features**
- Clean separation of training and inference
- Dockerfile for consistent environments
- Easy to adapt: change `input_shape` and classes

**Usage** — same commands as Thai section above.

**Train**
```python
# see Thai section for full code
model.save("models/model.keras")
```

**Inference**
```python
model = tf.keras.models.load_model("models/model.keras")
pred = model.predict(your_data)
```

---

## 📌 TODO
- [ ] เพิ่มตัวอย่าง dataset จริง
- [ ] API endpoint ด้วย FastAPI
- [ ] เพิ่ม tests และ GitHub Actions
- [ ] ใส่ LICENSE (MIT แนะนำ)

---
Made with ❤️ by Zyntro-Media-AI
