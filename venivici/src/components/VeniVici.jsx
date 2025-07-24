import React, { useState } from 'react'
import { fetchRandomItem, getItemByName } from '../api/stardewApi'
import BanList from './BanList'
import SearchBar from './SearchBar'
import '../App.css'

export default function VeniVici() {
  const [item, setItem]       = useState(null)
  const [banList, setBanList] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  // search state
  const [query, setQuery]     = useState('')

  const loadRandom = async () => {
    if (loading) return
    setLoading(true)
    setError(null)
    try {
      const next = await fetchRandomItem(banList)
      if (item) setHistory(h => [item, ...h])
      setItem(next)
      setQuery('')  // clear any search
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    if (!query.trim()) return
    const found = getItemByName(query)
    if (found) {
      if (item) setHistory(h => [item, ...h])
      setItem(found)
      setError(null)
    } else {
      setError(`No item named “${query}” found.`)
    }
  }

  const toggleBan = val =>
    setBanList(bl =>
      bl.includes(val) ? bl.filter(x => x !== val) : [...bl, val]
    )

  const clearHistory = () => setHistory([])

  return (
    <div className="venivici-wrapper">
      {/* LEFT COLUMN: Search, Card + Discover */}
      <div className="main-section">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={handleSearch}
        />

        {error && <div className="error">{error}</div>}

        {item && (
          <div className="card">
            <div className="image-container">
              <img src={item.image} alt={item.name} />
            </div>
            <h2>{item.name}</h2>
            <p className="desc">{item.description}</p>

            <div className="attrs">
              {['type','season','id'].map(attr => {
                const val = item[attr]
                return (
                  <button
                    key={attr}
                    className={banList.includes(val) ? 'banned' : ''}
                    onClick={() => toggleBan(val)}
                  >
                    {attr.charAt(0).toUpperCase()+attr.slice(1)}: {val}
                  </button>
                )
              })}
            </div>

            <BanList list={banList} onRemove={toggleBan} />
          </div>
        )}

        <button
          className="discover-btn"
          onClick={loadRandom}
          disabled={loading}
        >
          {loading ? 'Discovering…' : 'Discover'}
        </button>
      </div>

      {/* RIGHT COLUMN: History */}
      {history.length > 0 && (
        <section className="history-section">
          <h2>What have we seen so far?</h2>
          <div className="history-grid">
            {history.map((it,i) => (
              <img
                key={`${it.id}-${i}`}
                src={it.image}
                alt={it.name}
                title={`${it.name} (${it.type}, ${it.season})`}
                onClick={() => setItem(it)}
              />
            ))}
          </div>
          <button className="clear-btn" onClick={clearHistory}>
            Clear History
          </button>
        </section>
      )}
    </div>
  )
}
