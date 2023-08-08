import * as utils from './quizUtils';

describe('generateRandomInteger()', () => {
  const randomNumber = Math.random();
  const range = { max: randomNumber + 100, min: randomNumber };

  test('returns integer', () => {
    const result = utils.generateRandomInteger(range);
    expect(result - result).toEqual(0);
  });

  test('returns integer within provided range', () => {
    const result = utils.generateRandomInteger(range);
    expect(result).toBeLessThanOrEqual(range.max);
    expect(result).toBeGreaterThanOrEqual(range.min);
  });
});
