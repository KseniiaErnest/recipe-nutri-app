import React from "react";

export default function Nutrition({ nutritionData }) {
  if (!nutritionData || !nutritionData.totalNutrients) {
    return <div className="nutri_info-container">Please start your search</div>;
  }

  const totalNutrientEntry = Object.entries(nutritionData.totalNutrients).map(
    ([key, el]) => el
  );

  return (
    <div className="nutri_info-container">
      <p>Total Nutrients Infromation for {nutritionData.ingredients.map((el, index) => (
        <span key={index}>{el.text} {index < nutritionData.ingredients.length - 1 && ' + '} </span>
      ))}</p>
      <div className="nutrients-container">
        {totalNutrientEntry.map((el, index) => (
          <p key={index}><span>{el.label}:</span> {el.quantity.toFixed(2)} {el.unit}</p>
        ))}
      </div>
    </div>
  );
}
