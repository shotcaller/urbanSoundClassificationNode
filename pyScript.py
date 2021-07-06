import sys
import librosa
import numpy as np
#import pandas as pd
import os
import tensorflow as tf


path = "./uploads/"+sys.argv[1]
y, sr = librosa.load(path)

mels = np.mean(librosa.feature.melspectrogram(y=y, sr=sr).T, axis=0)
#print(mels.shape)
temp = np.array(mels)
#print(temp.shape)
data = temp.transpose()
#print(data.shape)
X = data.reshape([1,128])
X = X.reshape(1,16,8,1)

#print(X.shape)
#print("Done")
#print(X)
model = tf.saved_model.load("savedModel")
outputs = model(X)
outputs = outputs.numpy()
# maxValue = outputs.max()
# index = np.argmax(outputs)

# labels = ["Air Conditioner", "Car Horn", "Children Playing", "Dog Bark", "Drilling",
#           "Engine Idling", "Gunshot", "Jackhammer", "Siren", "Street Music" ]

# print(labels[index])

print(outputs.tolist())

#sys.stdout.flush()

