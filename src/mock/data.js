
import {getRandomInteger, getRandomFloat, getRandomElement, getRandomIndexFromList, getRandomDate} from '../utils/utils.js';

const filmTitles = [
  'Popeye the Sailor Meets Sindbad the Sailor',
  'Sagebrush Trail',
  'The Dance of Life',
  'The Man with the Golden Arm',
  'The Great Flamarion',
  'Santa Claus Conquers the Martians',
  'Made for Each Other',
];

const alternativeTitles = [
  'Popeye the Sailor Meets Sindbad the Sailor',
  'Sagebrush Trail',
  'The Dance of Life',
  'The Man with the Golden Arm',
  'The Great Flamarion',
  'Santa Claus Conquers the Martians',
  'Made for Each Other',
];

const posters = [
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-dance-of-life.jpg',
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-man-with-the-golden-arm.jpg',
];

const directors = ['Tom Ford', 'Брайан Де Пальма', 'Квентин Тарантино', 'Джеймс Кэмерон', 'Люк Бессон', 'Джон Ву'];

const writers = ['Пол Шредер', 'Джадд Апатоу', 'Стивен Чбоски', 'Джеймс Айвори', 'София Коппола', 'Чезаре Дзаваттини', 'Стэнли Кубрик'];

const actors = ['Пол Шредер', 'Джадд Апатоу', 'Морган Фриман', 'Харрисон Форд', 'Роберт Де Ниро', 'Хлоя Грейс Морец', 'Николас Кейдж'];

const runTimes = [
  77, 16, 54, 115, 119, 81, 92,
];

const genres = [
  'Cartoon', 'Comedy', 'Western', 'Musical', 'Drama', 'Mystery', 'Film-Noir',
];

const countries = ['Finland', 'UK', 'USA', 'Norway', 'Germany'];

const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Sed sed nisi sed augue convallis suscipit in sed felis. Convallis sed finibus eget, sollicitudin eget ante.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus. Aliquam id orci ut lectus varius viverra.',
];

const authores = ['Игорь', 'Ганс', 'Троянда', 'Юлия', 'Алексей', 'Вадим', 'Клариса'];

const comments = [
  'Отличный мультфильм, про жизнь в другие времена.',
  'Очень динамичный, светлый, добрый мультфильм!',
  'Я уж думал, что и этот фильм меня разочарует... Как же хорошо, что это не так!',
  'Фильм полнейшее дно!!!',
  'Так себе фильмец. предыдущие части франшизы были лучше.',
  'Не сказать что он плох, но почему-то я ожидал большего от концовки.',
  'Актёрский состав неплохой. Играют качественно.',
  'Играют качественно.',
  'Сюжет - страшилка уровня второго класса.',
];

const emotions = ['smile', 'sleeping', 'puke', 'angry'];

const startDate = '2019-01-01T00:00:00.000Z';
const endDate = '2022-01-01T00:00:00.000Z';

const MIN_ACTORS_COUNT = 1;
const MAX_ACTORS_COUNT = 3;

const MIN_WRITERS_COUNT = 1;
const MAX_WRITERS_COUNT = 3;

const MIN_GENRES_COUNT = 1;
const MAX_GENRES_COUNT = 3;

const MIN_AGE_RATINGS_COUNT = 0;
const MAX_AGE_RATINGS_COUNT = 18;

const MIN_TOTAL_RATINGS_COUNT = 0;
const MAX_TOTAL_RATINGS_COUNT = 10;

export const generateComments = () => (
  {
    author: getRandomElement(authores),
    comment: getRandomElement(comments),
    date: getRandomDate(startDate, endDate),
    emotion: getRandomElement(emotions),
  });

export const generateFilmCard = () => (
  {
    comments: [1, 2, 30],
    filmInfo: {
      title: getRandomElement(filmTitles),
      alternativeTitle: getRandomElement(alternativeTitles),
      totalRating: getRandomFloat(MIN_TOTAL_RATINGS_COUNT, MAX_TOTAL_RATINGS_COUNT),
      poster: getRandomElement(posters),
      ageRating: getRandomInteger(MIN_AGE_RATINGS_COUNT, MAX_AGE_RATINGS_COUNT),
      director: getRandomElement(directors),
      writers: getRandomIndexFromList(writers, getRandomInteger(MIN_WRITERS_COUNT, MAX_WRITERS_COUNT)),
      actors: getRandomIndexFromList(actors, getRandomInteger(MIN_ACTORS_COUNT, MAX_ACTORS_COUNT)),
      release: {
        date: getRandomDate(startDate, endDate),
        country: getRandomElement(countries),
      },
      runTime: getRandomElement(runTimes),
      genre: getRandomIndexFromList(genres, getRandomInteger(MIN_GENRES_COUNT, MAX_GENRES_COUNT)),
      description: getRandomElement(descriptions),
    },
    userDetails: {
      watchlist: getRandomInteger(),
      watched: getRandomInteger(),
      watchingDate: getRandomDate(startDate, endDate),
      favorite: getRandomInteger(),
    }
  });
