import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';

dayjs.extend(customParseFormat);
dayjs.extend(duration);

const now = dayjs();
const FORMAT = 'DD/MM/YYYY';

export const formatDate = (date: string | null) => {
  if (!date) {
    return null;
  }
  return dayjs(date).format(FORMAT);
};
export const checkDate = (date: string | null): boolean => {
  if (!date) {
    return false;
  }

  if (!checkFormat(date)) return false;
  if (!checkCorrectAge(date)) return false;
  return true;
};

export const checkCorrectAge = (date: string | null): boolean => {
  if (!date) {
    return false;
  }

  const diff = now.diff(date);

  const age = dayjs.duration(diff).asYears();

  if (age < 18) {
    return false;
  }

  if (age > 120) {
    return false;
  }

  return true;
};

export const checkFormat = (date: string | null): boolean => {
  if (!date) {
    return false;
  }

  if (!dayjs(date, FORMAT, true).isValid()) {
    return false;
  }

  return true;
};
