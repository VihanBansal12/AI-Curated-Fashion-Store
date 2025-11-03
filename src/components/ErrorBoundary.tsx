'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; reset: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} reset={this.reset} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, reset }: { error?: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="text-6xl mb-4">😅</div>
        <h2 className="text-title text-primary mb-4">Oops! Something went wrong</h2>
        <p className="text-body text-ui-gray mb-6">
          Our AI stylist had a small fashion emergency. Let's get you back to creating amazing outfits!
        </p>
        {error && (
          <details className="mb-6 text-left">
            <summary className="text-small text-ui-gray cursor-pointer mb-2">
              Technical details
            </summary>
            <pre className="text-xs text-red-600 bg-red-50 p-3 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
        <button onClick={reset} className="btn-primary">
          🔄 Try Again
        </button>
      </div>
    </div>
  );
}

export default ErrorBoundary;