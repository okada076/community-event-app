import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import AddEventModal from './AddEventModal' // モーダル追加

const CalendarView = () => {
  const [value, setValue] = useState(new Date())
  const [events, setEvents] = useState([]) // ← 登録されたイベント配列
  const [selectedDate, setSelectedDate] = useState(null)

  // カレンダー日付選択時の処理
  const handleDateChange = (date) => {
    setValue(date)
    setSelectedDate(date) // モーダル表示用に選択
  }

  // イベント登録処理
  const handleAddEvent = (eventData) => {
    const formattedDate = dateToString(selectedDate)
    const newEvent = { ...eventData, date: formattedDate }

    setEvents([...events, newEvent])
    setSelectedDate(null)
  }

  // 日付の比較用に 'YYYY-MM-DD' に変換
  const dateToString = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={value}
        tileClassName={({ date, view }) => {
          const formatted = dateToString(date)
          const hasEvent = events.some(e => e.date === formatted)

          const classes = []
          if (view === 'month') {
            const isSameMonth = date.getMonth() === value.getMonth()
            const day = date.getDay()

            if (!isSameMonth) return null
            if (day === 0) classes.push('sunday')
            if (day === 6) classes.push('saturday')
            if (hasEvent) classes.push('react-calendar__tile--hasEvent')
          }
          return classes.join(' ')
        }}
        formatDay={(locale, date) => date.getDate()}
      />

      {selectedDate && (
        <AddEventModal
          selectedDate={selectedDate}
          onSave={handleAddEvent}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  )
}

export default CalendarView