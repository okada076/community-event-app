import React, { useState } from 'react'
import CalendarView from './components/CalendarView'

function App() {
  const [selectedDate, setSelectedDate] = useState(null)

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>地域イベントカレンダー 🏘️</h1>
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