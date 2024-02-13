import { test, expect, type Locator } from '@playwright/test'
import { fileURLToPath } from 'url'
import path from 'path'

test.describe
  .serial('Testing timer functionality during source transitions', () => {
  let youtubeLinkInput: Locator
  let useAudioOrVideoFileInputButton: Locator
  let timer: Locator
  let startOrPauseOrResumeButton: Locator
  let resetButton: Locator
  const youtubeLink = 'https://youtu.be/HRhNujE-oCQ?si=RIYHkbcwGp1a4645'
  function generateFilePathByFileName(fileName: string): string {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    return path.join(__dirname, 'audiosOrVideos', fileName)
  }
  const videoFilePath = generateFilePathByFileName('test-guitar-riff-audio.mp4')
  const audioFilePath = generateFilePathByFileName('test-guitar-riff-audio.mp3')

  test.beforeEach(async ({ page, browserName }) => {
    if (browserName === 'chromium') test.skip()

    await page.goto('/')

    youtubeLinkInput = page.getByPlaceholder('Link do youtube')
    timer = page.getByRole('time')
    startOrPauseOrResumeButton = page.getByRole('button', {
      name: /Começar|Pausar|Continuar/,
    })
    resetButton = page.getByRole('button', { name: 'Zerar' })
    await page.getByLabel('Volume').fill('0.1')
    useAudioOrVideoFileInputButton = page.getByRole('button', {
      name: 'Usar arquivo de áudio ou vídeo',
    })
  })

  test('Transition sequence: Youtube video -> Video file -> Audio file', async ({
    page,
  }) => {
    await expect(timer).toHaveText('01:00:00')
    await expect(startOrPauseOrResumeButton).toBeDisabled()
    await expect(startOrPauseOrResumeButton).toHaveText('Começar')
    await expect(resetButton).toBeDisabled()

    await youtubeLinkInput.click()
    await youtubeLinkInput.fill(youtubeLink)

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

    page.on('filechooser', async (fileChooser) => {
      await fileChooser.setFiles(videoFilePath)
    })
    await useAudioOrVideoFileInputButton.click()

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

    page.on('filechooser', async (fileChooser) => {
      await fileChooser.setFiles(audioFilePath)
    })
    await useAudioOrVideoFileInputButton.click()

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

    await resetButton.click()
    await page.waitForTimeout(1000)

    await expect(timer).toHaveText('01:00:00')
    await expect(startOrPauseOrResumeButton).toBeEnabled()
    await expect(startOrPauseOrResumeButton).toHaveText('Começar')
    await expect(resetButton).toBeDisabled()
  })

  test('Transition sequence: Video file -> Youtube video -> Audio file', async ({
    page,
  }) => {
    await expect(timer).toHaveText('01:00:00')
    await expect(startOrPauseOrResumeButton).toBeDisabled()
    await expect(startOrPauseOrResumeButton).toHaveText('Começar')
    await expect(resetButton).toBeDisabled()

    page.on('filechooser', async (fileChooser) => {
      await fileChooser.setFiles(videoFilePath)
    })
    await useAudioOrVideoFileInputButton.click()

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
    await youtubeLinkInput.fill(youtubeLink)

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

    page.on('filechooser', async (fileChooser) => {
      await fileChooser.setFiles(audioFilePath)
    })
    await useAudioOrVideoFileInputButton.click()

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

    await resetButton.click()
    await page.waitForTimeout(1000)

    await expect(timer).toHaveText('01:00:00')
    await expect(startOrPauseOrResumeButton).toBeEnabled()
    await expect(startOrPauseOrResumeButton).toHaveText('Começar')
    await expect(resetButton).toBeDisabled()
  })

  test('Transition sequence: Audio file -> Youtube video -> Video file', async ({
    page,
  }) => {
    await expect(timer).toHaveText('01:00:00')
    await expect(startOrPauseOrResumeButton).toBeDisabled()
    await expect(startOrPauseOrResumeButton).toHaveText('Começar')
    await expect(resetButton).toBeDisabled()

    page.on('filechooser', async (fileChooser) => {
      await fileChooser.setFiles(audioFilePath)
    })
    await useAudioOrVideoFileInputButton.click()

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
    await youtubeLinkInput.fill(youtubeLink)

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

    page.on('filechooser', async (fileChooser) => {
      await fileChooser.setFiles(videoFilePath)
    })
    await useAudioOrVideoFileInputButton.click()

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

    await resetButton.click()
    await page.waitForTimeout(1000)

    await expect(timer).toHaveText('01:00:00')
    await expect(startOrPauseOrResumeButton).toBeEnabled()
    await expect(startOrPauseOrResumeButton).toHaveText('Começar')
    await expect(resetButton).toBeDisabled()
  })
})
