export const routes = [
  {
    path: '/',
    name: 'home',
    component: 'home-page',
    action: async () => {
      await import('../pages/home/home-page.js');
    },
  },
  {
    path: '/category/:category',
    name: 'category',
    component: 'category-page',
    action: async () => {
      await import('../pages/category/category-page.js');
    },
  },
  {
    path: '/cocktail/:cocktailId',
    name: 'cocktail',
    component: 'cocktail-page',
    action: async () => {
      await import('../pages/cocktail/cocktail-page.js');
    },
  },
  {
    path: '/favorite-cocktails',
    name: 'favorite-cocktails',
    component: 'favorite-cocktails-page',
    action: async () => {
      await import('../pages/favorite-cocktails/favorite-cocktails-page.js');
    },
  },
  {
    path: '/not-found',
    name: 'not-found',
    notFound: true,
    component: 'not-found-page',
    action: async () => {
      await import('../pages/not-found/not-found-page.js');
    },
  },
];