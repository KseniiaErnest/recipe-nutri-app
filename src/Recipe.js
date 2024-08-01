import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MY_ID, MY_KEY } from './config';

export default function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);


  useEffect(() => {
const getOneRecipe = async() => {
  const res = await fetch(`https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${MY_ID}&app_key=${MY_KEY}`);
  const data = await res.json();
  console.log(data);
  setRecipe(data.recipe);
}

getOneRecipe();
  }, [id])
  

  if (!recipe) return <p>Recipe is not found</p>
  return (
    <div>
      <h1>{recipe.label}</h1>
      <p>{recipe.calories}</p>
    </div>
  )
}


// https://api.edamam.com/api/recipes/v2/814429c2ee1d4707912a2251a6178b21?type=public&app_id=3bcd933e&app_key=058c7bd300e0b51c34c9afb7c0710165
//const recipe = recipes.find(oneRecipe => oneRecipe.recipe.uri.includes(id));