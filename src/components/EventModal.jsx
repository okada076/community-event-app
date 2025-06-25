import React from 'react'

const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>イベント詳細</h2>
        <div>
          <p><strong>タイトル：</strong> {event.title}</p>
          {event.location && <p><strong>場所：</strong> {event.location}</p>}
          {event.description && <p><strong>メモ：</strong> {event.description}</p>}
        </div>
        <button onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
};

export default EventModal;