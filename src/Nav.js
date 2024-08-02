import React from 'react'

export default function Nav({handleSelection}) {
  return (
    <nav>
      <select onChange={handleSelection}>
        <option value='recipe'>Recipe Search</option>
        <option value='nutrition'>Nutrition Analysis</option>
      </select>
    </nav>
  )
}
