import React, { useState, useEffect } from 'react'
import CalendarView from './components/CalendarView'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import { events } from './data/events'

function App() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [query, setQuery] = useState('')

  // 🔍 入力が空になったら検索結果をクリア
  useEffect(() => {
    if (query.trim() === '') {
      setSearchResults([])
    }
  }, [query])

  const handleSearch = (keyword) => {
    const trimmed = keyword.trim()
    setQuery(trimmed)

    if (!trimmed) {
      setSearchResults([])
      return
    }

    const lowerKeyword = trimmed.toLowerCase()

    const filtered = events.filter(event =>
      event.title.toLowerCase().includes(lowerKeyword) ||
      event.description.toLowerCase().includes(lowerKeyword)
    )

    setSearchResults(filtered)
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>地域イベントカレンダー 🏘️</h1>

      <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />

      {searchResults.length > 0 && (
        <SearchResults results={searchResults} />
      )}

      <CalendarView onDateSelect={setSelectedDate} />

      {selectedDate && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <strong>選択された日付：</strong> {selectedDate.toDateString()}
        </div>
      )}
    </div>
  )
}

export default App