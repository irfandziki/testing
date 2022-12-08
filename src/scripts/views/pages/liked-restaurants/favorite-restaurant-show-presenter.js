/* eslint-disable no-underscore-dangle */
class FavoriteRestaurantShowPresenter {
  constructor({ view, favoriteRestaurants }) {
    this._view = view;
    this._favoriteRestaurants = favoriteRestaurants;

    this._showFavoriteRestaurants();
  }

  async _showFavoriteRestaurants() {
    const restaurant = await this._favoriteRestaurants.getAllResto();
    this._displayRestaurants(restaurant);
  }

  _displayRestaurants(restaurant) {
    this._view.showFavoriteRestaurants(restaurant);
  }
}

export default FavoriteRestaurantShowPresenter;
