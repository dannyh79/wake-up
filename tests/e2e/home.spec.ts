import { Page, expect, test } from '@playwright/test';
import { INDICATOR_TEXT, ids } from '../../src/pages/Home';

const getQuizAnswer = async (page: Page): Promise<number> => {
  const [baseInString, multiplierInString] = await Promise.all(
    [ids.baseNumber, ids.multiplier].map((id) =>
      page.getByTestId(id).textContent()
    )
  );
  return Number(baseInString) * Number(multiplierInString);
};

const { beforeEach, describe } = test;

beforeEach(async ({ page }) => {
  await page.goto('/');
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
  const fillFormThenClickSubmit = (page: Page) => async (answer: number) => {
    await page.getByTestId(ids.answer).fill(String(answer));
    await page.getByTestId(ids.submit).click();
  };

  test('shows "correct" if given right answer', async ({ page }) => {
    const answer = await getQuizAnswer(page);
    fillFormThenClickSubmit(page)(answer);

    expect(await page.getByTestId(ids.indicator).textContent()).toBe(
      INDICATOR_TEXT.correct
    );
    await page.waitForSelector(`[data-testid="${ids.indicator}"]`);
    expect(await page.getByTestId(ids.answer).inputValue()).toBe('');
  });

  test('shows "wrong" otherwise', async ({ page }) => {
    const wrongAnswer = (await getQuizAnswer(page)) + 1;
    fillFormThenClickSubmit(page)(wrongAnswer);

    expect(await page.getByTestId(ids.indicator).textContent()).toBe(
      INDICATOR_TEXT.wrong
    );
    await page.waitForSelector(`[data-testid="${ids.indicator}"]`);
    expect(await page.getByTestId(ids.answer).inputValue()).not.toBe('');
  });

  describe('after submitting form', () => {
    test('hides indicator upon filling answer', async ({ page }) => {
      const answer = await getQuizAnswer(page);
      fillFormThenClickSubmit(page)(answer);

      await page.waitForSelector(`[data-testid="${ids.indicator}"]`);
      await page.getByTestId(ids.answer).fill(String(answer));
      await expect(page.getByTestId(ids.indicator)).not.toBeVisible();
    });
  });
});
