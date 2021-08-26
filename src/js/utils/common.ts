const MIN_INT: number = 100;
const MAX_INT: number = 1000;

const getRandomInt = (): number => Math.floor(Math.random() * (MAX_INT - MIN_INT + 1)) + MIN_INT;

export { getRandomInt };
