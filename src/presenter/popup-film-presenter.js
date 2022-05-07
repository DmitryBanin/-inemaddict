import { render } from '../render.js';
import PopupFilmView from '../view/popup-film-view.js';
import PopupCommentView from '../view/popup-comment-view.js';

const NUMBER_OF_COMMENTS = 4;

export default class PopupFilmPresenter {
  popupFilmView = new PopupFilmView();

  popupFilm = (popupFilmContainer) => {
    this.popupFilmContainer = popupFilmContainer;

    render(this.popupFilmView, this.popupFilmContainer);

    this.commentsList = document.querySelector('.film-details__comments-list');

    for (let i = 0; i < NUMBER_OF_COMMENTS; i++) {
      render(new PopupCommentView(), this.commentsList);
    }

  };
}
