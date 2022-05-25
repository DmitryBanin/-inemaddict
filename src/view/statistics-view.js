import AbstractView from '../framework/view/abstract-view.js';

const createStatisticsTemplate = (count) => `<p>${count.length} movies inside</p>`;

export default class StatisticsView extends AbstractView {
  #filmCard = null;

  constructor(filmCard) {
    super();
    this.#filmCard = filmCard;
  }

  get template() {
    return  createStatisticsTemplate(this.#filmCard);
  }
}
