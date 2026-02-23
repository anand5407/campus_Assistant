import React, { useState } from 'react';
import { Search, Mic } from 'lucide-react';

export function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleVoiceInput = () => {
    alert('Voice input feature - would use Web Speech API in production');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search campus locations or ask by voice…"
              className="w-full pl-12 pr-12 py-3 rounded-full border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
            />
            
            <button
              type="button"
              onClick={handleVoiceInput}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Mic className="w-5 h-5 text-gray-500 hover:text-green-600" />
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}
