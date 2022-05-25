import AbstractView from '../framework/view/abstract-view.js';

const createFilmsTemplate = () => (
  `<section class="films">

      <!-- films-list-view or list-empty-view -->

  </section>`
);

export default class FilmsView extends AbstractView {
  get template() {
    return createFilmsTemplate();
  }
}
