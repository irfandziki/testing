/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import cardResto from '../../templates/card-resto';

class FavoriteRestaurantSearchView {
  getTemplate() {
    return `
          <div class="content">
            <input id="query" type="text">
            <h2 class="content__heading">Your Liked Restaurant</h2>
              <div id="restaurant" class="restaurant">
              </div>
        </div>
        `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurant = []) {
    let html;
    if (restaurant.length) {
      html = restaurant.reduce((carry, restaurants) => carry.concat(cardResto(restaurants)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }
    document.getElementById('restaurant').innerHTML = html;

    document.getElementById('restaurant').dispatchEvent(new Event('restaurant:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return '<div class="restaurant-item__not__found">Tidak ada restaurant untuk ditampilkan</div>';
  }
}

export default FavoriteRestaurantSearchView;
