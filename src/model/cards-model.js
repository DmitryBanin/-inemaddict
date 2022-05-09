import { generateFilmCard } from '../mock/film-data.js';

const FILM_CARDS_QUANTITY = 30;

export default class CardsModel {

  filmCards = Array.from({ length: FILM_CARDS_QUANTITY }, generateFilmCard);

  getFilmCards = () => this.filmCards;
}
