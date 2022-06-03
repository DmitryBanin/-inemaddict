import {render, replace, remove} from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupFilmView from '../view/popup-film-view.js';
import PopupCommentView from '../view/popup-comment-view.js';

const Mode = { // !!!
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class FilmListPresenter {
  #filmListContainer = null;
  #changeData = null;
  #changeMode = null;

  #filmCard = null;
  #commentsList = null;
  #mode = Mode.DEFAULT; // !!!

  #filmCardComponent = null;
  #popupFilmCardComponent = null;

  constructor(filmListContainer, commentsList, changeData, changeMode) {
    this.#filmListContainer = filmListContainer;
    this.#commentsList = commentsList;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (filmCard) => {
    this.#filmCard = filmCard;

    const prevFilmCardComponent = this.#filmCardComponent;
    const prevPopupFilmCardComponent = this.#popupFilmCardComponent;

    this.#filmCardComponent = new FilmCardView(filmCard);
    this.#popupFilmCardComponent = new PopupFilmView(filmCard);

    this.#filmCardComponent.setFilmCardClickHandler(this.#handleFilmCardClick);
    this.#popupFilmCardComponent.setPopupClickHandler(this.#handlePopupCloseButton);

    this.#filmCardComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmCardComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#filmCardComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#popupFilmCardComponent.setPopupWatchlistClickHandler(this.#handleWatchlistClick);
    this.#popupFilmCardComponent.setPopupWatchedClickHandler(this.#handleWatchedClick);
    this.#popupFilmCardComponent.setPopupFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevFilmCardComponent === null || prevPopupFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#filmListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#popupFilmCardComponent, prevPopupFilmCardComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevPopupFilmCardComponent);
  };

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#popupFilmCardComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFilmCardClickHandler();
    }
  };

  #generetCommentsList = (commentsListElement, comments, filmCommentIds) => {
    comments
      .filter((comment) => filmCommentIds.includes(comment.id))
      .forEach((comment) => {
        const PopupComment = new PopupCommentView(comment);
        render(PopupComment, commentsListElement);
      });
  };

  #genereteFilmDetailsCommentsList = () => {
    this.#filmListContainer.appendChild(this.#popupFilmCardComponent.element);
    const commentsListElement = document.querySelector('.film-details__comments-list');
    commentsListElement.innerText = '';
    this.#generetCommentsList(commentsListElement, this.#commentsList, this.#filmCard.comments);
  };

  #replaceFilmCardClickHandler = () => {
    this.#genereteFilmDetailsCommentsList();
    this.#filmListContainer.appendChild(this.#popupFilmCardComponent.element);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replacePopupCloseButtonClickHandler = () => {
    this.#filmListContainer.removeChild(this.#popupFilmCardComponent.element);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replacePopupCloseButtonClickHandler();
      document.body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handleFilmCardClick = () => {
    this.#replaceFilmCardClickHandler();
  };

  #handleWatchlistClick = () => {

    // const copy = JSON.parse(JSON.stringify(this.#filmCard));
    // copy.userDetails.watchlist =!copy.userDetails.watchlist;
    // this.#changeData(copy);

    this.#changeData({ ...this.#filmCard, userDetails: {...this.#filmCard.userDetails, watchlist: !this.#filmCard.userDetails.watchlist} });

  };

  #handleWatchedClick = () => {
    this.#changeData({ ...this.#filmCard, userDetails: {...this.#filmCard.userDetails, watched: !this.#filmCard.userDetails.watched} });
  };

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#filmCard, userDetails: {...this.#filmCard.userDetails, favorite: !this.#filmCard.userDetails.favorite} });
  };

  #handlePopupCloseButton = () => {
    this.#replacePopupCloseButtonClickHandler();
  };
}
