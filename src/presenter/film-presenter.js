
import {render} from '../render.js';
import MainNavigationView from '../view/main-navigation-view.js';
import SortView from '../view/sort-view.js';
import FilmListPresenter from './film-list-presenter.js';

export default class FilmPresenter {
  filmListPresenter = new FilmListPresenter();

  init = (filmContainer, cardsModel) => {
    this.filmContainer = filmContainer;
    this.cardsModel = cardsModel;

    render(new MainNavigationView(), this.filmContainer);
    render(new SortView(), this.filmContainer);

    this.filmListPresenter.filmList(this.filmContainer, this.cardsModel);
  };
}
