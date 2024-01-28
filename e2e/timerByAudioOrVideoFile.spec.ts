import { test, expect, type Locator } from '@playwright/test';
import { fileURLToPath } from 'url';
import path from 'path';

test.describe
  .serial('Timer functionality with audio or video file', () => {
    let timer: Locator
    let startOrPauseOrResumeButton: Locator
    let resetButton: Locator
    let useAudioOrVideoFileInputButton: Locator
    function generateFilePathByFileName(fileName: string): string {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      return path.join(__dirname, 'audiosOrVideos', fileName)
    }

    test.beforeEach(async ({ page, browserName }) => {
      if (browserName === 'chromium') test.skip()
  
      await page.goto('/')

      timer = page.getByRole('time')
      startOrPauseOrResumeButton = page.getByRole('button', { name: /Começar|Pausar|Continuar/ })
      resetButton = page.getByRole('button', { name: 'Zerar' })
      useAudioOrVideoFileInputButton = page.getByRole('button', { name: 'Usar arquivo de áudio ou vídeo' })
    })

    test.describe('with audio file', () => {
      test.beforeEach(async ({ page, browserName }) => {
        if (browserName === 'chromium') test.skip()
        
        const filePath = generateFilePathByFileName('test-guitar-riff-audio.mp3')
  
        page.on('filechooser', async fileChooser => {
          await fileChooser.setFiles(filePath);
        });

        await useAudioOrVideoFileInputButton.click()
      })
  
      test('should start, pause, resume, and reset the timer', async ({ page, browserName }) => {
        if (browserName === 'chromium') test.skip()
  
        await expect(timer).toHaveText('01:00:00')
        await expect(startOrPauseOrResumeButton).toHaveText('Começar')
  
        await startOrPauseOrResumeButton.click()
        await page.waitForTimeout(2500)
  
        await expect(timer).toHaveText('00:59:58')
        await expect(startOrPauseOrResumeButton).toHaveText('Pausar')
  
        await startOrPauseOrResumeButton.click()
        await page.waitForTimeout(1000)
  
        await expect(startOrPauseOrResumeButton).toHaveText('Continuar')
  
        await startOrPauseOrResumeButton.click()
        await page.waitForTimeout(1500)
  
        await expect(timer).toHaveText('00:59:57')
        await expect(startOrPauseOrResumeButton).toHaveText('Pausar')
  
        await resetButton.click()
        await page.waitForTimeout(1000)
  
        await expect(timer).toHaveText('01:00:00')
        await expect(startOrPauseOrResumeButton).toHaveText('Começar')
      })
  
      test('should start, reset, start, pause, and reset the timer again', async ({ page, browserName }) => {
        if (browserName === 'chromium') test.skip()
  
        await expect(timer).toHaveText('01:00:00')
        await expect(startOrPauseOrResumeButton).toHaveText('Começar')
  
        await startOrPauseOrResumeButton.click()
        await page.waitForTimeout(2500)
  
        await expect(timer).toHaveText('00:59:58')
  
        await expect(startOrPauseOrResumeButton).toHaveText('Pausar')
  
        await resetButton.click()
        await page.waitForTimeout(1000)
  
        await expect(timer).toHaveText('01:00:00')
        await expect(startOrPauseOrResumeButton).toHaveText('Começar')
  
        await startOrPauseOrResumeButton.click()
        await page.waitForTimeout(7000)
  
        await expect(startOrPauseOrResumeButton).toHaveText('Pausar')
  
        await startOrPauseOrResumeButton.click()
        await page.waitForTimeout(2000)
  
        await expect(timer).toHaveText('00:59:53')
  
        await expect(startOrPauseOrResumeButton).toHaveText('Continuar')
  
        await resetButton.click()
        await page.waitForTimeout(1000)
  
        await expect(timer).toHaveText('01:00:00')
        await expect(startOrPauseOrResumeButton).toHaveText('Começar')
      })
    })

    test.describe('with video file', () => {
      test.beforeEach(async ({ page, browserName }) => {
        if (browserName === 'chromium') test.skip()
  
        const filePath = generateFilePathByFileName('test-guitar-riff-audio.mp4')
  
        page.on('filechooser', async fileChooser => {
          await fileChooser.setFiles(filePath);
        });
  
        await useAudioOrVideoFileInputButton.click()
      })
  
      test('should start, pause, resume, and reset the timer', async ({ page, browserName }) => {
        if (browserName === 'chromium') test.skip()
  
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
  
      test('should start, reset, start, pause, and reset the timer again', async ({ page, browserName }) => {
        if (browserName === 'chromium') test.skip()
  
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
  })