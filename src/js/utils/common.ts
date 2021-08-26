import { VOWELS } from '../const';

const SEPARATOR_DASH: string = '—';
const SEPARATOR_SPACE: string = ' ';
const FILTER_TYPES: string[] = ['', '-'];
const SEPARATOR_REG_EXP: RegExp = new RegExp(SEPARATOR_DASH, 'g');

const getWordsCount = (string: string):number => {
  /*
    1. Заменяем в строке все символы дефисов на пробел.
    2. Получаем массив всех слов, разбив по пробелам.
    3. Так как мы заменили все дефисы на пробелы - мы можем иметь в итоговом массиве
       пустые строки (как результат конвертации 3 пробелов подряд). Более того, нам
       следует учесть такие особенности, как использование тире на месте дефисов в
       исходной строке. Соответственно, из итогового массива мы удаляем лишние символы
       через фильтрацию.
  */

  return string
    .replaceAll(SEPARATOR_REG_EXP, SEPARATOR_SPACE)
    .split(SEPARATOR_SPACE)
    .filter((str) => !FILTER_TYPES.includes(str))
    .length;
};

const getVowelsCount = (string: string): number => {
  /*
    Просто ищем в строке совпадения с массивом гласных.
  */

  return string
    .split('')
    .filter((char) => VOWELS.includes(char.toLowerCase()))
    .length;
};

export { getWordsCount, getVowelsCount };
