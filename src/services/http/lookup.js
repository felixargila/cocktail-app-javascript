import { getConfig } from '@open-cells/core';

const {
  appConfig: {
    cocktailsService: { basePath = undefined, userId = undefined, version = undefined } = {},
  } = {},
} = getConfig();

// endpoint url: https://www.thecocktaildb.com/api/json/{version}/{user}/lookup.php?i={id}
function getFetchUrl(param, paramValue) {
  const data = new URL(`${basePath}/${version}/${userId}/lookup.php`);
  if (param && paramValue) {
    data.searchParams.set(param, paramValue);
  }
  return data;
}

// Lookup full cocktail details by id
// www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
export async function getFullCocktailDetails(cocktailId) {
  const data = await fetch(getFetchUrl('i', cocktailId));
  return data.json();
}