import { expect, test } from '@playwright/test';

const { beforeEach, describe } = test;

describe('homepage', () => {
  beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has counter', async ({ page }) => {
    await expect(page.getByText('count is')).toBeVisible();
  });

  test('increments counter', async ({ page }) => {
    await expect(page.getByText('count is 0')).toBeVisible();

    await page.getByText('count is').click();

    await expect(page.getByText('count is 1')).toBeVisible();
  });
});
