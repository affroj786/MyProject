import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header', () => {
  render(<App />);
  const heading = screen.getByText(/Student Management System/i);
  expect(heading).toBeInTheDocument();
});

test('renders add student form', () => {
  render(<App />);
  const label = screen.getByText(/Add New Student/i);
  expect(label).toBeInTheDocument();
});
