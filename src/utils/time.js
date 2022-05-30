// функция перевода минут в часы

export const getTimeFromMins = (min) => {
  const HOURS = Math.trunc(min / 60);
  const MINUTES = min % 60;
  if (HOURS === 0) {
    return `${MINUTES}m`;
  } else {
    return `${HOURS}h ${MINUTES}m`;
  }
};
