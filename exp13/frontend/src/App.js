import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE = process.env.REACT_APP_API_URL || '/api';

function App() {
  const [messages, setMessages] = useState([]);
  const [health, setHealth] = useState(null);
  const [newText, setNewText] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealth();
    fetchMessages();
  }, []);

  const fetchHealth = async () => {
    try {
      const res = await axios.get(`${API_BASE}/health`);
      setHealth(res.data);
    } catch (err) {
      setError('Backend connection failed');
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/messages`);
      setMessages(res.data);
    } catch (err) {
      setError('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newText.trim()) return;
    try {
      const res = await axios.post(`${API_BASE}/messages`, { text: newText });
      setMessages((prev) => [...prev, res.data]);
      setNewText('');
    } catch (err) {
      setError('Failed to send message');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Full Stack Application</h1>
        <p>Spring Boot + React Deployment</p>
      </header>

      <main className="app-main">
        <section className="status-card">
          <h2>Server Status</h2>
          {health ? (
            <div className={`badge badge-${health.status === 'UP' ? 'success' : 'error'}`}>
              {health.status} — {health.text}
            </div>
          ) : (
            <div className="badge badge-error">Disconnected</div>
          )}
        </section>

        {error && <div className="error-banner">{error}</div>}

        <section className="messages-card">
          <h2>Messages</h2>
          {loading ? (
            <p className="loading">Loading...</p>
          ) : (
            <ul className="message-list">
              {messages.map((msg, idx) => (
                <li key={idx} className={`message-item status-${msg.status}`}>
                  <span className="message-text">{msg.text}</span>
                  <span className="message-status">{msg.status}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="form-card">
          <h2>Add Message</h2>
          <form onSubmit={handleSubmit} className="message-form">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Enter message text..."
              className="text-input"
            />
            <button type="submit" className="submit-btn">Send</button>
          </form>
        </section>
      </main>

      <footer className="app-footer">
        <p>Experiment 13 — Full Stack Deployment | Spring Boot + React</p>
      </footer>
    </div>
  );
}

export default App;
