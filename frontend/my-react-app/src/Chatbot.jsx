import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './Chatbot.css'; // Import CSS file for styling
import predictIcon from './sent.png'; // Import image for predict button
import speechIcon from './mic.png'; // Import image for speech button

function Chatbot({ user }) {
    const [text, setText] = useState('');
    const [conversation, setConversation] = useState([]);
    const { transcript, resetTranscript } = useSpeechRecognition();

    useEffect(() => {
        // Scroll to the bottom of the conversation when it updates
        scrollToBottom();
    }, [conversation]);

    const scrollToBottom = () => {
        const chatbox = document.getElementById('chatbox');
        chatbox.scrollTop = chatbox.scrollHeight;
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handlePrediction = () => {
        axios.post('http://localhost:5000/predict_emotion', { text })
            .then(response => {
                const predictedEmotion = response.data.predicted_label;
                setConversation([...conversation, { text, predictedEmotion }]);
                setText('');
            })
            .catch(error => {
                console.error('Error predicting emotion:', error);
            });
    };

    const handleSpeechToText = () => {
        if (transcript) {
            setText(transcript);
            handlePrediction();
            resetTranscript();
        } else {
            SpeechRecognition.startListening();
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbox" id="chatbox">
                {conversation.map((item, index) => (
                    <div key={index}>
                        <p>User: {item.text}</p>
                        <p>Chatbot: Predicted Emotion: {item.predictedEmotion}</p>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input type="text" value={text} onChange={handleTextChange} className="input-box" />
                <img src={predictIcon} alt="Predict" onClick={handlePrediction} className="predict-button" />
                <img src={speechIcon} alt="Speech" onClick={handleSpeechToText} className="speech-button" />
            </div>
        </div>
    );
}

export default Chatbot;



