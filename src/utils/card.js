import dayjs from 'dayjs';

// Функция помещает задачи без даты в конце списка,
// возвращая нужный вес для колбэка sort
const getWeightForNullValue = (valueA, valueB) => {
  // проверка на наличие null?
  if (valueA === null && valueB === null) {
    return 0;
  }

  if (valueA === null) {
    return 1;
  }

  if (valueB === null) {
    return -1;
  }

  return null;
};

export const sortReleaseDate = (filmCardA, filmCardB) => {
  const weight = getWeightForNullValue(filmCardA.filmInfo.release.date, filmCardB.filmInfo.release.date);
  return weight ?? dayjs(filmCardB.filmInfo.release.date).format('YYYY') - dayjs(filmCardA.filmInfo.release.date).format('YYYY');

};

export const sortFilmRating = (filmCardA, filmCardB) => {
  const weight = getWeightForNullValue(filmCardA.filmInfo.totalRating, filmCardB.filmInfo.totalRating);
  return weight ?? filmCardB.filmInfo.totalRating - filmCardA.filmInfo.totalRating;
};
