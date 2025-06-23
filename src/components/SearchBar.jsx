import React, { useState } from 'react'

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('')

  const handleSearch = () => {
    onSearch(keyword.trim())
  }

  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
      <input
        type="text"
        placeholder="キーワードを入力"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{ padding: '8px', width: '60%' }}
      />
      <button onClick={handleSearch} style={{ marginLeft: '10px', padding: '8px 16px' }}>
        検索
      </button>
    </div>
  )
}

export default SearchBar