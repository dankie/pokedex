import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '@/components/SearchBar';

describe('SearchBar', () => {
  it('renders correctly', () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);

    expect(screen.getByPlaceholderText('Search Pokémon (min. 3 characters)...')).toBeInTheDocument();
  });

  it('shows warning message when input length is between 1 and 2 characters', () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="a" onChange={mockOnChange} />);

    expect(screen.getByText('Please enter at least 3 characters to search')).toBeInTheDocument();
  });

  it('calls onChange handler when input changes', () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Search Pokémon (min. 3 characters)...');
    fireEvent.change(input, { target: { value: 'pikachu' } });

    expect(mockOnChange).toHaveBeenCalledWith('pikachu');
  });
});