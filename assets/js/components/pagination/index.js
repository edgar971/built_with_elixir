import React from 'react'

function Pagination({ onClick, isLoading }) {
  return (
    <nav className="load-more-section">
      <button onClick={onClick} disabled={isLoading}>
        {!isLoading ? 'Load More' : 'Loading...'}
      </button>
    </nav>
  )
}

export default Pagination