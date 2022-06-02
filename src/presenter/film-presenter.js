import { render, remove } from '../framework/render.js';
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

  constructor(filmContainer, cardsModel, commentsModel) {
    this.#filmContainer = filmContainer;
    this.#cardsModel = cardsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#filmCards = [...this.#cardsModel.cards];
    this.#filmComments = [...this.#commentsModel.comments];
    this.#filmCardsWithCommentsID = genereteCommentIdInFilmCard(this.#filmComments, this.#filmCards, this.#renderCommentCount);
    // console.log(this.#filmCards[0].userDetails.watchlist);
    this.#renderFilmList();
  };

  #handleButtonShowMoreClick = () => {
    this.#renderFilmCards(this.#renderedCardCount, this.#renderedCardCount + CARD_COUNT_PER_STEP);
    this.#renderedCardCount += CARD_COUNT_PER_STEP;

    if (this.#renderedCardCount >= this.#filmCardsWithCommentsID.length) {
      remove(this.#buttonShowMoreComponent);
    }
  };

  #handleFilmCardChange = (updatedFilmCard) => {
    this.#filmCardsWithCommentsID = updateItem(this.#filmCardsWithCommentsID, updatedFilmCard);
    this.#filmPresenter.get(updatedFilmCard.id).init(updatedFilmCard);
  };

  #renderButtonShowMore = () => {
    render(this.#buttonShowMoreComponent, this.#filmsListComponent.element);

    this.#buttonShowMoreComponent.setClickHandler(this.#handleButtonShowMoreClick);
  };

  #renderListEmpty = () => {
    render(this.#listEmptyComponent, this.#filmsComponent.element);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#filmsComponent.element);
  };

  #renderUserRank = () => {
    render(this.#userRankComponent, this.#siteHeaderElement);
  };

  #renderStatistics = () => {
    render(new StatisticsView(this.#filmCardsWithCommentsID), this.#siteFooterElement);
  };

  #renderFilmCard = (filmCard) => {
    const filmListPresenter = new FilmListPresenter(this.#filmsListContainerComponent.element, this.#filmComments, this.#handleFilmCardChange);
    filmListPresenter.init(filmCard);
    this.#filmPresenter.set(filmCard.id, filmListPresenter);
  };

  #renderFilmCards = (from, to) => {
    this.#filmCardsWithCommentsID
      .slice(from, to)
      .forEach((filmCard) => this.#renderFilmCard(filmCard));
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
