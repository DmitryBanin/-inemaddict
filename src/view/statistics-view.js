import {createElement} from '../render.js';

const createStatisticsTemplate = (count) => `<p>${count} movies inside</p>`;

export default class StatisticsView {
  constructor(filmCard) {
    this.filmCard = filmCard;
  }

  getTemplate() {
    return  createStatisticsTemplate(this.filmCard);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
