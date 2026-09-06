import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('PrintiZoo ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          background: '#FFFBEB',
          color: '#111827',
          fontFamily: 'sans-serif',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: 16
          }}>⚡</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 8, color: '#C41E3A' }}>
            Something went wrong
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#6B7280', maxWidth: 400, marginBottom: 20 }}>
            {this.state.error?.message || 'An unexpected error occurred while loading PrintiZoo.'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            style={{
              background: '#C41E3A',
              color: '#FFF',
              border: 'none',
              padding: '12px 24px',
              borderRadius: 999,
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(196, 30, 58, 0.3)'
            }}
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
