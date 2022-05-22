import FilmPresenter from './presenter/film-presenter.js';
import CardsModel from './model/cards-model.js';
import CommentsModel from './model/comments-model.js';

const siteMainElement = document.querySelector('.main');

const cardsModel = new CardsModel();
const commentsModel = new CommentsModel();
const filmPresenter = new FilmPresenter();

filmPresenter.initMain(siteMainElement, cardsModel, commentsModel);
