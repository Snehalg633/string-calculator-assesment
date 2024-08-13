import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StringCalculator from './StringCalculator';
import { add } from '../services/stringCalculator';

jest.mock('../services/stringCalculator', () => ({
  add: jest.fn(),
}));

describe('StringCalculator Component', () => {
  beforeEach(() => {
    (add as jest.Mock).mockClear();
  });

  test('renders input and button', () => {
    render(<StringCalculator />);
    
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument();
  });

  test('displays the correct result when input is valid', () => {
    (add as jest.Mock).mockReturnValue(6);
    
    render(<StringCalculator />);
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '1,2,3' } });
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));
    
    expect(screen.getByText(/result: 6/i)).toBeInTheDocument();
  });

  test('displays an error message when input contains negative numbers', () => {
    (add as jest.Mock).mockImplementation(() => {
      throw new Error("negative numbers not allowed: -2");
    });

    render(<StringCalculator />);
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '1,-2,3' } });
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));
    
    expect(screen.getByText(/error: negative numbers not allowed: -2/i)).toBeInTheDocument();
  });

  test('handles custom delimiters', () => {
    (add as jest.Mock).mockReturnValue(3);
    
    render(<StringCalculator />);
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '//;\n1;2' } });
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));
    
    expect(screen.getByText(/result: 3/i)).toBeInTheDocument();
  });

  test('displays error message for malformed input', () => {
    (add as jest.Mock).mockImplementation(() => {
      throw new Error("malformed input");
    });

    render(<StringCalculator />);
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '1,\n2,3' } });
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));
    
    expect(screen.getByText(/error: malformed input/i)).toBeInTheDocument();
  });

  test('shows no result or error initially', () => {
    render(<StringCalculator />);
    
    expect(screen.queryByText(/result:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/error:/i)).not.toBeInTheDocument();
  });
});
