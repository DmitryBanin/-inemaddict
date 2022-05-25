import AbstractView from '../framework/view/abstract-view.js';

const createFilmsListTemplate = () => (
  `<section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

        <!-- films-list-container-view -->

   </section>`
);

export default class FilmsListView extends AbstractView {
  get template() {
    return createFilmsListTemplate();
  }
}
