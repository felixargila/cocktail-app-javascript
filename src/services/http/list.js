import mockedCategoriesList from './list-categories-mock.js';

// endpoint url: https://www.thecocktaildb.com/api/json/{version}/{user}/list.php

export async function getCategoriesList() {
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockedCategoriesList);
    }, 2000);
  });
  return data;
}
