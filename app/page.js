'use client';

import { useState } from 'react';

export default function ResearchPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Start research
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim() })
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error.message);
      }

      // Poll for results
      const sessionId = result.data.sessionId;
      pollResults(sessionId);

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const pollResults = async (sessionId) => {
    try {
      const response = await fetch(`/api/research/${sessionId}`);
      const result = await response.json();

      if (result.success && result.data.status === 'completed') {
        setResults(result.data.results);
        setLoading(false);
      } else if (result.success && result.data.status === 'running') {
        setTimeout(() => pollResults(sessionId), 1000);
      } else {
        throw new Error('Failed to get results');
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const exampleQueries = [
    'quantum computing',
    'ai safety research', 
    'renewable energy trends',
    'CRISPR gene editing'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🔬 Deep Research Assistant
          </h1>
          <p className="text-xl text-blue-100">
            AI-Powered Research Platform on Vercel
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your research query..."
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                disabled={loading}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Researching...' : 'Start Research'}
            </button>
          </form>

          {/* Example Queries */}
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-3">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {exampleQueries.map((example) => (
                <button
                  key={example}
                  onClick={() => setQuery(example)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                  disabled={loading}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-lg">Processing your research query...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <p className="text-red-800">Error: {error}</p>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="bg-white rounded-xl shadow-xl p-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">📊 Research Results</h2>
              {results.aiGenerated && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                  ✨ AI Generated
                </span>
              )}
            </div>
            
            {/* Images */}
            {results.images && results.images.length > 0 && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">🖼️ Visual Context</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {results.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={image.url} 
                        alt={image.description}
                        className="w-full h-32 object-cover rounded"
                      />
                      <p className="text-xs text-gray-600 mt-1">{image.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Summary */}
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">📝 AI Research Summary</h3>
              <p className="text-gray-700 leading-relaxed">{results.summary}</p>
            </div>

            {/* Sources */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📚 Research Sources</h3>
              <div className="space-y-3">
                {results.sources.map((source, index) => (
                  <div key={index} className="bg-white p-4 rounded border">
                    <div className="font-medium text-gray-800">{source.title}</div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="inline-block px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded uppercase">
                        {source.type}
                      </span>
                      {source.relevance && (
                        <span className={`inline-block px-2 py-1 text-xs rounded ${
                          source.relevance === 'high' ? 'bg-green-200 text-green-800' :
                          source.relevance === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                          'bg-gray-200 text-gray-800'
                        }`}>
                          {source.relevance} relevance
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights */}
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">💡 Key Insights</h3>
              <ul className="space-y-2">
                {results.insights.map((insight, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">💡</span>
                    <span className="text-gray-700">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trends (if available) */}
            {results.trends && results.trends.length > 0 && (
              <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📈 Current Trends</h3>
                <ul className="space-y-2">
                  {results.trends.map((trend, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-indigo-500 mt-1">📈</span>
                      <span className="text-gray-700">{trend}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
