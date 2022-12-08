/* eslint-disable no-undef */
import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';
import FavRestoDB from '../src/scripts/data/resto-idb';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavRestoDB.getAllResto()).forEach(async (restaurants) => {
      await FavRestoDB.deleteResto(restaurants.id);
    });
  });

  itActsAsFavoriteRestaurantModel(FavRestoDB);
});
