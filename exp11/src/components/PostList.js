import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../services/apiService';
import '../App.css';

const SORT_OPTIONS = [
  { value: 'default', label: 'Default Order' },
  { value: 'title_asc', label: 'Title A → Z' },
  { value: 'title_desc', label: 'Title Z → A' },
  { value: 'likes_desc', label: 'Most Likes' },
  { value: 'views_desc', label: 'Most Views' },
];

function PostList() {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [tagFilter, setTagFilter] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [tags, setTags] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts(30)
      .then((data) => {
        setPosts(data);
        setFiltered(data);
        const allTags = ['All', ...new Set(data.flatMap((p) => p.tags))].sort();
        setTags(allTags);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = tagFilter === 'All' ? [...posts] : posts.filter((p) => p.tags.includes(tagFilter));
    if (sortBy === 'title_asc')   result.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === 'title_desc')  result.sort((a, b) => b.title.localeCompare(a.title));
    if (sortBy === 'likes_desc')  result.sort((a, b) => b.reactions.likes - a.reactions.likes);
    if (sortBy === 'views_desc')  result.sort((a, b) => b.views - a.views);
    setFiltered(result);
  }, [tagFilter, sortBy, posts]);

  return (
    <div className="app">
      <div className="page-header">
        <Link to="/" className="back-btn">← Back</Link>
        <div>
          <h1>DummyJSON Posts</h1>
          <p>Fetched via axios from dummyjson.com/posts</p>
        </div>
      </div>

      <div className="page-content">
        <div className="filter-bar">
          <label htmlFor="tag-filter">Tag:</label>
          <select
            id="tag-filter"
            className="filter-select"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
          >
            {tags.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <label htmlFor="sort-filter">Sort:</label>
          <select
            id="sort-filter"
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {!loading && !error && (
            <span className="results-count">{filtered.length} post{filtered.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {loading && (
          <div className="loading-state">
            <div className="spinner" />
            <p>Fetching posts via axios…</p>
          </div>
        )}

        {error && <div className="error-state">Error: {error}</div>}

        {!loading && !error && filtered.length === 0 && (
          <div className="empty-state">No posts match the selected tag.</div>
        )}

        {!loading && !error && (
          <div className="card-grid">
            {filtered.map((post) => (
              <div key={post.id} className="card post-card">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                  {post.tags.map((t) => (
                    <span key={t} className="tag tag-purple">{t}</span>
                  ))}
                </div>
                <div className="post-meta">
                  <span>👍 {post.reactions.likes}  👎 {post.reactions.dislikes}</span>
                  <span>👁 {post.views} views</span>
                  <span>User #{post.userId}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="app-footer">
        <p>Experiment 11 — Part C: Fake API via axios (dummyjson.com)</p>
      </footer>
    </div>
  );
}

export default PostList;
