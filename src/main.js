import {render} from './render.js';
import UserRankView from './view/user-rank-view.js';
import FilmPresenter from './presenter/film-presenter.js';
import CardsModel from './model/cards-model.js';
import CommentsModel from './model/comments-model.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer__statistics');

const cardsModel = new CardsModel();
const commentsModel = new CommentsModel();
const filmPresenter = new FilmPresenter();

render(new UserRankView(), siteHeaderElement);

filmPresenter.initMain(siteMainElement, cardsModel, commentsModel);
filmPresenter.initFooter(siteFooterElement, cardsModel);
