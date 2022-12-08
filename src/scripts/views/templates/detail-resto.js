/* eslint-disable import/no-cycle */
import CONFIG from '../../globals/config';

const detailResto = (restaurant) => `

  <img class="gambarDetail-resto" crossorigin="anonymous" alt="${restaurant.name}" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" tabindex="0" >
    <div class="detailResto">
      <p>📍 ${restaurant.city}</p>
      <h1>${restaurant.name}</h1>
      <p>⭐ ${restaurant.rating}</p>
      <p>Alamat : ${restaurant.address}</p>
      <p class="deskripsi-resto">${restaurant.description}</p>
    </div>

<div class="kategoriResto">
    ${restaurant.categories
    .map(
      (category) => `
            <p class="namaKategori-resto">${category.name}</p>
          `,
    )
    .join('')}
</div>

<div class="menuResto">    
    <h2>Menu</h2>
    
    <div class="list-menuResto">
        <ul>
          <h3>Makanan</h3>
          ${restaurant.menus.foods
    .map(
      (food) => `
      <li><p> ${food.name}</p></li>
    `,
    )
    .join('')}
        </ul>
        
        <ul>
            <h3>Minuman</h3>
            ${restaurant.menus.drinks
    .map(
      (drink) => `
        <li><p> ${drink.name}</p></li>
                `,
    )
    .join('')}
        </ul>
    </div>
</div> 
<div class="reviews">
    <h2>Review</h2>
    <div class="review-list">
    ${restaurant.customerReviews
    .map(
      (review) => `
    <div class="review-item">
      <div>
        <h3 class="namaReviewer">👤 ${review.name}</h3>
        <p class="pesanReviewer">💬 ${review.review}</p>
      </div>
        <p class="tanggalReviewer">${review.date}</p>
    </div>`,
    )
    .join('')}
`;

export default detailResto;
