import { createElement } from '../render.js';
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

export default class PopupCommentView {
  #element = null;
  #comments = null;

  constructor(comments) {
    this.#comments = comments;
  }

  get template() {
    return createPopupCommentTemplate(this.#comments);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}


