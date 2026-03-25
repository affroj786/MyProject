import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cityFilter, setCityFilter] = useState('All');
  const [cities, setCities] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setFiltered(data);
        const uniqueCities = ['All', ...new Set(data.map((u) => u.address.city))];
        setCities(uniqueCities);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFiltered(
      cityFilter === 'All' ? users : users.filter((u) => u.address.city === cityFilter)
    );
  }, [cityFilter, users]);

  const initials = (name) =>
    name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="app">
      <div className="page-header">
        <Link to="/" className="back-btn">← Back</Link>
        <div>
          <h1>JSONPlaceholder Users</h1>
          <p>Fetched via fetch() from jsonplaceholder.typicode.com/users</p>
        </div>
      </div>

      <div className="page-content">
        <div className="filter-bar">
          <label htmlFor="city-filter">City:</label>
          <select
            id="city-filter"
            className="filter-select"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          >
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {!loading && !error && (
            <span className="results-count">{filtered.length} user{filtered.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {loading && (
          <div className="loading-state">
            <div className="spinner" />
            <p>Fetching from JSONPlaceholder…</p>
          </div>
        )}

        {error && <div className="error-state">Error: {error}</div>}

        {!loading && !error && filtered.length === 0 && (
          <div className="empty-state">No users found for this city.</div>
        )}

        {!loading && !error && (
          <div className="card-grid">
            {filtered.map((user) => (
              <div key={user.id} className="card">
                <div className="user-card-top">
                  <div className="avatar-placeholder">{initials(user.name)}</div>
                  <div>
                    <div className="user-name">{user.name}</div>
                    <div className="user-username">@{user.username}</div>
                  </div>
                </div>
                <div className="card-detail">
                  <span>Email</span>
                  <span>{user.email}</span>
                </div>
                <div className="card-detail">
                  <span>Phone</span>
                  <span>{user.phone}</span>
                </div>
                <div className="card-detail">
                  <span>Company</span>
                  <span>{user.company.name}</span>
                </div>
                <div className="card-detail">
                  <span>City</span>
                  <span>{user.address.city}</span>
                </div>
                <div className="card-detail">
                  <span>Website</span>
                  <span>{user.website}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="app-footer">
        <p>Experiment 11 — Part B: Public API via fetch()</p>
      </footer>
    </div>
  );
}

export default UserList;
