import {FilterType} from '../const';

const filter = {
  [FilterType.ALL]: (cards) => cards.filter((card) => card.id),
  [FilterType.WATCHLIST]: (cards) => cards.filter((card) => {
    const { userDetails: { watchlist } } = card;
    return watchlist;
  }),
  [FilterType.HISTORY]: (cards) => cards.filter((card) => {
    const { userDetails: { watched } } = card;
    return watched;
  }),
  [FilterType.FAVORITES]: (cards) => cards.filter((card) => {
    const { userDetails: { favorite } } = card;
    return favorite;
  }),
};

export {filter};
