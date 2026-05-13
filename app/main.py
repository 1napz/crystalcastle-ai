import tensorflow as tf
from tensorflow.keras import layers

def build_model():
    model = tf.keras.Sequential([
        layers.Dense(64, activation='relu', input_shape=(10,)),
        layers.Dense(32, activation='relu'),
        layers.Dense(3, activation='softmax')  # Example classification with 3 classes
    ])
    model.compile(optimizer='adam',
                  loss='categorical_crossentropy',
                  metrics=['accuracy'])
    return model

def train_and_save():
    # Generate sample data
    import numpy as np
    X = np.random.rand(100, 10)
    y = tf.keras.utils.to_categorical(np.random.randint(3, size=(100,)), num_classes=3)

    model = build_model()
    model.fit(X, y, epochs=5, batch_size=8)

    # Save the model
    model.save("models/model.h5")

if __name__ == "__main__":
    train_and_save()
