import { useState } from 'react';



export default function Search({ query, setQuery }) {

  return (
    <input
      className="search"
      type="text"
      placeholder="Search restaurants..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}