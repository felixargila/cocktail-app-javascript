import mockedRandomCocktail from './random-cocktail-mock.js';

// endpoint url: https://www.thecocktaildb.com/api/json/{version}/{user}/random.php

export async function getRandomCocktail() {
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockedRandomCocktail);
    }, 2000);
  });
  return data;
}