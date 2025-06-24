import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { events } from '../data/events'
import EventModal from './EventModal'

const CalendarView = ({ onDateSelect }) => {
  const [value, setValue] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // ✅ ローカル時間でフォーマットする共通関数（UTCズレ回避）
  const formatDate = (date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }

  const handleDateChange = (date) => {
    setValue(date)

    const formattedDate = formatDate(date)
    const foundEvent = events.find(event => event.date === formattedDate)

    if (foundEvent) {
      setSelectedEvent(foundEvent)
      setIsModalOpen(true)
    } else {
      setSelectedEvent(null)
      setIsModalOpen(false)
    }

    onDateSelect(date)
  }

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={value}
        tileClassName={({ date, view }) => {
          const formatted = formatDate(date)
          const hasEvent = events.some(e => e.date === formatted)

          console.log('tile:', formatted, 'hasEvent:', hasEvent)

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

export default CalendarView