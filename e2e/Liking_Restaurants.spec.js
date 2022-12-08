/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
  I.amOnPage('/');

  I.waitForElement('.nama-resto a', 10);
  I.seeElement('.nama-resto a');
  const firstResto = locate('.nama-resto a').first();
  const firstRestoName = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.waitForElement('#likeButton', 10);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#favorite');
  I.seeElement('.restaurant-item');

  const likedRestoName = await I.grabTextFrom('.nama-resto');

  assert.strictEqual(firstRestoName, likedRestoName);
});

Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.waitForElement('.nama-resto a', 10);
  I.seeElement('.nama-resto a');

  const names = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.nama-resto a').at(i));
    I.waitForElement('#likeButton', 10);
    I.seeElement('#likeButton');
    I.click('#likeButton');
    names.push(await I.grabTextFrom('.nama-resto'));
    I.amOnPage('/');
  }

  I.amOnPage('/#favorite');
  I.seeElement('#query');

  const searchQuery = names[1].substring(1, 3);
  const matchingRestaurants = names.filter((name) => name.indexOf(searchQuery) !== -1);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurants);

  matchingRestaurants.forEach(async (name, index) => {
    const visibleName = await I.grabTextFrom(locate('.nama-resto').at(index + 1));
    assert.strictEqual(name, visibleName);
  });
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
  I.amOnPage('/');

  I.waitForElement('.nama-resto a', 10);
  I.seeElement('.nama-resto a');
  const firstResto = locate('.nama-resto a').first();
  const firstRestoName = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.waitForElement('#likeButton', 10);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#favorite');
  I.seeElement('.restaurant-item');

  const likedRestoName = await I.grabTextFrom('.nama-resto');

  assert.strictEqual(firstRestoName, likedRestoName);
});
