import React from 'react'

const EventModal = ({ event, onClose }) => {
  if (!event) return null; // イベントがなければ何も表示しない

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>イベント詳細</h2>
        <div>
          <strong>{event.title}</strong><br />
          {event.description && <p>{event.description}</p>}
        </div>
        <button onClick={onClose}>閉じる</button>
      </div>
    </div>
  )
}

export default EventModal