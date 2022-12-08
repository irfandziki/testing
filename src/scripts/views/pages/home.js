import RestoDB from '../../data/resto-db';
import cardResto from '../templates/card-resto';

const home = {
  async render() {
    return `

    </div>       
      <section class="content" id="content" tabindex="0">
          <div class="card">
              <h1 class="judul-konten-resto">Explore Restoran</h1>
              <div class="restaurants" id="restaurants">
              </div>
          </div>
      </section> 
        `;
  },

  async afterRender() {
    const list = await RestoDB.restaurantList();
    const restaurantContainer = document.querySelector('#restaurants');
    list.restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += cardResto(restaurant);
    });
  },
};

export default home;
