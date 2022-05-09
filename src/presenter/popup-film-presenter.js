import { render } from '../render.js';
import PopupFilmView from '../view/popup-film-view.js';
import PopupCommentView from '../view/popup-comment-view.js';


export default class PopupFilmPresenter {
  showPopup = (popupFilmContainer, filmCards) => {
    this.filmCards = filmCards;
    this.comments = filmCards.comments;
    this.popupFilmView = new PopupFilmView(this.filmCards);

    this.popupFilmContainer = popupFilmContainer;

    render(this.popupFilmView, this.popupFilmContainer);

    this.commentsList = document.querySelector('.film-details__comments-list');

    for (let i = 0; i < this.comments.length; i++) {
      render(new PopupCommentView(this.comments[i]), this.commentsList);
    }
  };
}
