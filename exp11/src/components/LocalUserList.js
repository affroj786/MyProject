import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const DEPARTMENTS = ['All', 'Engineering', 'Design', 'Infrastructure', 'Product', 'Analytics'];

function LocalUserList() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [department, setDepartment] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/users.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setFiltered(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFiltered(department === 'All' ? users : users.filter((u) => u.department === department));
  }, [department, users]);

  return (
    <div className="app">
      <div className="page-header">
        <Link to="/" className="back-btn">← Back</Link>
        <div>
          <h1>Local JSON Users</h1>
          <p>Fetched via fetch() from public/users.json</p>
        </div>
      </div>

      <div className="page-content">
        <div className="filter-bar">
          <label htmlFor="dept-filter">Department:</label>
          <select
            id="dept-filter"
            className="filter-select"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {!loading && !error && (
            <span className="results-count">{filtered.length} user{filtered.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {loading && (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading users.json…</p>
          </div>
        )}

        {error && <div className="error-state">Error: {error}</div>}

        {!loading && !error && filtered.length === 0 && (
          <div className="empty-state">No users found for this department.</div>
        )}

        {!loading && !error && (
          <div className="card-grid">
            {filtered.map((user) => {
              const deptColors = {
                Engineering: 'tag-blue',
                Design: 'tag-purple',
                Infrastructure: 'tag-teal',
                Product: 'tag-green',
                Analytics: 'tag-orange',
              };
              return (
                <div key={user.id} className="card">
                  <div className="user-card-top">
                    <img src={user.avatar} alt={user.name} className="avatar" />
                    <div>
                      <div className="user-name">{user.name}</div>
                      <div className="user-username">{user.email}</div>
                    </div>
                  </div>
                  <div className="card-detail">
                    <span>Role</span>
                    <span>{user.role}</span>
                  </div>
                  <div className="card-detail">
                    <span>Location</span>
                    <span>{user.location}</span>
                  </div>
                  <div className="card-detail">
                    <span>Joined</span>
                    <span>{new Date(user.joined).toLocaleDateString()}</span>
                  </div>
                  <span className={`tag ${deptColors[user.department] || 'tag-blue'}`}>
                    {user.department}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <footer className="app-footer">
        <p>Experiment 11 — Part A: Local JSON via fetch()</p>
      </footer>
    </div>
  );
}

export default LocalUserList;
