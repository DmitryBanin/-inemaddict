import {render, replace, remove} from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupFilmView from '../view/popup-film-view.js';
import PopupCommentsListView from '../view/comments-list-view.js';
import PopupNewCommentView from '../view/new-comment-view.js';

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

    replace(this.#filmCardComponent, prevFilmCardComponent);
    replace(this.#popupFilmCardComponent, prevPopupFilmCardComponent);

    this.#renderComments(this.#commentsList);
    this.#renderNewCommentForm();
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

  #generetCommentsListById = (commentsList) => {
    const commentFin = [];
    commentsList
      .filter((comment) => this.#filmCard.comments.includes(comment.id))
      .map((comment) => { commentFin.push(comment); });
    return commentFin;
  };

  #handleCtrCmdEnterKeydown = (evt, newCommentInput) => {
    const {emotion, comment} = newCommentInput;
    const newCommentData = {
      author: 'new author',
      comment: comment,
      date: new Date(),
      emotion: emotion,
    };
    this.#renderComment(newCommentData);
  };

  #renderNewCommentForm = () => {
    render(this.#popupNewCommentComponent, this.#popupFilmCardComponent.newCommentContainer);
    this.#popupNewCommentComponent.setNewCommentEnter(this.#handleCtrCmdEnterKeydown);
  };

  #renderComments = (filmCommentsData) => {
    const commentsInFilm = this.#generetCommentsListById(filmCommentsData);
    commentsInFilm.forEach((filmComment) => {
      this.#renderComment(filmComment);});
  };

  #renderComment = (filmComment) => {
    render(new PopupCommentsListView(filmComment), this.#popupFilmCardComponent.commentsContainer);
  };

  #openPopupClickHandler = () => {
    this.#filmListContainer.appendChild(this.#popupFilmCardComponent.element);
    document.body.classList.add('hide-overflow');
    this. #renderComments(this.#commentsList);
    this.#renderNewCommentForm();
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.POPUP;
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
