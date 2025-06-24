import React, { useState } from "react";

const AddEventModal = ({ selectedDate, onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      date: selectedDate,
      title,
      location,
      description, 
    });
    setTitle("");
    setLocation("");
    setDescription(""); 
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{selectedDate.toDateString()}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="イベントタイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="場所（任意）"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <textarea
            placeholder="メモ（任意）"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="submit">登録</button>
          <button type="button" onClick={onClose}>キャンセル</button>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;