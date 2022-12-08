/* eslint-disable no-undef */
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
import FavRestoDB from '../src/scripts/data/resto-idb';
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view';

describe('Searching restaurant', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = spyOnAllFunctions(FavRestoDB);
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });
  describe('when query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurants('resto a');

      expect(presenter.latestQuery).toEqual('resto a');
    });

    it('should ask the model to search for liked restaurant', () => {
      searchRestaurants('resto a');

      expect(favoriteRestaurants.searchRestaurants)
        .toHaveBeenCalledWith('resto a');
    });

    it('should show the restaurants found by Favorite Restaurant', (done) => {
      document.getElementById('restaurant')
        .addEventListener('restaurant:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(3);
          done();
        });

      favoriteRestaurants.searchRestaurants.withArgs('resto a').and.returnValues([
        { id: 111, name: 'resto abc' },
        { id: 222, name: 'ada juga resto abcde' },
        { id: 333, name: 'ini juga boleh resto a' },
      ]);

      searchRestaurants('resto a');
    });

    it('should show - when the restaurant returned does not contain a name', (done) => {
      document.getElementById('restaurant')
        .addEventListener('restaurant:updated', () => {
          const restaurantTitles = document.querySelectorAll('.nama-resto');
          expect(restaurantTitles.item(0).textContent).toEqual('-');

          done();
        });

      favoriteRestaurants.searchRestaurants.withArgs('resto a').and.returnValues([
        { id: 444 },
      ]);

      searchRestaurants('resto a');
    });

    it('should show the name of the restaurant found by Favorite Restaurants', (done) => {
      document.getElementById('restaurant')
        .addEventListener('restaurant:updated', () => {
          const restaurantTitles = document.querySelectorAll('.nama-resto');
          expect(restaurantTitles.item(0).textContent).toEqual('resto abc');
          expect(restaurantTitles.item(1).textContent).toEqual('ada juga resto abcde');
          expect(restaurantTitles.item(2).textContent).toEqual('ini juga boleh resto a');

          done();
        });

      favoriteRestaurants.searchRestaurants.withArgs('resto a').and.returnValues([
        { id: 111, name: 'resto abc' },
        { id: 222, name: 'ada juga resto abcde' },
        { id: 333, name: 'ini juga boleh resto a' },
      ]);

      searchRestaurants('resto a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurant', () => {
      searchRestaurants('    ');
      expect(favoriteRestaurants.getAllResto)
        .toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurant could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('restaurant')
        .addEventListener('restaurant:updated', () => {
          expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
          done();
        });

      favoriteRestaurants.searchRestaurants.withArgs('resto a').and.returnValues([]);

      searchRestaurants('resto a');
    });

    it('should not show any restaurant', (done) => {
      document.getElementById('restaurant')
        .addEventListener('restaurant:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(0);
          done();
        });

      favoriteRestaurants.searchRestaurants.withArgs('resto a').and.returnValues([]);

      searchRestaurants('resto a');
    });
  });
});
