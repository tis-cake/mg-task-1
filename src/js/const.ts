const RANGE_MIN: number = 1;
const RANGE_MAX: number = 20;

const SEPARATOR_COMA: string = ',';
const SEPARATOR_SEMICOLON: string = ';';

// pattern="(\d+)([,;]\s*\d+)*"
const INPUT_PATTERN: string = `(\\d+)([${SEPARATOR_COMA}${SEPARATOR_SEMICOLON}]\\s*\\d+)*`;
const INPUT_PLACEHOLDER: string = `Введите число/числа от ${RANGE_MIN} до ${RANGE_MAX}.`;

const ERROR_MESSAGE_EMPTY: string = '';
const INVALID_MESSAGE_PATTERN: string = `Пожалуйста, используйте только цифры.\nДля ввода нескольких цифр используйте запятую [${SEPARATOR_COMA}] или точку с запятой [${SEPARATOR_SEMICOLON}].`;
const INVALID_MESSAGE_RANGE_MOBILE: string = `Диапазон чисел: от ${RANGE_MIN} до ${RANGE_MAX}.`;
const INVALID_MESSAGE_RANGE_DESKTOP: string = `Число игнорируется, если оно не в диапазоне от ${RANGE_MIN} до ${RANGE_MAX}.`;

/*
  Because of the fact that we can't receive a user locale with a text value, we can use an array of all
  the available vowels.
*/

const VOWELS: string[] = [
  // RU
  'а',
  'о',
  'ӧ',
  'э',
  'е',
  'и',
  'й',
  'ы',
  'у',
  'ё',
  'ю',
  'я',
  // EN
  'a',
  'e',
  'i',
  'o',
  'u',
  'y',
  // IS
  'á',
  'é',
  'í',
  'ó',
  'ú',
  'ý',
  'æ',
  'ö',
  // DE
  'ä',
  'ö',
  'ü',
  // DA
  'ø',
  'å',
  // FR
  'è',
  'à',
  'ù',
  'â',
  'ê',
  'ô',
  'î',
  'û',
  'ë',
  'ï',
  'ÿ',
  // OTHERS
  'ɑ',
  'ɛ',
  'ɨ',
  'ɵ',
  'ʉ',
  'ɐ',
  'ə',
  'ɪ',
  'ɨ',
  'ʉ',
  'ʊ',
  'e̋',
  'ē',
  'ȅ',
  'ӥ',
];

export {
  RANGE_MIN,
  RANGE_MAX,

  INPUT_PATTERN,
  INPUT_PLACEHOLDER,
  ERROR_MESSAGE_EMPTY,
  INVALID_MESSAGE_PATTERN,
  INVALID_MESSAGE_RANGE_MOBILE,
  INVALID_MESSAGE_RANGE_DESKTOP,

  SEPARATOR_COMA,
  SEPARATOR_SEMICOLON,

  VOWELS,
};
