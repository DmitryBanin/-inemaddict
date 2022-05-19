import { render } from '../render.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import PopupFilmView from '../view/popup-film-view.js';
import PopupCommentView from '../view/popup-comment-view.js';

export default class FilmListPresenter {
  #filmListContainer = null;
  #filmCards = null;
  #filmComments = null;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();

  initFilmList = (filmListContainer, filmCardsModel, filmCommentsModel) => {
    this.#filmListContainer = filmListContainer;
    this.#filmCards = filmCardsModel;
    this.#filmComments = filmCommentsModel;
    this.commentsId = this.#filmCards.comments;

    render(this.#filmsComponent, this.#filmListContainer);
    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    for (let i = 0; i < this.#filmCards.length; i++) {
      this.#renderCard(this.#filmCards[i], this.#filmsListContainerComponent.element, this.#filmComments);
    }

    render(new ButtonShowMoreView(), this.#filmsListComponent.element);
  };

  #renderCard = (filmCard, filmCardElement, filmComments) => {
    const filmCardComponent = new FilmCardView(filmCard);
    const popupFilmView = new PopupFilmView(filmCard);
    const commentsId = filmCard.comments;

    const generetCommentsList = (list) => {
      for (let i = 0; i < commentsId.length; i++) {
        for (let j = 0; j < filmComments.length; j++) {
          if (filmComments[j].id === commentsId[i]) {
            render(new PopupCommentView(filmComments[j]), list);
          }
        }
      }
    };

    const replacefilmCardToForm = () => {
      filmCardElement.appendChild(popupFilmView.element);
      const commentsIdList = document.querySelector('.film-details__comments-list');
      generetCommentsList(commentsIdList);
    };

    const replaceFormTofilmCard = () => {
      filmCardElement.removeChild(popupFilmView.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormTofilmCard();
        document.removeEventListener('keydown', onEscKeyDown);
        document.addEventListener('keydown', onEscKeyDown);
      }
    };

    filmCardComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      replacefilmCardToForm();
      document.body.classList.add('hide-overflow');
      document.addEventListener('keydown', onEscKeyDown);
    });

    popupFilmView.element.querySelector('.film-details__close-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceFormTofilmCard();
      document.body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(filmCardComponent, filmCardElement);
  };

}
