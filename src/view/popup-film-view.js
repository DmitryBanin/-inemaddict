import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';
import { getTimeFromMins } from '../utils/time.js';

const createPopupFilmTemplate = (filmcard) => {
  const { filmInfo, userDetails, comments } = filmcard;
  const { title, alternativeTitle, poster, totalRating, director, writers, genre, description, runTime, ageRating, actors } = filmInfo;
  const { release } = filmInfo;
  const { date, country } = release;
  const formatedDatePopup = dayjs(date).format('DD MMMM YYYY');
  const durationFormat = getTimeFromMins(runTime);
  const { watchlist, watched, favorite } = userDetails;
  const watchlistSelect = watchlist ? ' ' : 'film-details__control-button--active';
  const alreadyWatchedSelect = watched ? ' ' : 'film-details__control-button--active';
  const favoriteSelect = favorite ? ' ' : 'film-details__control-button--active';
  const commentsCount = comments.length;

  const endName = (element) => element.length === 1 ? ' ' : 's';

  const createGenreList = () => {
    const genresList = [];
    for (const element of genre) {
      genresList.push(`<span class="film-details__genre">${element}</span>`);
    }
    return genresList.join('\n');
  };

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>

          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">
              <p class="film-details__age">${ageRating}+</p>
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writer${endName(writers)}</td>
                  <td class="film-details__cell">${writers.join(', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actor${endName(actors)}</td>
                  <td class="film-details__cell">${actors.join(', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formatedDatePopup}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${durationFormat}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genre${endName(genre)}</td>
                  <td class="film-details__cell">
                  ${createGenreList()}
              </table>

              <p class="film-details__film-description">
              ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <button type="button" class="film-details__control-button
            ${watchlistSelect}
            film-details__control-button--watchlist"
            id="watchlist"
            name="watchlist">Add to watchlist</button>
            <button type="button" class="film-details__control-button
            ${alreadyWatchedSelect}
            film-details__control-button--watched"
            id="watched" name="watched" >Already watched</button>
            <button type="button"
            class="film-details__control-button
            ${favoriteSelect}
            film-details__control-button--favorite"
            id="favorite" name="favorite">Add to favorites</button>
          </section>
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

            <ul class="film-details__comments-list">

            <!-- popup-comments-list-view -->

            </ul>

            <!-- popup-new-comment-view -->

          </section>
        </div>
      </form>
    </section>`
  );
};

export default class PopupFilmView extends AbstractView {
  #filmCard = null;

  constructor(filmCard) {
    super();
    this.#filmCard = filmCard;
  }

  get template() {
    return createPopupFilmTemplate(this.#filmCard);
  }

  get commentsContainer() {
    return this.element.querySelector('.film-details__comments-list');
  }

  get newCommentContainer() {
    return this.element.querySelector('.film-details__comments-wrap');
  }

  setPopupClickHandler = (callback) => {
    this._callback.closeButtonClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#popupClickHandler);
  };

  setPopupWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistClickHandler);
  };

  setPopupWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#watchedClickHandler);
  };

  setPopupFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #popupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeButtonClick();
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick(this.#filmCard);
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick(this.#filmCard);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick(this.#filmCard);
  };
}
