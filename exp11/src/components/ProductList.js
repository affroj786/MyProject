import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, fetchProductCategories } from '../services/apiService';
import '../App.css';

const SORT_OPTIONS = [
  { value: 'default', label: 'Default Order' },
  { value: 'price_asc', label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'rating_desc', label: 'Top Rated' },
  { value: 'title_asc', label: 'Name A → Z' },
];

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchProductCategories()])
      .then(([prods, cats]) => {
        setProducts(prods);
        setFiltered(prods);
        setCategories(['All', ...cats]);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result =
      categoryFilter === 'All'
        ? [...products]
        : products.filter((p) => p.category === categoryFilter);

    if (sortBy === 'price_asc')   result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price_desc')  result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating_desc') result.sort((a, b) => b.rating.rate - a.rating.rate);
    if (sortBy === 'title_asc')   result.sort((a, b) => a.title.localeCompare(b.title));

    setFiltered(result);
  }, [categoryFilter, sortBy, products]);

  const stars = (rate) => {
    const full = Math.round(rate);
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  };

  return (
    <div className="app">
      <div className="page-header">
        <Link to="/" className="back-btn">← Back</Link>
        <div>
          <h1>FakeStore Products</h1>
          <p>Fetched via axios from fakestoreapi.com/products</p>
        </div>
      </div>

      <div className="page-content">
        <div className="filter-bar">
          <label htmlFor="cat-filter">Category:</label>
          <select
            id="cat-filter"
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c} style={{ textTransform: 'capitalize' }}>{c}</option>
            ))}
          </select>

          <label htmlFor="prod-sort">Sort:</label>
          <select
            id="prod-sort"
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {!loading && !error && (
            <span className="results-count">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {loading && (
          <div className="loading-state">
            <div className="spinner" />
            <p>Fetching products via axios…</p>
          </div>
        )}

        {error && <div className="error-state">Error: {error}</div>}

        {!loading && !error && filtered.length === 0 && (
          <div className="empty-state">No products in this category.</div>
        )}

        {!loading && !error && (
          <div className="card-grid">
            {filtered.map((product) => (
              <div key={product.id} className="card product-card">
                <div className="product-img-wrap">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="product-title">{product.title}</div>
                <div className="product-price">${product.price.toFixed(2)}</div>
                <div className="product-rating">
                  {stars(product.rating.rate)} ({product.rating.count} reviews)
                </div>
                <span className="tag tag-orange" style={{ textTransform: 'capitalize' }}>
                  {product.category}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="app-footer">
        <p>Experiment 11 — Part C: Fake API via axios (fakestoreapi.com)</p>
      </footer>
    </div>
  );
}

export default ProductList;
