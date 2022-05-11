import { filmCards, filmComments, genereteFilmCard} from '../mock/data.js';

export default class CardsModel {

  filmCards = genereteFilmCard(filmCards, filmComments);

  getFilmCards = () => this.filmCards;
}
