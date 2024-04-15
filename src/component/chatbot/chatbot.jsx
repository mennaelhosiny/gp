// src/ChatBot.js
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import './chatbot.css'; // Import the ChatBot.css file for styling

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = async () => {
    if (inputValue.trim() === '') return;

    const newMessages = [...messages, { text: inputValue, sender: 'user' }];
    setMessages(newMessages);
    setInputValue('');

    try {
      const response = await $.get(`http://localhost:5000/api/chatBot?message=${encodeURIComponent(inputValue)}`);
      const botReply = response.reply;
      const botMessages = [...newMessages, { text: botReply, sender: 'bot' }];
      setMessages(botMessages);
    } catch (error) {
      console.error('Error communicating with the bot:', error);
    }
  };

  // Scroll to the bottom of the chat messages when new messages are added
  useEffect(() => {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, [messages]);

  return (
    <div id="chat-container">
      <div id="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <div className="message-content">{message.text}</div>
          </div>
        ))}
      </div>
      <div id="user-input">
        <input
          type="text"
          id="message-input"
          placeholder="أدخل رسالتك..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={sendMessage}>إرسال</button>
      </div>
    </div>
  );
};

export default ChatBot;
