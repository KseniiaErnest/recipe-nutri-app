import React from 'react'

export default function Search({ search, setSearch, submittedSearch, setSubmittedSearch, handleNewSearch }) {

  const searchRecipe = (e) => {
    setSearch(e.target.value);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    handleNewSearch(search);
  }

  return (
    <form onSubmit={submitSearch}>
      <input className='search-bar' value={search} onChange={searchRecipe} />
    </form>
  )
}
