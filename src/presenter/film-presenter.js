
import {render} from '../render.js';
import MainNavigationView from '../view/main-navigation-view.js';
import SortView from '../view/sort-view.js';
import FilmListPresenter from './film-list-presenter.js';
import StatisticsView from '../view/statistics-view.js';
import { genereteCommenatIdInFilmCard } from '../utils.js';

export default class FilmPresenter {
  #filmContainer = null;
  #cardsModel = null;
  #commentsModel = null;
  #filmCards = [];
  #filmComments = [];
  #filmListPresenter = new FilmListPresenter();
  #FILM_COMMENTS_QUANTITY = 20;

  initMain = (filmContainer, cardsModel, commentsModel) => {
    this.#filmContainer = filmContainer;
    this.#cardsModel = cardsModel;
    this.#commentsModel = commentsModel;
    this.#filmCards = [...this.#cardsModel.cards];
    this.#filmComments = [...this.#commentsModel.comments];

    this.filmCardsWithCommentsId = genereteCommenatIdInFilmCard(this.#filmComments, this.#filmCards, this.#FILM_COMMENTS_QUANTITY); // добавляю id комментарии в карточку

    render(new MainNavigationView(), this.#filmContainer);
    render(new SortView(), this.#filmContainer);

    this.#filmListPresenter.initFilmList(this.#filmContainer, this.filmCardsWithCommentsId, this.#filmComments);
  };

  initFooter = (filmContainer, cardsModel) => {
    this.#filmContainer = filmContainer;
    this.#cardsModel = cardsModel;
    this.#filmCards = [...this.#cardsModel.cards];

    render(new StatisticsView(this.#filmCards), this.#filmContainer);
  };
}
