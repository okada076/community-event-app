import React from 'react'

const EventModal = ({ event, onClose, onDelete }) => {
  if (!event) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>イベント詳細</h2>
        <div>
          <strong>{event.title}</strong><br />
          {event.location && <p>📍 {event.location}</p>}
          {event.description && <p>{event.description}</p>}
        </div>
        <button onClick={onClose}>閉じる</button>
        <button onClick={() => onDelete(event)} style={{ color: 'red' }}>
          削除
        </button>
      </div>
    </div>
  )
}

export default EventModal
