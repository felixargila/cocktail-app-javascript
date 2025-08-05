import mockedCocktailsFilteredByCategory from './filter-cocktails-by-category-mock.js';

// endpoint url: https://www.thecocktaildb.com/api/json/{version}/{user}/filter.php

export async function getCocktailsByCategory() {
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockedCocktailsFilteredByCategory);
    }, 2000);
  });
  return data;
}