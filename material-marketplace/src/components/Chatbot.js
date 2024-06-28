import React, { useState } from 'react';
import '../ChatBot.css'; // Make sure to create this CSS file
import axios from 'axios';
import { BsChatDots, BsX } from 'react-icons/bs'; // Assuming you have Bootstrap icons imported

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === '') {
      return; // Do not send empty messages
    }

    const newMessage = { role: 'user', content: userInput };
    const updatedMessages = [...messages, newMessage]; // Append new user message
    setMessages(updatedMessages);
    setUserInput('');

    try {
      const response = await axios.post('http://localhost:5000/api/bot', { message: userInput });
      const botMessage = { role: 'bot', content: response.data.response };
      setMessages([...updatedMessages, botMessage]); // Append bot response
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission on Enter press
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-button" onClick={toggleChatWindow}>
        {isOpen ? <BsX /> : <BsChatDots />}
      </button>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>Support Chat</span>
            <button className="chatbot-close" onClick={toggleChatWindow}>
              <BsX />
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`}>
                <div className="message-content">{msg.content}</div>
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress} // Handle Enter key press
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
