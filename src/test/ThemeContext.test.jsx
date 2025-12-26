import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider, useTheme } from '../context/ThemeContext'

// Test component that uses the theme hook
function TestComponent() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  )
}

describe('ThemeContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock localStorage
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
    })
  })

  it('provides default dark theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark')
  })

  it('toggles between dark and light themes', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    
    const toggleButton = screen.getByRole('button', { name: /toggle/i })
    
    // Initially dark
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark')
    
    // Toggle to light
    fireEvent.click(toggleButton)
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light')
    
    // Toggle back to dark
    fireEvent.click(toggleButton)
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark')
  })

  it('persists theme to localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    
    const toggleButton = screen.getByRole('button', { name: /toggle/i })
    fireEvent.click(toggleButton)
    
    expect(localStorage.setItem).toHaveBeenCalledWith('smt-theme', 'light')
  })

  it('loads saved theme from localStorage', () => {
    localStorage.getItem.mockReturnValue('light')
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light')
  })
})
