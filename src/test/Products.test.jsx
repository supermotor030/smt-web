import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Products from '../components/Products'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, onClick, ...props }) => (
      <button onClick={onClick} {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }) => children,
}))

// Mock react-intersection-observer
vi.mock('react-intersection-observer', () => ({
  useInView: () => [null, true],
}))

// Mock window.open
const mockWindowOpen = vi.fn()
global.open = mockWindowOpen

describe('Products Component', () => {
  const mockOnProductSelect = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the section header', () => {
    render(<Products onProductSelect={mockOnProductSelect} />)
    expect(screen.getByText('Our Products')).toBeInTheDocument()
    expect(screen.getByText(/QUALITY PARTS FOR/)).toBeInTheDocument()
  })

  it('renders product cards', () => {
    render(<Products onProductSelect={mockOnProductSelect} />)
    // Check for product names from siteData
    expect(screen.getByText('Engine Parts')).toBeInTheDocument()
  })

  it('calls onProductSelect when product card is clicked', () => {
    render(<Products onProductSelect={mockOnProductSelect} />)
    const productCards = screen.getAllByRole('button', { name: /view.*details/i })
    fireEvent.click(productCards[0])
    expect(mockOnProductSelect).toHaveBeenCalled()
  })

  it('opens WhatsApp when inquire button is clicked', () => {
    render(<Products onProductSelect={mockOnProductSelect} />)
    const inquireButtons = screen.getAllByRole('button', { name: /inquire now/i })
    fireEvent.click(inquireButtons[0])
    expect(mockWindowOpen).toHaveBeenCalledWith(
      expect.stringContaining('wa.me'),
      '_blank'
    )
  })

  it('product cards are keyboard accessible', () => {
    render(<Products onProductSelect={mockOnProductSelect} />)
    const productCards = screen.getAllByRole('button', { name: /view.*details/i })
    
    // Simulate Enter key press
    fireEvent.keyDown(productCards[0], { key: 'Enter' })
    expect(mockOnProductSelect).toHaveBeenCalled()
  })
})
