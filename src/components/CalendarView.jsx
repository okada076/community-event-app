import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { events as initialEvents } from '../data/events'
import AddEventModal from './AddEventModal'
import EventModal from './EventModal'

const CalendarView = ({ onDateSelect }) => {
  const [value, setValue] = useState(new Date())
  const [events, setEvents] = useState(() => [...initialEvents])
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)

  // 初回読み込み：localStorageから
  useEffect(() => {
    const saved = localStorage.getItem('events')
    if (saved) {
      setEvents(JSON.parse(saved))
    }
  }, [])

  const dateToString = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }

  const handleDateClick = (date) => {
    setValue(date)
    onDateSelect(date)

    const dateStr = dateToString(date)
    const event = events.find(e => e.date === dateStr)

    // モーダル重複防止
    setSelectedDate(null)
    setSelectedEvent(null)

    if (event) {
      setSelectedEvent(event)
    }
  }

  const handleAddEvent = (eventData) => {
    const formattedDate = dateToString(eventData.date)
    const newEvent = { ...eventData, date: formattedDate }

    const updatedEvents = [...events, newEvent]
    setEvents(updatedEvents)
    localStorage.setItem('events', JSON.stringify(updatedEvents))
    setSelectedDate(null)
  }

  const handleOpenAddEvent = () => {
    setSelectedEvent(null)
    setSelectedDate(new Date())
  }

  const handleDeleteEvent = (eventToDelete) => {
    const updatedEvents = events.filter(e => !(e.date === eventToDelete.date && e.title === eventToDelete.title))
    setEvents(updatedEvents)
    localStorage.setItem('events', JSON.stringify(updatedEvents))
    setSelectedEvent(null)
  }

  return (
    <div className="calendar-container">
      <Calendar
        onChange={handleDateClick}
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

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button onClick={handleOpenAddEvent}>＋イベント登録</button>
      </div>

      {selectedDate && (
        <AddEventModal
          selectedDate={selectedDate}
          onSave={handleAddEvent}
          onClose={() => setSelectedDate(null)}
        />
      )}

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onDelete={handleDeleteEvent}
        />
      )}
    </div>
  )
}

export default CalendarView