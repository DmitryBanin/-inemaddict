import {generateFilmCard, generateComment} from '../mock/film-data.js';
import {generetIdIndex, generetCommentsCard} from '../utils.js';

export default class CardsModel {
  FILM_CARDS_QUANTITY = 30;
  COMMENTS_QUANTITY = 100;
  FILM_COMMENTS_QUANTITY = 20;

  getCards = () => {
    const cards = Array.from({ length: this.FILM_CARDS_QUANTITY }, generateFilmCard);
    const comments = Array.from({ length: this.COMMENTS_QUANTITY }, generateComment);
    cards.map(generetIdIndex);
    comments.map(generetIdIndex);
    cards.map((element) => generetCommentsCard (element, comments, this.COMMENTS_QUANTITY));
    return cards;
  };

  getFilmCards = () => this.getCards();
}
