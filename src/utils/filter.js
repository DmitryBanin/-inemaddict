import {FilterType} from '../const';

const filter = {
  [FilterType.ALL]: (cards) => cards.filter((card) => card.id),
  [FilterType.WATCHLIST]: (cards) => cards.filter((card) => card.userDetails.watchlist),
  [FilterType.HISTORY]: (cards) => cards.filter((card) => card.userDetails.watched),
  [FilterType.FAVORITES]: (cards) => cards.filter((card) => card.userDetails.favorite),
};

export {filter};
