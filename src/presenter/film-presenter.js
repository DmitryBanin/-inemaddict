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

const FILM_COMMENT_QUANTITY = 20;
const CARD_COUNT_PER_STEP = 5;
const siteFooterElement = document.querySelector('.footer__statistics');
const siteHeaderElement = document.querySelector('.header');

export default class FilmPresenter {
  #filmContainer = null;
  #cardsModel = null;
  #commentsModel = null;
  #filmsData = null;

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
  #sourcedFilmsData = [];
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
    this.#filmsData = [...this.#filmCardsgenereted];
    this.#sourcedFilmsData = [...this.#filmCardsgenereted];
    this.#renderComponents();
  };

  #handleButtonShowMore = () => {
    this.#renderFilmCards(this.#renderedCardCount, this.#renderedCardCount + CARD_COUNT_PER_STEP);
    this.#renderedCardCount += CARD_COUNT_PER_STEP;

    if (this.#renderedCardCount >= this.#filmsData.length) {
      this.#buttonShowMoreComponent.destroy();
    }
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleFilmCardChange = (updatedFilmCard) => {
    this.#filmsData = updateItem(this.#filmsData, updatedFilmCard);
    this.#sourcedFilmsData = updateItem(this.#sourcedFilmsData, updatedFilmCard);
    this.#filmPresenter.get(updatedFilmCard.id).init(updatedFilmCard);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#sortFilmCards(sortType);
    this.#clearCardList();
    this.#renderCardList();
  };

  #sortFilmCards = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#filmsData.sort(sortReleaseDate);
        break;
      case SortType.RATING:
        this.#filmsData.sort(sortFilmRating);
        break;
      default:
        this.#filmsData = [...this.#sourcedFilmsData];
    }
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
    render(new StatisticsView(this.#filmsData), this.#siteFooterElement);
  };

  #renderFilmCard = (data) => {
    const filmListPresenter = new FilmListPresenter(this.#filmsListContainerComponent.element, this.#filmComments, this.#handleFilmCardChange, this.#handleModeChange);
    filmListPresenter.init(data);
    this.#filmPresenter.set(data.id, filmListPresenter);
  };

  #renderFilmCards = (from, to) => {
    this.#filmsData
      .slice(from, to)
      .forEach((data) => this.#renderFilmCard(data));
  };

  #renderButtonShowMore = () => {
    render(this.#buttonShowMoreComponent, this.#filmsListComponent.element);
    this.#buttonShowMoreComponent.setClickHandler(this.#handleButtonShowMore);
  };

  #clearCardList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedCardCount = CARD_COUNT_PER_STEP;
    remove(this.#buttonShowMoreComponent);
  };

  #renderCardList = () => {
    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    this.#renderFilmCards(0, Math.min(this.#filmsData.length, CARD_COUNT_PER_STEP));

    if (this.#filmsData.length > CARD_COUNT_PER_STEP) {
      this.#renderButtonShowMore();
    }
  };

  #renderComponents = () => {
    render(this.#filmsComponent, this.#filmContainer);

    if (!this.#filmsData.length) {
      this.#renderListEmpty();
      return;
    }

    this.#renderSort();
    this.#renderUserRank();
    this.#renderStatistics();
    this.#renderCardList();

  };
}
