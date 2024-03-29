import { test, expect, type Locator } from '@playwright/test'

test.describe('Timer functionality with YouTube link', () => {
  let timer: Locator
  let startOrPauseOrResumeButton: Locator
  let resetButton: Locator
  const youtubeLink = 'https://youtu.be/HRhNujE-oCQ?si=RIYHkbcwGp1a4645'

  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    timer = page.getByRole('time')
    startOrPauseOrResumeButton = page.getByRole('button', {
      name: /Começar|Pausar|Continuar/,
    })
    resetButton = page.getByRole('button', { name: 'Zerar' })
    await page.getByLabel('Volume').fill('0.1')

    const youtubeLinkInput = page.getByPlaceholder('Link do youtube')
    await youtubeLinkInput.click()
    await youtubeLinkInput.fill(youtubeLink)
  })

  test('should start, pause, resume, and reset the timer', async ({ page }) => {
    await expect(timer).toHaveText('01:00:00')
    await expect(startOrPauseOrResumeButton).toBeEnabled()
    await expect(startOrPauseOrResumeButton).toHaveText('Começar')
    await expect(resetButton).toBeDisabled()

    await startOrPauseOrResumeButton.click()

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:56',
    )

    await expect(timer).toHaveText('00:59:56')
    await expect(startOrPauseOrResumeButton).toBeEnabled()
    await expect(startOrPauseOrResumeButton).toHaveText('Pausar')
    await expect(resetButton).toBeEnabled()

    await startOrPauseOrResumeButton.click()

    await expect(timer).toHaveText('00:59:56')
    await page.waitForTimeout(1000)

    await expect(timer).toHaveText('00:59:56')
    await expect(startOrPauseOrResumeButton).toBeEnabled()
    await expect(startOrPauseOrResumeButton).toHaveText('Continuar')
    await expect(resetButton).toBeEnabled()

    await startOrPauseOrResumeButton.click()

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:55',
    )

    await expect(timer).toHaveText('00:59:55')
    await expect(startOrPauseOrResumeButton).toBeEnabled()
    await expect(startOrPauseOrResumeButton).toHaveText('Pausar')
    await expect(resetButton).toBeEnabled()

    await resetButton.click()

    await expect(timer).toHaveText('01:00:00')
    await page.waitForTimeout(1000)

    await expect(timer).toHaveText('01:00:00')
    await expect(startOrPauseOrResumeButton).toBeEnabled()
    await expect(startOrPauseOrResumeButton).toHaveText('Começar')
    await expect(resetButton).toBeDisabled()
  })

  test('should start, reset, start, pause, and reset the timer again', async ({
    page,
  }) => {
    await expect(timer).toHaveText('01:00:00')
    await expect(startOrPauseOrResumeButton).toBeEnabled()
    await expect(startOrPauseOrResumeButton).toHaveText('Começar')
    await expect(resetButton).toBeDisabled()

    await startOrPauseOrResumeButton.click()

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:56',
    )

    await expect(timer).toHaveText('00:59:56')
    await expect(startOrPauseOrResumeButton).toBeEnabled()
    await expect(startOrPauseOrResumeButton).toHaveText('Pausar')
    await expect(resetButton).toBeEnabled()

    await resetButton.click()

    await expect(timer).toHaveText('01:00:00')
    await page.waitForTimeout(1000)

    await expect(timer).toHaveText('01:00:00')
    await expect(startOrPauseOrResumeButton).toBeEnabled()
    await expect(startOrPauseOrResumeButton).toHaveText('Começar')
    await expect(resetButton).toBeDisabled()

    await startOrPauseOrResumeButton.click()

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:51',
    )

    await expect(timer).toHaveText('00:59:51')
    await expect(startOrPauseOrResumeButton).toBeEnabled()
    await expect(startOrPauseOrResumeButton).toHaveText('Pausar')
    await expect(resetButton).toBeEnabled()

    await page.waitForFunction(
      () => document.querySelector('time')?.textContent === '00:59:50',
    )

    await startOrPauseOrResumeButton.click()

    await expect(timer).toHaveText('00:59:50')
    await page.waitForTimeout(1000)

    await expect(timer).toHaveText('00:59:50')
    await expect(startOrPauseOrResumeButton).toBeEnabled()
    await expect(startOrPauseOrResumeButton).toHaveText('Continuar')
    await expect(resetButton).toBeEnabled()

    await resetButton.click()

    await expect(timer).toHaveText('01:00:00')
    await page.waitForTimeout(1000)

    await expect(timer).toHaveText('01:00:00')
    await expect(startOrPauseOrResumeButton).toBeEnabled()
    await expect(startOrPauseOrResumeButton).toHaveText('Começar')
    await expect(resetButton).toBeDisabled()
  })
})
