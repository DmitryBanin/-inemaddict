import {render, replace, remove} from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupFilmView from '../view/popup-film-view.js';
import PopupCommentView from '../view/popup-comment-view.js';

export default class FilmListPresenter {
  #filmListContainer = null;

  #filmCards = null;
  #commentsList = null;
  #filmCardComponent = null;
  #popupFilmCardComponent = null;

  constructor(filmListContainer, commentsList) {
    this.#filmListContainer = filmListContainer;
    this.#commentsList = commentsList;
  }

  init = (filmCard) => {
    this.#filmCards = filmCard;

    const prevFilmCardComponent = this.#filmCardComponent;
    const prevPopupFilmCardComponent = this.#popupFilmCardComponent;

    this.#filmCardComponent = new FilmCardView(filmCard);
    this.#popupFilmCardComponent = new PopupFilmView(filmCard);

    this.#filmCardComponent.setFilmCardClickHandler(this.#handleFilmCardClick);
    this.#popupFilmCardComponent.setClosePopupHandler(this.#handleClosePopup);

    // this.#filmCardComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    // this.#filmCardComponent.setWatchedClickHandler(this.#handleWatchedClick);
    // this.#filmCardComponent.setFavoriteClickHandler(this.#handleFavoriteClick);


    if (prevFilmCardComponent === null || prevPopupFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#filmListContainer);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#filmListContainer.element.contains(prevFilmCardComponent.element)) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    if (this.#filmListContainer.element.contains(prevPopupFilmCardComponent.element)) {
      replace(this.#popupFilmCardComponent, prevPopupFilmCardComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevPopupFilmCardComponent);
  };

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#popupFilmCardComponent);
  };


  #generetCommentsList = (commentsComponent, commentsList, filmList) => {
    commentsList.forEach((elementComments) => {
      filmList.forEach((elementFilm) => {
        if (elementFilm === elementComments.id) {
          const PopupComment = new PopupCommentView(elementComments);
          render(PopupComment, commentsComponent);
        }
      });
    });
  };

  #setFilmDetails = () => {
    this.#filmListContainer.appendChild(this.#popupFilmCardComponent.element);
    const commentsList = document.querySelector('.film-details__comments-list');
    this.#generetCommentsList(commentsList, this.#commentsList, this.#filmCards.comments);
  };

  #removeFilmDetails = () => {
    this.#filmListContainer.removeChild(this.#popupFilmCardComponent.element);
  };

  #setFilmCardClickHandler = () => {
    this.#setFilmDetails();
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #setPopupClickHandler = () => {
    this.#removeFilmDetails();
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeFilmDetails();
      document.removeEventListener('keydown', this.#onEscKeyDown);
      document.addEventListener('keydown', this.#onEscKeyDown);
      document.body.classList.remove('hide-overflow');
      remove();
    }
  };

  #handleFilmCardClick = () => {
    this.#setFilmCardClickHandler();
  };

  #handleClosePopup = () => {
    this.#setPopupClickHandler();
  };
}
