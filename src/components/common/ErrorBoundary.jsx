import React from 'react';
import { RefreshCw, AlertTriangle, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, isChunkError: false };
  }

  static getDerivedStateFromError(error) {
    const errorMsg = error?.message || error?.toString() || '';
    const isChunkError =
      errorMsg.includes('Failed to fetch dynamically imported module') ||
      errorMsg.includes('Expected a JavaScript-or-Wasm module script') ||
      errorMsg.includes('Loading chunk') ||
      errorMsg.includes('failed to fetch');

    return { hasError: true, error, isChunkError };
  }

  componentDidCatch(error, errorInfo) {
    console.error('BuildZone ErrorBoundary caught an unhandled error:', error, errorInfo);

    // If it's a deployment chunk hash mismatch, automatically reload immediately
    const errorMsg = error?.message || error?.toString() || '';
    if (
      errorMsg.includes('Failed to fetch dynamically imported module') ||
      errorMsg.includes('Expected a JavaScript-or-Wasm module script') ||
      errorMsg.includes('Loading chunk')
    ) {
      const lastReload = window.sessionStorage.getItem('bz_eb_reload_ts');
      const now = Date.now();
      // Only reload if we haven't reloaded in the last 10 seconds to avoid infinite reload loops
      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        window.sessionStorage.setItem('bz_eb_reload_ts', now.toString());
        window.location.reload();
      }
    }
  }

  handleReload = () => {
    window.sessionStorage.removeItem('bz_eb_reload_ts');
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-xl space-y-6">
            <div className="w-16 h-16 bg-blue-50 border border-blue-200 text-[#0066FF] rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              {this.state.isChunkError ? (
                <RefreshCw className="w-8 h-8 animate-spin text-[#0066FF]" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-amber-600" />
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-display uppercase tracking-tight text-[#0B1938]">
                {this.state.isChunkError ? 'Updating Application...' : 'Application Interrupted'}
              </h2>
              <p className="text-sm text-slate-600 font-sans leading-relaxed">
                {this.state.isChunkError
                  ? 'A newer version of BuildZone was deployed. Refreshing your session to get the latest update.'
                  : 'An unexpected application state occurred. Please refresh the page to restore connectivity.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#0066FF] hover:bg-[#0052CC] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>
              <button
                onClick={this.handleGoHome}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
