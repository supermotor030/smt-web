import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '../components/Hero'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, style, ...props }) => <div {...props}>{children}</div>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    img: (props) => <img {...props} />,
    span: ({ children, ...props }) => {
      // Handle motion values being passed as children
      const displayChildren = typeof children === 'object' && children !== null && 'get' in children
        ? children.get()
        : children
      return <span {...props}>{displayChildren}</span>
    },
    g: ({ children, style, ...props }) => <g {...props}>{children}</g>,
  },
  AnimatePresence: ({ children }) => children,
  useScroll: () => ({ scrollYProgress: { current: 0, get: () => 0 } }),
  useTransform: (value, inputRange, outputRange) => {
    // If it's a function transform (used for rpmDisplay)
    if (typeof inputRange === 'function') {
      return { get: () => inputRange(0), current: inputRange(0) }
    }
    return { get: () => outputRange?.[0] ?? 0, current: outputRange?.[0] ?? 0 }
  },
  useMotionValue: (initialValue) => ({ 
    get: () => initialValue, 
    set: () => {}, 
    current: initialValue,
    onChange: () => () => {},
  }),
  animate: () => ({ stop: () => {} }),
}))

// Mock hooks
vi.mock('../hooks/useReducedMotion', () => ({
  default: () => false,
}))

describe('Hero Component', () => {
  it('renders the main heading', () => {
    render(<Hero />)
    expect(screen.getByText('PRECISION')).toBeInTheDocument()
    expect(screen.getByText('ENGINEERED')).toBeInTheDocument()
    expect(screen.getByText('EXCELLENCE')).toBeInTheDocument()
  })

  it('renders the partner badge', () => {
    render(<Hero />)
    expect(screen.getByText('YOUR TRUSTED AUTOMOTIVE PARTNER')).toBeInTheDocument()
  })

  it('renders WhatsApp CTA button', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument()
  })

  it('renders Browse Parts button', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /browse/i })).toBeInTheDocument()
  })

  it('renders key features', () => {
    render(<Hero />)
    expect(screen.getByText('100% Genuine')).toBeInTheDocument()
    expect(screen.getByText('Expert Advice')).toBeInTheDocument()
    expect(screen.getByText('Fast Service')).toBeInTheDocument()
  })

  it('has correct aria-label on section', () => {
    render(<Hero />)
    const section = screen.getByRole('region', { name: /hero section/i })
    expect(section).toBeInTheDocument()
  })

  it('renders scroll indicator', () => {
    render(<Hero />)
    expect(screen.getByText('Scroll')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /scroll to about/i })).toBeInTheDocument()
  })
})
