import { VOWELS } from '../const';

const MATCHES_EMPTY = 0;
const SEPARATOR_DASH: string = '—';
const SEPARATOR_SPACE: string = ' ';
const FILTER_TYPES: string[] = ['', '-'];
const REG_EXP_SEPARATOR: RegExp = new RegExp(SEPARATOR_DASH, 'g');
const REG_EXP_VOWELS: RegExp = new RegExp(`[${VOWELS.join('')}]`, 'gi');

const getWordsCount = (string: string):number => {
  /*
    1. Replace all the dash-like-characters in a string with spaces.
    2. Get an array of all the words splited by spaces.
    3. Due to the replacing of all the dash-like-characters with spaces, we can get empty
       strings in a final array (as a result of converting 3 spaces in a row). Moreover,
       we should take into consideration such circumstances as using dash instead of hyphen
       in a source string. Thus, we remove useless characters through filtration.
  */

  return string
    .replaceAll(REG_EXP_SEPARATOR, SEPARATOR_SPACE)
    .split(SEPARATOR_SPACE)
    .filter((str) => !FILTER_TYPES.includes(str))
    .length;
};

const getVowelsCount = (string: string): number => {
  /*
    Look for matches with an array of vowels using RegExp (considering null).
  */

  const matches: RegExpMatchArray = string.match(REG_EXP_VOWELS);
  return matches ? matches.length : MATCHES_EMPTY;
};

export { getWordsCount, getVowelsCount };
