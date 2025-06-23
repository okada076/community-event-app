import React from 'react';

const EventModal = ({ isOpen, onClose, events }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>イベント詳細</h2>
        {events.length > 0 ? (
          <ul>
            {events.map((event, index) => (
              <li key={index}>
                <strong>{event.title}</strong><br />
                {event.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>この日に登録されたイベントはありません。</p>
        )}
        <button onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
};

export default EventModal;