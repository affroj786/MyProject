import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header', () => {
  render(<App />);
  const heading = screen.getByText(/Full Stack Application/i);
  expect(heading).toBeInTheDocument();
});

test('renders server status section', () => {
  render(<App />);
  const status = screen.getByText(/Server Status/i);
  expect(status).toBeInTheDocument();
});
