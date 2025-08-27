// src/App.js
import React, { useState } from 'react';
import './App.css'; 

function App() {
  const [key, setKey] = useState('');
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [status, setStatus] = useState('');

  const generateKey = async () => {
    setStatus('Generating quantum-inspired key...');
    try {
      const response = await fetch('https://quantumlock-api.onrender.com/api/generate-key');
      const data = await response.json();
      setKey(data.key);
      setStatus(data.message);
    } catch (error) {
      setStatus('Failed to generate key.');
    }
  };

  const encryptMessage = async () => {
    setStatus('Encrypting message with post-quantum algorithm...');
    try {
      const response = await fetch('https://quantumlock-api.onrender.com/api/encrypt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, key }),
      });
      const data = await response.json();
      setEncryptedMessage(data.encrypted_message);
      setStatus(data.message);
    } catch (error) {
      setStatus('Failed to encrypt message.');
    }
  };

  const decryptMessage = async () => {
    setStatus('Decrypting message...');
    try {
      const response = await fetch('https://quantumlock-api.onrender.com/api/decrypt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ encrypted_message: encryptedMessage, key }),
      });
      const data = await response.json();
      setDecryptedMessage(data.decrypted_message);
      setStatus(data.message);
    } catch (error) {
      setStatus('Failed to decrypt message.');
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Project QuantumLock</h1>
        <p>Your portal to the future of secure communication.</p>
      </header>
      <div className="card">
        <h2>1. Generate a Quantum-Inspired Key</h2>
        <button onClick={generateKey}>Generate Key</button>
        {key && <p className="result">Key: {key.substring(0, 10)}...</p>}
      </div>

      <div className="card">
        <h2>2. Encrypt Your Message</h2>
        <input
          type="text"
          placeholder="Enter a message to encrypt"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={encryptMessage} disabled={!key || !message}>Encrypt</button>
        {encryptedMessage && <p className="result">Encrypted: {encryptedMessage.substring(0, 20)}...</p>}
      </div>

      <div className="card">
        <h2>3. Decrypt the Message</h2>
        <button onClick={decryptMessage} disabled={!encryptedMessage}>Decrypt</button>
        {decryptedMessage && <p className="result">Decrypted: {decryptedMessage}</p>}
      </div>

      <footer className="status-bar">
        <p>{status}</p>
      </footer>
    </div>
  );
}

export default App;