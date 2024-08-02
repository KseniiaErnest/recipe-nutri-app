import React from 'react'

export default function Search({handleNutritionSearch, setNutritionSearch, nutritionSearch, searchType,search, setSearch, handleNewSearch }) {

  const searchRecipe = (e) => {
    setSearch(e.target.value);
  };

  const searchNutrition = (e) => {
    setNutritionSearch(e.target.value);
  }

  const submitSearch = (e) => {
    e.preventDefault();
    if (searchType === 'recipe') {
      handleNewSearch(search);
    }
    if (searchType === 'nutrition') {
      handleNutritionSearch(nutritionSearch)
    }
    
  }

  return (
    <form onSubmit={submitSearch}>
    {searchType === 'recipe' ? (
      <input className='search-bar' value={search} onChange={searchRecipe} placeholder='Recipe' />
    ) : (
      <input className='search-bar' value={nutritionSearch} onChange={searchNutrition} placeholder='Nutrition' />
    )}
      
    </form>
  )
}
