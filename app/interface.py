import numpy as np

def predict(model, input_data):
    # ทำการทำนายด้วยโมเดล
    prediction = model.predict(input_data)

    # คืนค่าผลลัพธ์ (เช่น argmax สำหรับ classification)
    return np.argmax(prediction, axis=1)
