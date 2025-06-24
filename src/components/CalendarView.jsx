import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { events } from '../data/events'

const CalendarView = ({ onDateSelect }) => {
  const [value, setValue] = useState(new Date())

  const handleDateChange = (date) => {
    setValue(date)
    onDateSelect(date)
  }

  return (
    <Calendar
      onChange={handleDateChange}
      value={value}
      tileClassName={({ date, view }) => {
        const formatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
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
  )
}

export default CalendarView