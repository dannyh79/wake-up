import { expect, test } from '@playwright/test';
import { INDICATOR_TEXT, ids } from '@/pages/Home';
import * as utils from './support/utils';

const { beforeEach, describe } = test;

beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.context().setOffline(true);
  await page.context().newPage();
});

describe('page layout', () => {
  test('has the quiz and submit button', async ({ page }) => {
    await expect(page.getByTestId(ids.quiz)).toBeVisible();
    await expect(page.getByTestId(ids.answer)).toBeEditable();
    await expect(page.getByTestId(ids.submit)).toBeEnabled();
  });

  test('does NOT show answer indicator upon entering the page', async ({
    page,
  }) => {
    await expect(page.getByTestId(ids.indicator)).not.toBeVisible();
    await expect(page.getByTestId(ids.indicator)).not.toBeVisible();
  });
});

describe('quiz interaction', () => {
  test('shows "correct" if given right answer', async ({ page }) => {
    const quiz = await utils.getQuizNumbers(page);
    const answer = quiz[0] * quiz[1];
    await utils.fillFormThenClickSubmit(page)(answer);

    expect(await page.getByTestId(ids.indicator).textContent()).toBe(
      INDICATOR_TEXT.correct
    );

    await page.waitForSelector(`[data-testid="${ids.indicator}"]`);
    expect(await page.getByTestId(ids.answer).inputValue()).toBe('');
  });

  test('shows "wrong" otherwise', async ({ page }) => {
    const quiz = await utils.getQuizNumbers(page);
    const wrongAnswer = quiz[0] * quiz[1] + 1;
    await utils.fillFormThenClickSubmit(page)(wrongAnswer);

    expect(await page.getByTestId(ids.indicator).textContent()).toBe(
      INDICATOR_TEXT.wrong
    );

    await page.waitForSelector(`[data-testid="${ids.indicator}"]`);
    const quizAfterWrongAnswer = await utils.getQuizNumbers(page);
    expect(await page.getByTestId(ids.answer).inputValue()).not.toBe('');
    expect(
      quiz[0] === quizAfterWrongAnswer[0] && quiz[1] === quizAfterWrongAnswer[1]
    ).toBeTruthy();
  });
});
