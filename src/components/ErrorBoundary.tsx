import { Component, ReactNode, ErrorInfo } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(_error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#030305',
          color: '#E8E8F0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: 'Inter, sans-serif'
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '600px'
          }}>
            <h1 style={{
              fontSize: '3rem',
              color: '#FF5500',
              marginBottom: '1rem',
              fontFamily: 'Bebas Neue, sans-serif'
            }}>
              🔧 Something went wrong
            </h1>
            <p style={{ marginBottom: '2rem', color: '#9090A0' }}>
              We encountered an error while loading the page. Please try refreshing.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: '#FF5500',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              Refresh Page
            </button>
            {import.meta.env.DEV && this.state.error && (
              <details style={{
                marginTop: '2rem',
                textAlign: 'left',
                backgroundColor: '#0A0A0F',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #1E1E2E'
              }}>
                <summary style={{ cursor: 'pointer', color: '#FF5500' }}>
                  Error Details (Development Only)
                </summary>
                <pre style={{
                  marginTop: '1rem',
                  overflow: 'auto',
                  color: '#EF4444',
                  fontSize: '0.875rem'
                }}>
                  {this.state.error && this.state.error.toString()}
                </pre>
                <pre style={{
                  marginTop: '0.5rem',
                  overflow: 'auto',
                  color: '#6E6E7A',
                  fontSize: '0.75rem'
                }}>
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
