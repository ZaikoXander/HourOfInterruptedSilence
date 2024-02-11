import { test, expect, type Locator } from '@playwright/test'
import { fileURLToPath } from 'url'
import path from 'path'

test.describe.serial('File replacement', () => {
  let useAudioOrVideoFileInputButton: Locator
  let timer: Locator
  let startOrPauseOrResumeButton: Locator
  let resetButton: Locator
  function generateFilePathByFileName(fileName: string): string {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    return path.join(__dirname, 'audiosOrVideos', fileName)
  }
  const audioFilePath = generateFilePathByFileName('test-guitar-riff-audio.mp3')
  const videoFilePath = generateFilePathByFileName('test-guitar-riff-audio.mp4')

  test.beforeEach(async ({ page, browserName }) => {
    if (browserName === 'chromium') test.skip()

    await page.goto('/')

    timer = page.getByRole('time')
    startOrPauseOrResumeButton = page.getByRole('button', {
      name: /Começar|Pausar|Continuar/,
    })
    resetButton = page.getByRole('button', { name: 'Zerar' })
    useAudioOrVideoFileInputButton = page.getByRole('button', {
      name: 'Usar arquivo de áudio ou vídeo',
    })
  })

  test.describe('with audio file', () => {
    test.beforeEach(async ({ page }) => {
      page.on('filechooser', async (fileChooser) => {
        await fileChooser.setFiles(audioFilePath)
      })
      await useAudioOrVideoFileInputButton.click()
    })

    test('same audio file replacement', async ({ page }) => {
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

      await expect(timer).toHaveText('00:59:56')
      await expect(startOrPauseOrResumeButton).toBeEnabled()
      await expect(startOrPauseOrResumeButton).toHaveText('Pausar')
      await expect(resetButton).toBeEnabled()

      await page.waitForTimeout(4000)

      await expect(timer).toHaveText('00:59:52')
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

    test('video file replacement', async ({ page }) => {
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
    })
  })

  test.describe('with video file', () => {
    test.beforeEach(async ({ page }) => {
      page.on('filechooser', async (fileChooser) => {
        await fileChooser.setFiles(videoFilePath)
      })
      await useAudioOrVideoFileInputButton.click()
    })

    test('same video file replacement', async ({ page }) => {
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

      await expect(timer).toHaveText('00:59:56')
      await expect(startOrPauseOrResumeButton).toBeEnabled()
      await expect(startOrPauseOrResumeButton).toHaveText('Pausar')
      await expect(resetButton).toBeEnabled()

      await page.waitForTimeout(4000)

      await expect(timer).toHaveText('00:59:52')
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

    test('audio file replacement', async ({ page }) => {
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
    })
  })
})
