import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test.skip('renders discover title', () => {
  render(<App />);
  expect(screen.getByText(/Discover NFTs on OpenSea/i)).toBeInTheDocument();
});
