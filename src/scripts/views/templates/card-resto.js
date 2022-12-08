import CONFIG from '../../globals/config';

const cardResto = (restaurant) => `
    <div class="restaurant-item">
    <a href="#/detail/${restaurant.id}">
          <div class="thumnil-card">
              <img class="gambar-resto" tabindex="0" crossorigin="anonymous" alt="${restaurant.name || '-'}" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}"/>
              <p class="kota-resto">📍 ${restaurant.city}</p>
          </div>
          <div class="list-itemkonten">
              <p>⭐ ${restaurant.rating || '-'}</p>
              <h2 class="nama-resto">${restaurant.name || '-'}</h2>
              <p tabindex="0">${restaurant.description || '-'}...</p>
          </div>
    </a>
    </div>
`;

export default cardResto;
