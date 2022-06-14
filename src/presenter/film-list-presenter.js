import {render, replace, remove} from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupFilmView from '../view/popup-film-view.js';
import PopupCommentsListView from '../view/popup-comments-list-view.js';
import PopupNewCommentView from '../view/popup-new-comment-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export default class FilmListPresenter {
  #filmListContainer = null;
  #changeData = null;
  #changeMode = null;

  #filmCard = null;
  #commentsList = null;
  #mode = Mode.DEFAULT;

  #filmCardComponent = null;
  #popupFilmCardComponent = null;
  #popupNewCommentComponent = null;

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
    this.#popupNewCommentComponent = new PopupNewCommentView();

    this.#filmCardComponent.setFilmCardClickHandler(this.#openPopupClickHandler);
    this.#popupFilmCardComponent.setPopupClickHandler(this. #closePopupClickHandler);

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

    if (this.#mode === Mode.POPUP) {
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
      this.#openPopupClickHandler();
    }
  };

  #generetCommentsListById = (commentsListElement, comments, filmCommentIds) => {
    comments
      .filter((comment) => filmCommentIds.includes(comment.id))
      .forEach((comment) => {
        const PopupComment = new PopupCommentsListView(comment);
        render(PopupComment, commentsListElement);
      });
  };

  #handleCtrCmdEnterKeydown = (newCommentInput) => {
    const {emotion, comment} = newCommentInput;
    const newCommentData = {
      author: 'new author',
      comment: comment,
      date: new Date(),
      emotion: emotion,
    };
    this.#createCommentsList(newCommentData);
  };

  #renderNewCommentForm = () => {
    render(this.#popupNewCommentComponent, this.#popupFilmCardComponent.newCommentContainer);
    this.#popupNewCommentComponent.setNewCommentEnter(this.#handleCtrCmdEnterKeydown);
  };

  #createCommentsList = (newCommentData) => {
    this.#filmListContainer.appendChild(this.#popupFilmCardComponent.element);
    const filmDetailsCommentsListElement = document.querySelector('.film-details__comments-list');
    filmDetailsCommentsListElement.innerText = '';
    this.#generetCommentsListById(filmDetailsCommentsListElement, newCommentData, this.#filmCard.comments);
  };

  #openPopupClickHandler = () => {
    this.#createCommentsList(this.#commentsList);
    this.#renderNewCommentForm();
    this.#filmListContainer.appendChild(this.#popupFilmCardComponent.element);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #closePopupClickHandler = () => {
    this.#filmListContainer.removeChild(this.#popupFilmCardComponent.element);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);
    document.removeEventListener('keydown', this.#handleCtrCmdEnterKeydown);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopupClickHandler();
    }
  };

  #handleWatchlistClick = () => {
    this.#changeData({ ...this.#filmCard, userDetails: {...this.#filmCard.userDetails, watchlist: !this.#filmCard.userDetails.watchlist} });
  };

  #handleWatchedClick = () => {
    this.#changeData({ ...this.#filmCard, userDetails: {...this.#filmCard.userDetails, watched: !this.#filmCard.userDetails.watched} });
  };

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#filmCard, userDetails: {...this.#filmCard.userDetails, favorite: !this.#filmCard.userDetails.favorite} });
  };
}
