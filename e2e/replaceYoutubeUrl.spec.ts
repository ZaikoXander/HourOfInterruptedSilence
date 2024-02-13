import { test, expect, type Locator } from '@playwright/test'

test.describe.serial('Youtube url replacement', () => {
  let timer: Locator
  let startOrPauseOrResumeButton: Locator
  let resetButton: Locator
  let youtubeLinkInput: Locator
  const youtubeLink = 'https://youtu.be/HRhNujE-oCQ?si=RIYHkbcwGp1a4645'

  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    timer = page.getByRole('time')
    startOrPauseOrResumeButton = page.getByRole('button', {
      name: /Começar|Pausar|Continuar/,
    })
    resetButton = page.getByRole('button', { name: 'Zerar' })
    youtubeLinkInput = page.getByPlaceholder('Link do youtube')
    await page.getByLabel('Volume').fill('0.1')

    await youtubeLinkInput.click()
    await youtubeLinkInput.fill(youtubeLink)
  })

  test('same youtube url replacement', async ({ page }) => {
    await expect(timer).toHaveText('01:00:00')
    await expect(startOrPauseOrResumeButton).toBeEnabled()
    await expect(startOrPauseOrResumeButton).toHaveText('Começar')
    await expect(resetButton).toBeDisabled()

    await startOrPauseOrResumeButton.click()
    await page.waitForTimeout(4000)

    await expect(timer).toHaveText('00:59:56')
    await expect(startOrPauseOrResumeButton).toBeEnabled()
    await expect(startOrPauseOrResumeButton).toHaveText('Pausar')
    await expect(resetButton).toBeEnabled()

    await youtubeLinkInput.click()
    await youtubeLinkInput.clear()

    await page.waitForTimeout(1000)

    await expect(timer).toHaveText('00:59:55')
    await expect(startOrPauseOrResumeButton).toBeEnabled()
    await expect(startOrPauseOrResumeButton).toHaveText('Pausar')
    await expect(resetButton).toBeEnabled()

    await youtubeLinkInput.click()
    await youtubeLinkInput.fill(youtubeLink)

    await expect(timer).toHaveText('00:59:55')
    await expect(startOrPauseOrResumeButton).toBeEnabled()
    await expect(startOrPauseOrResumeButton).toHaveText('Pausar')
    await expect(resetButton).toBeEnabled()

    await page.waitForTimeout(4000)

    await expect(timer).toHaveText('00:59:51')
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
})
