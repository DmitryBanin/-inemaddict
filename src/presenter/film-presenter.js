import {render} from '../framework/render.js';
import MainNavigationView from '../view/main-navigation-view.js';
import SortView from '../view/sort-view.js';
import FilmListPresenter from './film-list-presenter.js';
import StatisticsView from '../view/statistics-view.js';
import { genereteCommenatIdInFilmCard } from '../utils.js';
import ListEmptyView from '../view/list-empty-view.js';
import UserRankView from '../view/user-rank-view.js';

const FILM_COMMENTS_QUANTITY = 20;
const siteFooterElement = document.querySelector('.footer__statistics');
const siteHeaderElement = document.querySelector('.header');

export default class FilmPresenter {
  #filmContainer = null;
  #cardsModel = null;
  #commentsModel = null;
  #filmCards = [];
  #filmComments = [];
  #filmListPresenter = new FilmListPresenter();
  #renderCommentsCount = FILM_COMMENTS_QUANTITY;
  #siteHeaderElement = siteHeaderElement;
  #siteFooterElement = siteFooterElement;

  initMain = (filmContainer, cardsModel, commentsModel) => {
    this.#filmContainer = filmContainer;
    this.#cardsModel = cardsModel;
    this.#commentsModel = commentsModel;
    this.#filmCards = [...this.#cardsModel.cards];
    this.#filmComments = [...this.#commentsModel.comments];

    this.filmCardsWithCommentsId = genereteCommenatIdInFilmCard(this.#filmComments, this.#filmCards, this.#renderCommentsCount); // добавляю id комментарии в карточку

    render(new MainNavigationView(), this.#filmContainer);

    render(new StatisticsView(this.#filmCards), this.#siteFooterElement);

    if (!this.#filmCards.length) {
      render(new ListEmptyView(), this.#filmContainer);
    } else {
      render(new SortView(), this.#filmContainer);

      render(new UserRankView(), this.#siteHeaderElement);

      this.#filmListPresenter.initFilmList(this.#filmContainer, this.filmCardsWithCommentsId, this.#filmComments);

    }
  };
}
