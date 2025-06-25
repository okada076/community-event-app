import React, { useState } from "react";

const AddEventModal = ({ selectedDate, onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState(""); 

  // ✅ 選択された日付を文字列（YYYY-MM-DD）で初期化
  const [date, setDate] = useState(
    selectedDate ? selectedDate.toISOString().substr(0, 10) : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      date,  // ← ここを selectedDate ではなく、選択された文字列にする
      title,
      location,
      description, 
    });
    setTitle("");
    setLocation("");
    setDescription(""); 
    setDate("");
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>イベント登録</h2>
        <form onSubmit={handleSubmit}>
          {/* ✅ 日付入力欄を追加 */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
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
