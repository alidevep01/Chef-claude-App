export async function getRecipeFromChefClaude(ingredientsArr) {
  const response = await fetch("/.netlify/functions/getRecipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients: ingredientsArr }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Something went wrong");
  return data.recipe;
}
