import React from 'react'

export default function Nutrition({ nutritionData }) {
  return (
    <div>
      <h2>{nutritionData.calories}</h2>
      <h3>{nutritionData.totalWeight}</h3>
    </div>
  )
}
