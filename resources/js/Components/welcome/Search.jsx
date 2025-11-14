import { Search } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // manda el texto al padre
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-10">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brandGold w-6 h-6" />

        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Buscar productos..."
          className="
            w-full pl-14 pr-4 py-3 
            rounded-2xl border border-gray-300 
            focus:outline-none focus:ring-2 focus:ring-brandGold
            bg-white dark:bg-zinc-900 
            text-brandBlack dark:text-white
            shadow-md
          "
        />
      </div>
    </div>
  );
}
