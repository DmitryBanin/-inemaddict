import { render } from '../render.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import PopupFilmView from '../view/popup-film-view.js';
import PopupCommentView from '../view/popup-comment-view.js';

const CARD_COUNT_PER_STEP = 5;

export default class FilmListPresenter {
  #filmListContainer = null;
  #filmCards = null;
  #filmComments = null;
  #renderedCardsCount = CARD_COUNT_PER_STEP;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #buttonShowMoreComponent = new ButtonShowMoreView();

  initFilmList = (filmListContainer, filmCards, filmComments) => {
    this.#filmListContainer = filmListContainer;
    this.#filmCards = filmCards;
    this.#filmComments = filmComments;
    this.commentsId = this.#filmCards.comments;

    render(this.#filmsComponent, this.#filmListContainer);
    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    for (let i = 0; i < Math.min(filmCards.length, CARD_COUNT_PER_STEP); i++) {
      this.#renderCard(this.#filmCards[i], this.#filmsListContainerComponent.element, this.#filmComments);
    }

    if (this.#filmCards.length > CARD_COUNT_PER_STEP) {
      render(this.#buttonShowMoreComponent, this.#filmsListComponent.element);

      this.#buttonShowMoreComponent.element.addEventListener('click', this.#handleButtonShowMoreClick);
    }
  };

  #handleButtonShowMoreClick = (evt) => {
    evt.preventDefault();
    this.#filmCards
      .slice(this.#renderedCardsCount, this.#renderedCardsCount + CARD_COUNT_PER_STEP)
      .forEach((filmCard) => this.#renderCard(filmCard));

    this.#renderedCardsCount += CARD_COUNT_PER_STEP;

    if (this.#renderedCardsCount >= this.#filmCards.length) {
      this.#buttonShowMoreComponent.element.remove();
      this.#buttonShowMoreComponent.removeElement();
    }
  };

  #renderCard = (filmCard, filmCardElement = this.#filmsListContainerComponent.element, filmComments = this.#filmComments) => {
    const filmCardComponent = new FilmCardView(filmCard);
    const popupFilmView = new PopupFilmView(filmCard);
    const commentsId = filmCard.comments;

    const generetCommentsList = (idList, commentsList, filmList) => {
      commentsList.forEach((elementCommnets) => {
        filmList.forEach((elementFilm) => {
          if (elementFilm.id === elementCommnets) {
            render(new PopupCommentView(elementFilm), idList);
          }
        });
      });
    };

    const replacefilmCardToForm = () => {
      filmCardElement.appendChild(popupFilmView.element);
      const commentsIdList = document.querySelector('.film-details__comments-list');
      generetCommentsList(commentsIdList, commentsId, filmComments);
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
        document.body.classList.remove('hide-overflow');
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
