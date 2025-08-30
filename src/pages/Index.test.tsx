import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Index from './Index';

describe('Index page', () => {
  it('renders the hero title', () => {
    render(<Index />);
    expect(screen.getByText(/Parts Interchange Buddy/i)).toBeInTheDocument();
  });
});
