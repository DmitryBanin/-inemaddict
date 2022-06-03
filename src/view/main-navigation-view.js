import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const';

const createFilterItemTemplate = (filter, isChecked) => {
  const { name, count } = filter;

  const getName = (names) => {
    switch (names) {
      case FilterType.ALL:
        return 'All movies';
      case FilterType.WATCHLIST:
        return 'Watchlist';
      case FilterType.HISTORY:
        return 'History';
      case FilterType.FAVORITES:
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
