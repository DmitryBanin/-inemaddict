import { createElement } from '../render.js';
import dayjs from 'dayjs';
import { getTimeFromMins } from '../utils.js';

const createFilmCardTemplate = (filmcard) => {
  const { filmInfo, userDetails, comments } = filmcard;
  const { release, title, poster, totalRating, genre, description, runTime } = filmInfo;
  const { date } = release;
  const durationFormat = getTimeFromMins(runTime);
  const yearFormat = dayjs(date).format('YYYY');
  const { watchlist, watched, favorite } = userDetails;
  const watchlistSelect = watchlist ? ' ' : 'film-card__controls-item--active';
  const watchedSelect = watched ? ' ' : 'film-card__controls-item--active';
  const favoriteSelect = favorite ? ' ' : 'film-card__controls-item--active';
  const commentsSelect = comments.length;
  const getDescription = (count) => {
    if (count.length > 139) {
      return `${count.slice(0, 139)}...`;
    }
    return count;
  };
  const descriptionSelect = getDescription(description);

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${yearFormat}</span>
          <span class="film-card__duration">${durationFormat}</span>
          <span class="film-card__genre">${genre}</span>
        </p>
        <img src="${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${descriptionSelect}</p>
        <span class="film-card__comments">${commentsSelect} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistSelect}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedSelect}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteSelect}" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export default class FilmCardView {
  constructor(filmCard) {
    this.filmCard = filmCard;
  }

  getTemplate() {
    return createFilmCardTemplate(this.filmCard);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
