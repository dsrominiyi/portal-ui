import { utc as moment } from 'moment';

type Primitive = string | number | boolean;

export const getKeyByValue = (object: { [key: string]: Primitive }, value?: Primitive) => {
  return Object.keys(object).find(key => object[key] === value);
};

export const stripNonNumeric = (value: string) => value.replace(/\D/g, '');

export const dateFieldValuesToDateString = (values: DateFieldValues) => {
  const { yyyy, mm, dd } = values;
  if (!yyyy && !mm && !dd) {
    return '';
  }
  if (yyyy.length !== 4 || mm.length !== 2 || dd.length !== 2) {
    return 'INVALID DATE';
  }

  return moment(`${yyyy}-${mm}-${dd}`, 'YYYY-MM-DD').toISOString() || 'INVALID DATE';
};

export const dateStringToDateFieldValues = (date: string): DateFieldValues => {
  const dd = moment(date, 'YYYY-MM-DD').format('DD');
  const mm = moment(date, 'YYYY-MM-DD').format('MM');
  const yyyy = moment(date, 'YYYY-MM-DD').format('YYYY');

  return { dd, mm, yyyy };
};

export const capitalise = (text: string) => {
  const words = text.split(/\s/g);
  return words.map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ');
};

export const kebabCase = (text: string) => {
  const words = text.split(/\s/g);
  return words.map(word => word.toLowerCase()).join('-');
};
