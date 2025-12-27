import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LuSearch, LuX, LuArrowRight, LuClock, LuTrendingUp } from 'react-icons/lu'
import { GiGears } from 'react-icons/gi'
import { products } from '../data/siteData'

// Popular searches
const popularSearches = [
  'Brake pads',
  'Oil filter',
  'Timing belt',
  'Shock absorbers',
  'Clutch kit',
  'Radiator',
]

// Recent searches (in real app, would be from localStorage)
const recentSearches = [
  'Toyota Corolla brake pads',
  'Honda Civic air filter',
]

export default function QuickSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const inputRef = useRef(null)

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Close on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  // Search logic
  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    const searchLower = query.toLowerCase()
    const matched = []

    products.forEach((category) => {
      // Check category name
      if (category.name.toLowerCase().includes(searchLower)) {
        matched.push({
          type: 'category',
          name: category.name,
          icon: category.icon,
          color: category.color,
          items: category.items.slice(0, 3),
        })
      }

      // Check individual items
      category.items.forEach((item) => {
        if (item.toLowerCase().includes(searchLower)) {
          matched.push({
            type: 'item',
            name: item,
            category: category.name,
            color: category.color,
          })
        }
      })
    })

    setResults(matched.slice(0, 8))
  }, [query])

  const handleSearch = (searchTerm) => {
    // In real app: navigate to search results or WhatsApp
    const message = `Hi! I'm looking for: ${searchTerm}`
    window.open(`https://wa.me/94704344855?text=${encodeURIComponent(message)}`, '_blank')
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-void/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25 }}
          className="max-w-2xl mx-auto mt-20 mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search box */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Input */}
            <div className="flex items-center gap-4 p-4 border-b border-gray-100">
              <LuSearch className="w-6 h-6 text-steel-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for parts... (e.g., brake pads, oil filter)"
                className="flex-1 text-lg text-forge-900 placeholder-steel-400 outline-none font-body"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && query) {
                    handleSearch(query)
                  }
                }}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <LuX className="w-5 h-5 text-steel-500" />
                </button>
              )}
              <button
                onClick={onClose}
                className="px-3 py-1 text-sm text-steel-500 hover:text-forge-900 font-tech uppercase"
              >
                ESC
              </button>
            </div>

            {/* Results or suggestions */}
            <div className="max-h-[60vh] overflow-y-auto">
              {results.length > 0 ? (
                <div className="p-4">
                  <p className="font-tech text-xs text-steel-500 uppercase tracking-wider mb-3">
                    Results
                  </p>
                  <div className="space-y-2">
                    {results.map((result, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSearch(result.name)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group"
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${result.color}15` }}
                        >
                          {result.type === 'category' ? (
                            <result.icon className="w-5 h-5" style={{ color: result.color }} />
                          ) : (
                            <GiGears className="w-5 h-5" style={{ color: result.color }} />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-tech text-forge-900 font-medium">{result.name}</p>
                          {result.type === 'item' && (
                            <p className="text-xs text-steel-500">in {result.category}</p>
                          )}
                          {result.type === 'category' && result.items && (
                            <p className="text-xs text-steel-500">
                              {result.items.join(', ')}...
                            </p>
                          )}
                        </div>
                        <LuArrowRight className="w-4 h-4 text-steel-400 group-hover:text-ignition-600 transition-colors" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 space-y-6">
                  {/* Recent searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <p className="font-tech text-xs text-steel-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <LuClock className="w-3 h-3" /> Recent
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => setQuery(search)}
                            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-forge-900 font-body transition-colors"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular searches */}
                  <div>
                    <p className="font-tech text-xs text-steel-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <LuTrendingUp className="w-3 h-3" /> Popular
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => setQuery(search)}
                          className="px-3 py-1.5 bg-ignition-50 hover:bg-ignition-100 text-ignition-700 rounded-full text-sm font-body transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick categories */}
                  <div>
                    <p className="font-tech text-xs text-steel-500 uppercase tracking-wider mb-3">
                      Browse Categories
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {products.slice(0, 6).map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleSearch(cat.name)}
                          className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${cat.color}15` }}
                          >
                            <cat.icon className="w-5 h-5" style={{ color: cat.color }} />
                          </div>
                          <span className="text-xs text-forge-900 font-tech">{cat.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-steel-500">
                Press <kbd className="px-1.5 py-0.5 bg-white rounded border text-xs">Enter</kbd> to search via WhatsApp
              </span>
              <span className="text-xs text-steel-400">Powered by Super Motor Trading</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
