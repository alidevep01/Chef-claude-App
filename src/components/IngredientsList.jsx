import React, { useState } from "react";

function IngredientsList({ ingredient, addRecipe }) {
  return (
    <section>
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingredient.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {ingredient.length > 3 && (
        <div className="get-recipe-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={addRecipe}>Get a recipe</button>
        </div>
      )}
    </section>
  );
}

export default IngredientsList;
