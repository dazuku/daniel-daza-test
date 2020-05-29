export const getFormattedHour = (date) => {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let meridiem = 'am';

  if (hours >= 12) {
    hours -= 12;
    meridiem = 'pm';
  }

  if (hours === 0) {
    hours = 12;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes} ${meridiem}`;
};
