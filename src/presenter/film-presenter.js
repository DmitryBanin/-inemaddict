
import {render} from '../render.js';
import MainNavigationView from '../view/main-navigation-view.js';
import SortView from '../view/sort-view.js';
import FilmListPresenter from './film-list-presenter.js';
import StatisticsView from '../view/statistics-view.js';
import { genereteCommenatIdInFilmCard } from '../utils.js';

export default class FilmPresenter {
  filmListPresenter = new FilmListPresenter();

  initMain = (filmContainer, cardsModel, commentsModel) => {
    this.filmContainer = filmContainer;
    this.cardsModel = cardsModel;
    this.commentsModel = commentsModel;
    this.filmCards = [...this.cardsModel.getFilmCards()];
    this.filmComments = [...this.commentsModel.getFilmComments()];

    this.filmCardsWithCommentsId = genereteCommenatIdInFilmCard(this.filmComments, this.filmCards, 20); // добавляю id комментариев в карточку

    render(new MainNavigationView(), this.filmContainer);
    render(new SortView(), this.filmContainer);

    this.filmListPresenter.initFilmList(this.filmContainer, this.filmCardsWithCommentsId, this.filmComments);
  };

  initFooter = (filmContainer, cardsModel) => {
    this.filmContainer = filmContainer;
    this.cardsModel = cardsModel;
    this.filmCards = [...this.cardsModel.getFilmCards()];

    render(new StatisticsView(this.filmCards), this.filmContainer);
  };
}
