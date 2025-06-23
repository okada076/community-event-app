import React from 'react';

const EventModal = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>イベント詳細</h2>
        {event ? (
          <div>
            <strong>{event.title}</strong><br />
            {event.description}
          </div>
        ) : (
          <p>この日に登録されたイベントはありません。</p>
        )}
        <button onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
};

export default EventModal;