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

  // ✅ ここで日付をセット
  const handleDateSelect = (date) => {
    setSelectedDate(date)
  }

  // 🗓️ 選択された日付に対応するイベントだけを抽出
  const selectedEvents = selectedDate
    ? events.filter(event => event.date === selectedDate.toISOString().split('T')[0])
    : []

  return (
    <div className="main-container">
      <h1 className="app-title">地域イベントカレンダー 🏘️</h1>

      <div className="search-section">
        <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />
      </div>

      {searchResults.length > 0 && (
        <div className="results-section">
          <SearchResults results={searchResults} />
        </div>
      )}

      <div className="calendar-section">
        <CalendarView onDateSelect={handleDateSelect} />
      </div>

      {selectedDate && (
        <div className="selected-date">
          <strong>選択された日付：</strong> {selectedDate.toDateString()}
        </div>
      )}

      {selectedEvents.length > 0 && (
        <div className="event-details">
          <h2>イベント詳細</h2>
          {selectedEvents.map((event, index) => (
            <div key={index} className="event-item">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App