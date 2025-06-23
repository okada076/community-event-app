// src/components/CalendarView.jsx
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css' // 標準CSSの読み込み

const CalendarView = ({ onDateSelect }) => {
  const [value, setValue] = useState(new Date())

  const handleDateChange = (date) => {
    setValue(date)
    onDateSelect(date) // 親コンポーネントに選択日を渡す
  }

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <Calendar
        onChange={handleDateChange}
        value={value}
        tileContent={({ date, view }) =>
          view === 'month' ? (
            <div style={{ fontSize: '0.7rem', color: '#2e7d32' }}>
              {/* イベントがある日付に●をつけるなども将来的にここで */}
            </div>
          ) : null
        }
      />
    </div>
  )
}

export default CalendarView