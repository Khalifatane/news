import {expect, test} from '@playwright/test'

test('homepage does not show the branded hero badge', async ({page}) => {
  await page.goto('/')

  await expect(page.getByTestId('home-hero')).toHaveCount(0)
  await expect(page.getByTestId('home-hero-image')).toHaveCount(0)
})
