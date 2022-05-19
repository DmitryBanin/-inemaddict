import { render } from '../render.js';
import PopupFilmView from '../view/popup-film-view.js';
import PopupCommentView from '../view/popup-comment-view.js';


export default class PopupFilmPresenter {
  showPopup = (popupFilmContainer, filmCard, filmComments) => {
    this.filmCard = filmCard;
    this.commentsId = filmCard.comments;
    this.filmComments = filmComments;
    this.popupFilmView = new PopupFilmView(this.filmCard);

    this.popupFilmContainer = popupFilmContainer;

    render(this.popupFilmView, this.popupFilmContainer);

    this.commentsIdList = document.querySelector('.film-details__comments-list');

    for (let i = 0; i < this.commentsId.length; i++) {
      for (let j = 0; j < this.filmComments.length; j++) {
        if (this.filmComments[j].id === this.commentsId[i]) {
          render(new PopupCommentView(this.filmComments[j]), this.commentsIdList);
        }
      }
    }
  };
}
