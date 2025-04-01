import React, { useState } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "../ai";

function Main() {
  const [ingredient, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [recipe, setRecipe] = useState("");

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((previngredient) => [...previngredient, newIngredient]);
    setInputValue("");
  }
  //   const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
  //   console.log(API_KEY); // Ensure it loads correctly

  async function addRecipe() {
    const markdownRecipe = await getRecipeFromMistral(ingredient);
    setRecipe(markdownRecipe);
  }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button>Add ingredient</button>
      </form>
      {ingredient.length > 0 && (
        <IngredientsList ingredient={ingredient} addRecipe={addRecipe} />
      )}
      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}

export default Main;
