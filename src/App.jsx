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

  // ✅ ローカル時間でフォーマットする関数（UTC問題対策）
  const formatDate = (date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
  }

  // 🗓️ 選択された日付に対応するイベントだけを抽出（ローカル時間で一致）
  const selectedEvents = selectedDate
    ? events.filter(event => event.date === formatDate(selectedDate))
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
          <strong>選択された日付：</strong> {selectedDate.toLocaleDateString('ja-JP', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
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