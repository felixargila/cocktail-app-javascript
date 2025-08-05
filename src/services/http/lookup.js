import cocktailDetailsMock from './lookup-cocktail-detail-mock.js';

// endpoint url: https://www.thecocktaildb.com/api/json/{version}/{user}/lookup.php?i={id}

// Lookup full cocktail details by id
// www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
export async function getFullCocktailDetails(cocktailId) {
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(cocktailDetailsMock);
    }, 2000);
  });
  return data;
}