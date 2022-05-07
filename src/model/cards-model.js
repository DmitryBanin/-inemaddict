import {generateFilmCard} from '../mock/film-data.js';

export default class CardsModel {

  filmCards = Array.from({ length: this.FILM_CARDS_QUANTITY }, generateFilmCard);

  getFilmCards = () => this.filmCards;
}
