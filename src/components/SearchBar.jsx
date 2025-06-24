import React from 'react'

const SearchBar = ({ value, onChange, onSearch }) => {
  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
      <input
        type="text"
        placeholder="キーワードを入力"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ padding: '8px', width: '60%' }}
      />
      <button
        onClick={() => onSearch(value)}
        style={{ marginLeft: '10px', padding: '8px 16px' }}
      >
        検索
      </button>
    </div>
  )
}

export default SearchBar
