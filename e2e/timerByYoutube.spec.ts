import { expect, test, type Locator } from '@playwright/test'

test.describe
  .serial('can start timer using youtube link', () => {
    let youtubeLinkInput: Locator
    const youtubeLink = 'https://youtu.be/HRhNujE-oCQ?si=RIYHkbcwGp1a4645'
    let timer: Locator
    let startOrPauseOrResumeButton: Locator
    let resetButton: Locator

    test.beforeEach(async ({ page }) => {
      await page.goto('/')

      youtubeLinkInput = page.getByPlaceholder('Link do youtube')
      timer = page.getByRole('time')
      startOrPauseOrResumeButton = page.getByRole('button', { name: /Começar|Pausar|Continuar/ })
      resetButton = page.getByRole('button', { name: 'Zerar' })

      await youtubeLinkInput.click()
      await youtubeLinkInput.fill(youtubeLink)
    })

    test('should start, pause, resume, and  reset the timer', async ({ page }) => {
      await expect(timer).toHaveText('01:00:00')
      await expect(startOrPauseOrResumeButton).toHaveText('Começar')

      await startOrPauseOrResumeButton.click()
      await page.waitForTimeout(4500)

      await expect(timer).toHaveText('00:59:56')
      await expect(startOrPauseOrResumeButton).toHaveText('Pausar')

      await startOrPauseOrResumeButton.click()
      await page.waitForTimeout(1000)

      await expect(startOrPauseOrResumeButton).toHaveText('Continuar')

      await startOrPauseOrResumeButton.click()
      await page.waitForTimeout(1500)

      await expect(timer).toHaveText('00:59:55')
      await expect(startOrPauseOrResumeButton).toHaveText('Pausar')

      await resetButton.click()
      await page.waitForTimeout(1000)

      await expect(timer).toHaveText('01:00:00')
      await expect(startOrPauseOrResumeButton).toHaveText('Começar')
    })

    test('should start, reset, start, pause, and reset the timer', async ({ page }) => {
      await expect(timer).toHaveText('01:00:00')
      await expect(startOrPauseOrResumeButton).toHaveText('Começar')

      await startOrPauseOrResumeButton.click()
      await page.waitForTimeout(4500)

      await expect(timer).toHaveText('00:59:56')

      await expect(startOrPauseOrResumeButton).toHaveText('Pausar')

      await resetButton.click()
      await page.waitForTimeout(1000)

      await expect(timer).toHaveText('01:00:00')
      await expect(startOrPauseOrResumeButton).toHaveText('Começar')

      await startOrPauseOrResumeButton.click()
      await page.waitForTimeout(9000)

      await expect(startOrPauseOrResumeButton).toHaveText('Pausar')

      await startOrPauseOrResumeButton.click()
      await page.waitForTimeout(2000)

      await expect(timer).toHaveText('00:59:51')

      await expect(startOrPauseOrResumeButton).toHaveText('Continuar')

      await resetButton.click()
      await page.waitForTimeout(1000)

      await expect(timer).toHaveText('01:00:00')
      await expect(startOrPauseOrResumeButton).toHaveText('Começar')
    })
  })
