import { expect, test } from '@playwright/test';
import { ids } from '../../src/pages/Home';

const { beforeEach, describe } = test;

describe('homepage', () => {
  beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has the quiz and submit button', async ({ page }) => {
    await expect(page.getByTestId(ids.quiz)).toBeVisible();
    await expect(page.getByTestId(ids.answer)).toBeEditable();
    await expect(page.getByTestId(ids.submit)).toBeEnabled();
  });

  test('does NOT show "correct" or "wrong" upon entering the page', async ({
    page,
  }) => {
    await expect(page.getByText('correct')).not.toBeVisible();
    await expect(page.getByText('wrong')).not.toBeVisible();
  });

  test('shows "correct" if given right answer', async ({ page }) => {
    const [baseInString, multiplierInString] = await Promise.all(
      [ids.baseNumber, ids.multiplier].map((id) =>
        page.getByTestId(id).textContent()
      )
    );
    const answer = Number(baseInString) * Number(multiplierInString);

    await page.getByTestId(ids.answer).fill(String(answer));
    await page.getByTestId(ids.submit).click();

    await expect(page.getByText('correct')).toBeVisible();
  });

  test('shows "wrong" otherwise', async ({ page }) => {
    await page.getByTestId(ids.answer).fill('foo');
    await page.getByTestId(ids.submit).click();

    await expect(page.getByText('wrong')).toBeVisible();
  });
});
