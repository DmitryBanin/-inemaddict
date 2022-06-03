import {render} from './framework/render.js';
import FilmPresenter from './presenter/film-presenter.js';
import CardsModel from './model/cards-model.js';
import CommentsModel from './model/comments-model.js';
import { generateFilter } from './mock/generate-filter.js';
import MainNavigationView from './view/main-navigation-view.js';

const siteMainElement = document.querySelector('.main');

const cardsModel = new CardsModel();
const commentsModel = new CommentsModel();
const filmPresenter = new FilmPresenter(siteMainElement, cardsModel, commentsModel);

const filters = generateFilter(cardsModel.cards);

render(new MainNavigationView(filters), siteMainElement);

filmPresenter.init();
