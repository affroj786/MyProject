import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
  expect(screen.getByText(/React API Integration/i)).toBeInTheDocument();
});

test('renders all part links on dashboard', () => {
  render(<App />);
  expect(screen.getByText(/Local JSON/i)).toBeInTheDocument();
  expect(screen.getByText(/Public API/i)).toBeInTheDocument();
});
