
import {render} from '../render.js';
import MainNavigationView from '../view/main-navigation-view.js';
import SortView from '../view/sort-view.js';
import FilmListPresenter from './film-list-presenter.js';
import StatisticsView from '../view/statistics-view.js';

export default class FilmPresenter {
  filmListPresenter = new FilmListPresenter();

  initMain = (filmContainer, cardsModel) => {
    this.filmContainer = filmContainer;
    this.cardsModel = cardsModel;
    this.filmCards = [...this.cardsModel.getFilmCards()];

    render(new MainNavigationView(), this.filmContainer);
    render(new SortView(), this.filmContainer);

    this.filmListPresenter.initFilmList(this.filmContainer, this.filmCards);
  };

  initFooter = (filmContainer, cardsModel) => {
    this.filmContainer = filmContainer;
    this.cardsModel = cardsModel;
    this.filmCards = [...this.cardsModel.getFilmCards()];

    render(new StatisticsView(), this.filmCards.getElement());
  };
}
