import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LocalUserList from './components/LocalUserList';
import UserList from './components/UserList';
import PostList from './components/PostList';
import ProductList from './components/ProductList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/local-users" element={<LocalUserList />} />
          <Route path="/api-users" element={<UserList />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
