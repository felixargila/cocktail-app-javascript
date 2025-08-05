import { getConfig } from '@open-cells/core';

const {
  appConfig: {
    cocktailsService: { basePath = undefined, userId = undefined, version = undefined } = {},
  } = {},
} = getConfig();

// endpoint url: https://www.thecocktaildb.com/api/json/{version}/{user}/list.php
function getFetchUrl(param, paramValue) {
  const data = new URL(`${basePath}/${version}/${userId}/list.php`);
  if (param && paramValue) {
    data.searchParams.set(param, paramValue);
  }
  return data;
}

export async function getCategoriesList() {
  const data = await fetch(getFetchUrl('c', 'list'));
  return data.json();
}
