import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, isChecked) => {
  const { name, count } = filter;

  const getName = (names) => {
    switch (names) {
      case 'all':
        return 'All movies';
      case 'watchlist':
        return 'Watchlist';
      case 'history':
        return 'History';
      case 'favorites':
        return 'Favorites';
    }
  };
  return (
    `
      <a href="#${name}" class="main-navigation__item
      ${isChecked ? 'main-navigation__item--active' : ''}">${getName(name)}${name === 'all' ? '' : `<span class="main-navigation__item-count">${count}</span>`}</a>
    `
  );
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return `<nav class="main-navigation">

    ${filterItemsTemplate}

  </nav>`;
};

export default class MainNavigationView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
