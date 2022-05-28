import {FilterType} from '../const';

const filter = {
  [FilterType.ALL]: (cards) => cards.filter((card) => card.id),
  [FilterType.WATCHLIST]: (cards) => cards.filter((card) => {
    const { userDetails } = card;
    const { watchlist } = userDetails;
    return watchlist;
  }),
  [FilterType.HISTORY]: (cards) => cards.filter((card) => {
    const { userDetails } = card;
    const { watched } = userDetails;
    return watched;
  }),
  [FilterType.FAVORITES]: (cards) => cards.filter((card) => {
    const { userDetails } = card;
    const { favorite } = userDetails;
    return favorite;
  }),
};

export {filter};
