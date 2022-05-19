import { generateComments } from '../mock/data.js';
import { generetIdIndex } from '../utils.js';

const COMMENTS_QUANTITY = 100;

export default class CommentsModel {

  filmComments = Array.from({ length: COMMENTS_QUANTITY }, generateComments).map(generetIdIndex);

  getFilmComments = () => this.filmComments;
}
