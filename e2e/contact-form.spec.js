import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="#contact"]')
    await page.waitForSelector('#contact')
  })

  test('contact form is visible', async ({ page }) => {
    await expect(page.locator('form')).toBeVisible()
  })

  test('shows validation error for empty required fields', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]')
    await submitButton.click()
    
    // Should show validation errors
    await expect(page.locator('[role="alert"]').first()).toBeVisible()
  })

  test('shows validation error for invalid email', async ({ page }) => {
    await page.fill('#name', 'Test User')
    await page.fill('#phone', '+94771234567')
    await page.fill('#email', 'invalid-email')
    await page.fill('#message', 'This is a test message for validation')
    
    // Blur the email field to trigger validation
    await page.locator('#email').blur()
    
    await expect(page.locator('[role="alert"]')).toContainText(/valid email/i)
  })

  test('shows validation error for short message', async ({ page }) => {
    await page.fill('#name', 'Test User')
    await page.fill('#phone', '+94771234567')
    await page.fill('#message', 'Short')
    
    // Blur the message field to trigger validation
    await page.locator('#message').blur()
    
    await expect(page.locator('[role="alert"]')).toContainText(/at least/i)
  })

  test('form fields are properly labeled', async ({ page }) => {
    await expect(page.locator('label[for="name"]')).toBeVisible()
    await expect(page.locator('label[for="email"]')).toBeVisible()
    await expect(page.locator('label[for="phone"]')).toBeVisible()
    await expect(page.locator('label[for="message"]')).toBeVisible()
  })
})
