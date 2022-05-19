import { generateComments } from '../mock/data.js';
import { generetIdIndex } from '../utils.js';

const COMMENTS_QUANTITY = 100;

export default class CommentsModel {

  #comments = Array.from({ length: COMMENTS_QUANTITY }, generateComments).map(generetIdIndex);

  get comments() {
    return this.#comments;
  }
}
