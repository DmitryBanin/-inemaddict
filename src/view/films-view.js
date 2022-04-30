import {createElement} from '../render.js';

const createFilmsTemplate = () => (
  `<section class="films">

      <!-- films-list-view or list-empty-view -->

  </section>`
);

export default class FilmsView {
  getTemplate() {
    return createFilmsTemplate();
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
