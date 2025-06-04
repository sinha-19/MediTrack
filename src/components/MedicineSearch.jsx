import { useState, useEffect } from 'react'
import { searchMedicines } from '../utils/apiService'
function MedicineSearch({ onSelect }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (!query || query.trim().length < 3) {
      setResults([]);
      return;
    }
    const timer = setTimeout(() => {
      searchMedicinesHandler(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);
  const searchMedicinesHandler = async (searchQuery) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchMedicines(searchQuery);
      setResults(data.results);
    } catch (err) {
      setError(err.message || 'An error occurred while searching');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };
  const handleSelect = (medicine) => {
    onSelect(medicine);
    setQuery('');
    setResults([]);
  };
  return (
    <div className="relative">
      <div className="mb-4">
        <label htmlFor="medicine-search" className="label">
          Search Medicine
        </label>
        <input
          id="medicine-search"
          type="text"
          className="input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type at least 3 characters..."
        />
        {loading && (
          <div className="mt-2 text-sm text-gray-600">
            Searching...
          </div>
        )}
        {error && (
          <div className="mt-2 text-sm text-danger-500">
            {error}
          </div>
        )}
      </div>
      {results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {results.map((medicine, index) => (
              <li 
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(medicine)}
              >
                <div className="font-medium">{medicine.brandName || medicine.genericName}</div>
                {medicine.genericName && medicine.brandName && (
                  <div className="text-sm text-gray-600">{medicine.genericName}</div>
                )}
                {medicine.manufacturer && (
                  <div className="text-xs text-gray-500">{medicine.manufacturer}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
export default MedicineSearch