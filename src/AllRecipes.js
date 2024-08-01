import React from 'react';
import { Link } from 'react-router-dom';


export default function AllRecipes({ recipes }) {
  return (
    <main>
      {recipes.map((oneRecipe, index) => (
        <div className='recipe-item' key={index}>
        <Link className='link' to={`/recipe/${oneRecipe.recipe.uri.split('_').pop()}`}>
        <img className='img-small' src={oneRecipe.recipe.images.SMALL.url} alt={oneRecipe.recipe.label}/>
          <h3>{oneRecipe.recipe.label}</h3>
          </Link>
        </div>
        
      ))}
    </main>
  )
}
