import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const sections = [
  {
    path: '/local-users',
    title: 'Part A – Local JSON',
    subtitle: 'Fetch & display users.json via fetch()',
    method: 'fetch()',
    source: 'public/users.json',
    color: '#1565c0',
    icon: '📂',
  },
  {
    path: '/api-users',
    title: 'Part B – Public API',
    subtitle: 'Fetch users from JSONPlaceholder',
    method: 'fetch()',
    source: 'jsonplaceholder.typicode.com',
    color: '#2e7d32',
    icon: '🌐',
  },
  {
    path: '/posts',
    title: 'Part C – Fake API (Posts)',
    subtitle: 'Fetch posts from DummyJSON via axios',
    method: 'axios',
    source: 'dummyjson.com/posts',
    color: '#6a1b9a',
    icon: '📝',
  },
  {
    path: '/products',
    title: 'Part C – Fake API (Products)',
    subtitle: 'Fetch products from FakeStore via axios',
    method: 'axios',
    source: 'fakestoreapi.com/products',
    color: '#e65100',
    icon: '🛍️',
  },
];

function Dashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-header-inner">
          <h1>React API Integration</h1>
          <p>Experiment 11 — fetch(), axios & Local JSON</p>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="method-pills">
          <span className="pill pill-fetch">fetch() API</span>
          <span className="pill pill-axios">axios</span>
          <span className="pill pill-json">Local JSON</span>
        </div>

        <div className="dashboard-grid">
          {sections.map((s) => (
            <Link key={s.path} to={s.path} className="nav-card" style={{ '--accent': s.color }}>
              <div className="nav-card-icon">{s.icon}</div>
              <div className="nav-card-body">
                <h2>{s.title}</h2>
                <p>{s.subtitle}</p>
                <div className="nav-card-meta">
                  <span className="meta-method">{s.method}</span>
                  <span className="meta-source">{s.source}</span>
                </div>
              </div>
              <span className="nav-card-arrow">→</span>
            </Link>
          ))}
        </div>
      </main>

      <footer className="app-footer">
        <p>Experiment 11 — React API Integration | fetch() · axios · Local JSON</p>
      </footer>
    </div>
  );
}

export default Dashboard;
