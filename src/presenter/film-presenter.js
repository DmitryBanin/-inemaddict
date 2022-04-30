
import {render} from '../render.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import PopupFilmView from '../view/popup-film-view.js';

const NUMBER_OF_CARD = 5;

export default class FilmPresenter {
  filmsComponent = new FilmsView();
  filmsListComponent = new FilmsListView();
  filmsListContainerComponent = new FilmsListContainerView();


  init = (filmContainer) => {
    this.filmContainer = filmContainer;

    render(this.filmsComponent, this.filmContainer);
    render(this.filmsListComponent, this.filmsComponent.getElement());
    render(this.filmsListContainerComponent, this.filmsListComponent.getElement());

    for (let i = 0; i < NUMBER_OF_CARD; i++) {
      render(new FilmCardView(), this.filmsListContainerComponent.getElement());
    }

    render(new ButtonShowMoreView(), this.filmsListComponent.getElement());
    render(new PopupFilmView(), this.filmContainer);
  };
}
