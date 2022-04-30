import {render} from './render.js';
import UserRankView from './view/user-rank-view.js';
import MainNavigationView from './view/main-navigation-view.js';
import SortView from './view/sort-view.js';
import StatisticsView from './view/statistics-view.js';
import FilmPresenter from './presenter/film-presenter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer__statistics');
const filmPresenter = new FilmPresenter();

render(new UserRankView(), siteHeaderElement);
render(new MainNavigationView(), siteMainElement);
render(new SortView(), siteMainElement);
render(new StatisticsView(), siteFooterElement);

filmPresenter.init(siteMainElement);
