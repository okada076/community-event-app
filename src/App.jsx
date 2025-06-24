import React, { useState, useEffect } from 'react'
import CalendarView from './components/CalendarView'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import EventModal from './components/EventModal'
import { events } from './data/events'

function App() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (query.trim() === '') {
      setSearchResults([])
    }
  }, [query])

  const formatDate = (date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)

    const formatted = formatDate(date)
    const found = events.find(event => event.date === formatted)

    if (found) {
      setSelectedEvent(found)
      setIsModalOpen(true)
    } else {
      setSelectedEvent(null)
      setIsModalOpen(false)
    }
  }

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
    <div className="main-container">
      <h1 className="app-title">地域イベントカレンダー📅🌈</h1>

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
          <strong>選択された日付：</strong>{' '}
          {selectedDate.toLocaleDateString('ja-JP', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </div>
      )}

      {isModalOpen && selectedEvent && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          event={selectedEvent}
        />
      )}
    </div>
  )
}

export default App
