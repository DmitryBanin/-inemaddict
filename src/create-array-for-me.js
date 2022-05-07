import { generateComment, generateFilmCard } from './mock/data.js';

const cards = Array.from({ length: 3 }, generateFilmCard);
console.log(cards);

// export default class TasksModel {
//   tasks = Array.from({length: 3}, generateFilmCard);

//   getTasks = () => this.tasks;
// }
