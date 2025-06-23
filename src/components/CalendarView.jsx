// src/components/CalendarView.jsx
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css' // 標準CSSの読み込み
import { events } from '../data/events';
import EventModal from './EventModal';

const CalendarView = ({ onDateSelect }) => {
  const [value, setValue] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDateChange = (date) => {
    setValue(date)
    const formattedDate = date.toISOString().split('T')[0]
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










