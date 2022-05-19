import {createElement} from '../render.js';

const createStatisticsTemplate = (count) => `<p>${count.length} movies inside</p>`;

export default class StatisticsView {
  #element = null;
  #filmCard = null;

  constructor(filmCard) {
    this.#filmCard = filmCard;
  }

  get template() {
    return  createStatisticsTemplate(this.#filmCard);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
