import { expect, test, type Locator } from '@playwright/test'

test.describe('Volume control functionality', () => {
  let startOrPauseOrResumeButton: Locator
  let muteUnmuteButton: Locator
  let volumeControl: Locator
  const youtubeLink = 'https://youtu.be/HRhNujE-oCQ?si=RIYHkbcwGp1a4645'

  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    startOrPauseOrResumeButton = page.getByRole('button', {
      name: /Começar|Pausar|Continuar/,
    })
    muteUnmuteButton = page
      .locator('div')
      .filter({ hasText: /^Volume$/ })
      .getByRole('button')
    volumeControl = page.getByLabel('Volume')

    const youtubeLinkInput = page.getByPlaceholder('Link do youtube')
    await youtubeLinkInput.click()
    await youtubeLinkInput.fill(youtubeLink)
  })

  test('Volume change while playing', async ({ page }) => {
    await expect(volumeControl).toBeVisible()
    await expect(volumeControl).toHaveValue('0.5')

    await startOrPauseOrResumeButton.click()

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:58',
    )

    await expect(volumeControl).toHaveValue('0.5')

    await volumeControl.fill('0.25')

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:56',
    )

    await expect(volumeControl).toHaveValue('0.25')

    await volumeControl.fill('1')

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:54',
    )

    await expect(volumeControl).toHaveValue('1')

    await volumeControl.fill('0.75')

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:52',
    )

    await expect(volumeControl).toHaveValue('0.75')

    await startOrPauseOrResumeButton.click()
  })

  test('Starting with pre-set volume', async ({ page }) => {
    await expect(volumeControl).toBeVisible()
    await expect(volumeControl).toHaveValue('0.5')

    await volumeControl.fill('0.1')

    await expect(volumeControl).toHaveValue('0.1')

    await startOrPauseOrResumeButton.click()

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:58',
    )

    await expect(volumeControl).toHaveValue('0.1')

    await startOrPauseOrResumeButton.click()
  })

  test('Starting already muted by changing volume to zero', async ({
    page,
  }) => {
    await expect(volumeControl).toBeVisible()
    await expect(volumeControl).toHaveValue('0.5')

    await volumeControl.fill('0')

    await expect(volumeControl).toHaveValue('0')

    await startOrPauseOrResumeButton.click()

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:58',
    )

    await expect(volumeControl).toHaveValue('0')

    await startOrPauseOrResumeButton.click()
  })

  test('Starting already muted by mute button', async ({ page }) => {
    await expect(volumeControl).toBeVisible()
    await expect(volumeControl).toHaveValue('0.5')

    await muteUnmuteButton.click()

    await expect(volumeControl).toHaveValue('0')

    await startOrPauseOrResumeButton.click()

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:58',
    )

    await expect(volumeControl).toHaveValue('0')

    await startOrPauseOrResumeButton.click()
  })

  test('Muting and unmuting by changing volume while playing', async ({
    page,
  }) => {
    await expect(volumeControl).toBeVisible()
    await expect(volumeControl).toHaveValue('0.5')

    await startOrPauseOrResumeButton.click()

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:58',
    )

    await expect(volumeControl).toHaveValue('0.5')

    await volumeControl.fill('0')

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:56',
    )

    await expect(volumeControl).toHaveValue('0')

    await volumeControl.fill('0.5')

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:54',
    )

    await expect(volumeControl).toHaveValue('0.5')

    await startOrPauseOrResumeButton.click()
  })

  test('Muting and unmuting using mute button while playing', async ({
    page,
  }) => {
    await expect(volumeControl).toBeVisible()
    await expect(volumeControl).toHaveValue('0.5')

    await startOrPauseOrResumeButton.click()

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:58',
    )

    await expect(volumeControl).toHaveValue('0.5')

    await volumeControl.fill('0.25')

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:56',
    )

    await expect(volumeControl).toHaveValue('0.25')

    await muteUnmuteButton.click()

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:54',
    )

    await expect(volumeControl).toHaveValue('0')

    await muteUnmuteButton.click()

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:52',
    )

    await expect(volumeControl).toHaveValue('0.25')

    await startOrPauseOrResumeButton.click()
  })

  test("Changing volume while it's muted and playing", async ({ page }) => {
    await expect(volumeControl).toBeVisible()
    await expect(volumeControl).toHaveValue('0.5')

    await startOrPauseOrResumeButton.click()

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:58',
    )

    await expect(volumeControl).toHaveValue('0.5')

    await muteUnmuteButton.click()

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:56',
    )

    await expect(volumeControl).toHaveValue('0')

    await volumeControl.fill('0.75')

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:54',
    )

    await expect(volumeControl).toHaveValue('0.75')

    await startOrPauseOrResumeButton.click()
  })

  test('Muting by changing volume to zero and unmuting while playing', async ({
    page,
  }) => {
    await expect(volumeControl).toBeVisible()
    await expect(volumeControl).toHaveValue('0.5')

    await startOrPauseOrResumeButton.click()

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:58',
    )

    await expect(volumeControl).toHaveValue('0.5')

    await volumeControl.fill('0')

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:56',
    )

    await expect(volumeControl).toHaveValue('0')

    await muteUnmuteButton.click()

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:54',
    )

    await expect(volumeControl).toHaveValue('0.5')

    await startOrPauseOrResumeButton.click()
  })
})
