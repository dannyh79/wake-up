import type { Page } from '@playwright/test';
import { ids as homepageIds } from '@/pages/Home';

export const getQuizNumbers = async (
  page: Page
): Promise<[base: number, multiplier: number]> => {
  const [baseInString, multiplierInString] = await Promise.all(
    [homepageIds.baseNumber, homepageIds.multiplier].map((id) =>
      page.getByTestId(id).textContent()
    )
  );
  return [Number(baseInString), Number(multiplierInString)];
};

export const fillFormThenClickSubmit =
  (page: Page) => async (answer: number) => {
    await page.getByTestId(homepageIds.answer).fill(String(answer));
    await page.getByTestId(homepageIds.submit).click();
  };
