from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import speech_recognition as sr
from transformers import TFAutoModelForSequenceClassification, AutoTokenizer, AutoConfig
import tensorflow as tf

app = Flask(__name__)
CORS(app)
CORS(app, origins='http://localhost:3000')

# Load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained("fine_tuned_model")
config = AutoConfig.from_pretrained("fine_tuned_model")
model = TFAutoModelForSequenceClassification.from_pretrained("fine_tuned_model", config=config)

# MySQL connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="ADITIUBUNTU",
    database="user_login"
)

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Flask API!"

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
    user = cursor.fetchone()
    cursor.close()

    if not user:
        print("User not found or password incorrect")
        return jsonify({'message': 'Invalid email or password'}), 401

    print("Login successful")
    return jsonify({'user': user}), 200

# Dictionary mapping emotions to emoticons
emoticons = {
    'sadness': '😢',
    'joy': '😀',
    'love': '❤️',
    'anger': '😡',
    'fear': '😱',
    'surprise': '😮'
}

@app.route('/predict_emotion', methods=['POST'])
def predict_emotion():
    data = request.get_json()
    text = data['text']

    # Tokenize the text
    input_encoded = tokenizer(text, return_tensors='tf')

    # Perform inference
    outputs = model(input_encoded)

    # List of emotion labels
    labels = ['sadness', 'joy', 'love', 'anger', 'fear', 'surprise']

    # Get predicted label
    logits = outputs.logits
    pred = tf.argmax(logits, axis=1).numpy()
    predicted_label = labels[pred[0]]

    # Append emoticon to predicted emotion
    predicted_emoticon = emoticons.get(predicted_label, '')

    return jsonify({'predicted_label': predicted_label + predicted_emoticon}), 200


@app.route('/speech_to_text', methods=['POST'])
def speech_to_text():
    recognizer = sr.Recognizer()
    audio_data = request.files['audio'].read()

    with sr.AudioFile(audio_data) as source:
        audio = recognizer.record(source)

    text = recognizer.recognize_google(audio)

    return jsonify({'text': text}), 200

if __name__ == '__main__':
    app.run(debug=True)
