import { generateFilmCard } from '../mock/data.js';
import { generetIdIndex } from '../utils.js';

const FILM_CARDS_QUANTITY = 30;

export default class CardsModel {

  filmCards = Array.from({ length: FILM_CARDS_QUANTITY }, generateFilmCard).map(generetIdIndex);

  getFilmCards = () => this.filmCards;
}
