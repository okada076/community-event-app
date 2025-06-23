import React, { useState } from 'react'
import CalendarView from './components/CalendarView'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import { events } from './data/events'

function App() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = (keyword) => {
    if (!keyword) {
      setSearchResults([])
      return
    }

    const lowerKeyword = keyword.toLowerCase()

    const filtered = events.filter(event =>
      event.title.toLowerCase().includes(lowerKeyword) ||
      event.description.toLowerCase().includes(lowerKeyword)
    )

    setSearchResults(filtered)
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>地域イベントカレンダー 🏘️</h1>

      {/* 🔍 キーワード検索欄 */}
      <SearchBar onSearch={handleSearch} />

      {/* 🗂 検索結果一覧（該当イベントがある場合） */}
      {searchResults.length > 0 && (
        <SearchResults results={searchResults} />
      )}

      {/* 📅 カレンダーと日付表示 */}
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
