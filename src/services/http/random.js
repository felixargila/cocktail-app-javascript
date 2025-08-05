import { getConfig } from '@open-cells/core';

const {
  appConfig: {
    cocktailsService: { basePath = undefined, userId = undefined, version = undefined } = {},
  } = {},
} = getConfig();

// endpoint url: https://www.thecocktaildb.com/api/json/{version}/{user}/random.php
function getFetchUrl(param, paramValue) {
  const data = new URL(`${basePath}/${version}/${userId}/random.php`);
  if (param && paramValue) {
    data.searchParams.set(param, paramValue);
  }
  return data;
}

export async function getRandomCocktail() {
  const data = await fetch(getFetchUrl());
  return data.json();
}
