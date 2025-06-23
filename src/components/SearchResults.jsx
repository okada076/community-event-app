import React from 'react'

const SearchResults = ({ results }) => {
  if (results.length === 0) {
    return <p style={{ textAlign: 'center' }}>該当するイベントが見つかりませんでした。</p>
  }

  return (
    <ul style={{ maxWidth: '600px', margin: '0 auto', padding: '0', listStyle: 'none' }}>
      {results.map((event, index) => (
        <li key={index} style={{ padding: '12px', borderBottom: '1px solid #ccc' }}>
          <strong>{event.title}</strong><br />
          <small>{event.date}</small><br />
          <p>{event.description}</p>
        </li>
      ))}
    </ul>
  )
}

export default SearchResults