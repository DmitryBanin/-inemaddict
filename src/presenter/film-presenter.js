import { render, remove, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import FilmListPresenter from './film-list-presenter.js';
import StatisticsView from '../view/statistics-view.js';
import { genereteCommentIdInFilmCard, updateItem } from '../utils/utils.js';
import ListEmptyView from '../view/list-empty-view.js';
import UserRankView from '../view/user-rank-view.js';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import { sortReleaseDate, sortFilmRating } from '../utils/card.js';
import { SortType } from '../const.js';
import dayjs from 'dayjs';

const FILM_COMMENT_QUANTITY = 20;
const CARD_COUNT_PER_STEP = 5;
const siteFooterElement = document.querySelector('.footer__statistics');
const siteHeaderElement = document.querySelector('.header');

export default class FilmPresenter {
  #filmContainer = null;
  #cardsModel = null;
  #commentsModel = null;
  #filmCardsWithCommentsID = null;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #listEmptyComponent = new ListEmptyView();
  #sortComponent = new SortView();
  #userRankComponent = new UserRankView();
  #buttonShowMoreComponent = new ButtonShowMoreView();

  #siteHeaderElement = siteHeaderElement;
  #siteFooterElement = siteFooterElement;

  #filmCards = [];
  #filmComments = [];
  #renderedCardCount = CARD_COUNT_PER_STEP;
  #renderCommentCount = FILM_COMMENT_QUANTITY;
  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedFilmCards = [];
  #filmCardsgenereted = [];

  constructor(filmContainer, cardsModel, commentsModel) {
    this.#filmContainer = filmContainer;
    this.#cardsModel = cardsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#filmCards = [...this.#cardsModel.cards];
    this.#filmComments = [...this.#commentsModel.comments];
    this.#filmCardsgenereted = genereteCommentIdInFilmCard(this.#filmComments, this.#filmCards, this.#renderCommentCount);
    this.#filmCardsWithCommentsID = [...this.#filmCardsgenereted];
    // 1. В отличии от сортировки по любому параметру,
    // исходный порядок можно сохранить только одним способом -
    // сохранив исходный массив:
    this.#sourcedFilmCards = [...this.#filmCardsgenereted];

    this.#renderFilmList();
  };

  #getWeightForNullValue = (valueA, valueB) => {
    // проверка на наличие null?
    if (valueA === null && valueB === null) {
      return 0;
    }

    if (valueA === null) {
      return 1;
    }

    if (valueB === null) {
      return -1;
    }

    return null;
  };

  #handleButtonShowMoreClick = () => {
    this.#renderFilmCards(this.#renderedCardCount, this.#renderedCardCount + CARD_COUNT_PER_STEP);
    this.#renderedCardCount += CARD_COUNT_PER_STEP;

    if (this.#renderedCardCount >= this.#filmCardsWithCommentsID.length) {
      remove(this.#buttonShowMoreComponent);
    }
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleFilmCardChange = (updatedFilmCard) => {
    this.#filmCardsWithCommentsID = updateItem(this.#filmCardsWithCommentsID, updatedFilmCard);
    this.#sourcedFilmCards = updateItem(this.#sourcedFilmCards, updatedFilmCard);
    this.#filmPresenter.get(updatedFilmCard.id).init(updatedFilmCard);
  };

  #sortFilmCards = (sortType) => {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardTasks
    switch (sortType) {
      case SortType.DATE:
        this.#filmCardsWithCommentsID.sort(sortReleaseDate);
        break;
      case SortType.RATING:
        this.#filmCardsWithCommentsID.sort(sortFilmRating);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this.#filmCardsWithCommentsID = [...this.#sourcedFilmCards];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilmCards(sortType);
    this.#clearFilmCardList();
    this.#renderFilmCard();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#filmsComponent.element, RenderPosition.BEFOREBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderListEmpty = () => {
    render(this.#listEmptyComponent, this.#filmsComponent.element);
  };

  #renderUserRank = () => {
    render(this.#userRankComponent, this.#siteHeaderElement);
  };

  #renderStatistics = () => {
    render(new StatisticsView(this.#filmCardsWithCommentsID), this.#siteFooterElement);
  };

  #renderFilmCard = (filmCard) => {
    const filmListPresenter = new FilmListPresenter(this.#filmsListContainerComponent.element, this.#filmComments, this.#handleFilmCardChange, this.#handleModeChange);
    filmListPresenter.init(filmCard);
    this.#filmPresenter.set(filmCard.id, filmListPresenter);
  };

  #renderFilmCards = (from, to) => {
    this.#filmCardsWithCommentsID
      .slice(from, to)
      .forEach((filmCard) => this.#renderFilmCard(filmCard));
  };

  #renderButtonShowMore = () => {
    render(this.#buttonShowMoreComponent, this.#filmsListComponent.element);
    this.#buttonShowMoreComponent.setClickHandler(this.#handleButtonShowMoreClick);
  };

  #clearFilmCardList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedCardCount = CARD_COUNT_PER_STEP;
    remove(this.#buttonShowMoreComponent);
  };

  #renderFilmCardList = () => {
    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    this.#renderFilmCards(0, Math.min(this.#filmCardsWithCommentsID.length, CARD_COUNT_PER_STEP));

    if (this.#filmCardsWithCommentsID.length > CARD_COUNT_PER_STEP) {
      this.#renderButtonShowMore();
    }
  };

  #renderFilmList = () => {
    render(this.#filmsComponent, this.#filmContainer);

    if (!this.#filmCardsWithCommentsID.length) {
      this.#renderListEmpty();
    } else {
      this. #renderSort();

      this.#renderUserRank();
      this.#renderStatistics();
      this.#renderFilmCardList();
    }
  };
}
