import UrlParser from '../../routes/url-parser';
import RestoDB from '../../data/resto-db';
import detailResto from '../templates/detail-resto';
import LikeButtonPresenter from '../../utils/like-button-presenter';

const detail = {
  async render() {
    return `
    <section class="content" id="content" tabindex="0">
      <div class="card">
        <h1 class="judul-konten-resto">Detail Restoran</h1>
      <div class="detail" id="detail"></div>
      <div id="likeButtonContainer"></div>
      </div>
    </section>  
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const { restaurant } = await RestoDB.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#detail');
    restaurantContainer.innerHTML = detailResto(restaurant);
    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant,
    });
  },
};

export default detail;
