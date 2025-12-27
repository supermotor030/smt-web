import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Super Motor Trading/)
  })

  test('hero section is visible', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('PRECISION')
    await expect(page.locator('h1')).toContainText('ENGINEERED')
    await expect(page.locator('h1')).toContainText('EXCELLENCE')
  })

  test('navigation is visible', async ({ page }) => {
    await expect(page.locator('nav')).toBeVisible()
  })

  test('WhatsApp button is visible and functional', async ({ page }) => {
    const whatsappLink = page.locator('a[href*="wa.me"]').first()
    await expect(whatsappLink).toBeVisible()
    await expect(whatsappLink).toHaveAttribute('href', /wa\.me\/94704344855/)
  })

  test('can scroll to products section', async ({ page }) => {
    await page.click('a[href="#products"]')
    await expect(page.locator('#products')).toBeInViewport()
  })

  test('can scroll to contact section', async ({ page }) => {
    await page.click('a[href="#contact"]')
    await expect(page.locator('#contact')).toBeInViewport()
  })
})
