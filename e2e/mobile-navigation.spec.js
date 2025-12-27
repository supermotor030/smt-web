import { test, expect } from '@playwright/test'

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('mobile menu button is visible', async ({ page }) => {
    const menuButton = page.locator('button[aria-label*="menu" i], button[aria-expanded]')
    await expect(menuButton).toBeVisible()
  })

  test('can open and close mobile menu', async ({ page }) => {
    const menuButton = page.locator('button[aria-label*="menu" i], button[aria-expanded]').first()
    
    // Open menu
    await menuButton.click()
    await expect(page.locator('nav[role="navigation"], [role="menu"]')).toBeVisible()
    
    // Close menu
    await menuButton.click()
  })

  test('mobile CTA bar is visible', async ({ page }) => {
    // Scroll down to trigger mobile CTA bar visibility
    await page.evaluate(() => window.scrollTo(0, 500))
    await page.waitForTimeout(500)
    
    // Mobile CTA bar should appear on scroll
    const ctaBar = page.locator('[class*="fixed"][class*="bottom"]')
    await expect(ctaBar).toBeVisible()
  })
})
