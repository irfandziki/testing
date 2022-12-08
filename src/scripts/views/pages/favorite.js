import FavRestoDB from '../../data/resto-idb';
import cardResto from '../templates/card-resto';

const favorites = {
  async render() {
    return `
    <sectio class="content" id="content" tabindex="0">
    <div class="card">
        <h1 class="judul-konten-resto">Restoran Favorit Anda</h1>
        <div class="restaurants" id="restaurants">
        </div>
    </div>
    </sectio> 
      `;
  },

  async afterRender() {
    const list = await FavRestoDB.getAllResto();
    const restaurantContainer = document.querySelector('#restaurants');
    list.forEach((restaurant) => {
      restaurantContainer.innerHTML += cardResto(restaurant);
    });
  },
};

export default favorites;
