import { VOWELS } from '../const';

const MATCHES_EMPTY = 0;
const SEPARATOR_DASH: string = '—';
const SEPARATOR_SPACE: string = ' ';
const FILTER_TYPES: string[] = ['', '-'];
const REG_EXP_SEPARATOR: RegExp = new RegExp(SEPARATOR_DASH, 'g');
const REG_EXP_VOWELS: RegExp = new RegExp(`[${VOWELS.join('')}]`, 'gi');

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
    .replaceAll(REG_EXP_SEPARATOR, SEPARATOR_SPACE)
    .split(SEPARATOR_SPACE)
    .filter((str) => !FILTER_TYPES.includes(str))
    .length;
};

const getVowelsCount = (string: string): number => {
  /*
    Ищем в строке совпадения с массивом гласных через RegExp.
    Учитываем null.
  */

  const matches: RegExpMatchArray = string.match(REG_EXP_VOWELS);
  return matches ? matches.length : MATCHES_EMPTY;
};

export { getWordsCount, getVowelsCount };
