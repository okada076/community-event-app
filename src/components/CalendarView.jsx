// src/components/CalendarView.jsx
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { events } from '../data/events'
import EventModal from './EventModal'

const CalendarView = ({ onDateSelect }) => {
  const [value, setValue] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDateChange = (date) => {
    setValue(date)

    const formatDate = (date) =>
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

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
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <Calendar
        onChange={handleDateChange}
        value={value}
        tileClassName={({ date, view }) => {
          if (view !== 'month') return null

          const isSameMonth = date.getMonth() === value.getMonth()
          const day = date.getDay()

          if (!isSameMonth) return null
          if (day === 0) return 'sunday'    // 日曜
          if (day === 6) return 'saturday'  // 土曜
          return null
        }}
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