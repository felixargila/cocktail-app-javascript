import { getConfig } from '@open-cells/core';

const {
  appConfig: {
    cocktailsService: {
      actions = undefined,
      basePath = undefined,
      userId = undefined,
      version = undefined,
    } = {},
  } = {},
} = getConfig();

// endpoint url: https://www.thecocktaildb.com/api/json/{version}/{user}/filter.php
function getFetchUrl(param, paramValue) {
  const data = new URL(`${basePath}/${version}/${userId}/${actions.filter}`);
  if (param && paramValue) {
    data.searchParams.set(param, paramValue);
  }
  return data;
}

export async function getCocktailsByCategory(category) {
  const data = await fetch(getFetchUrl('c', category));
  return data.json();
}