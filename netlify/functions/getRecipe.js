// netlify/functions/getRecipe.js
import fetch from "node-fetch";

export const handler = async (event) => {
  const { ingredients } = JSON.parse(event.body);
  const ingredientsString = ingredients.join(", ");

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.ANTHROPIC_API_KEY}`,
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system: `
          You are an assistant that receives a list of ingredients and returns a recipe in markdown format.
        `,
        messages: [
          {
            role: "user",
            content: `I have ${ingredientsString}. Please give me a recipe!`,
          },
        ],
      }),
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ recipe: data.content[0].text }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
