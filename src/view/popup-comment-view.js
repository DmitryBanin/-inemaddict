import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';

const createPopupCommentTemplate = (comments) => {
  const { author, comment, date, emotion } = comments;
  const commentDay = dayjs(date).format('YYYY/MM/DD HH:mm');

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${commentDay}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export default class PopupCommentView extends AbstractView {
  #comments = null;

  constructor(comments) {
    super();
    this.#comments = comments;
  }

  get template() {
    return createPopupCommentTemplate(this.#comments);
  }

  setPopupClicHandler = (callback) => {
    this._callback.formClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#popupHandler);
  };

  #popupHandler = (evt) => {
    evt.preventDefault();
    this._callback.formClick();
  };
}


