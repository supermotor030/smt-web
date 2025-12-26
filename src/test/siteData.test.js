import { describe, it, expect } from 'vitest'
import { 
  company, 
  contact, 
  businessHours, 
  navLinks, 
  products 
} from '../data/siteData'

describe('Site Data', () => {
  describe('company', () => {
    it('has required company information', () => {
      expect(company).toBeDefined()
      expect(company.name).toBe('Super Motor Trading')
      expect(company.tagline).toBeDefined()
    })
  })

  describe('contact', () => {
    it('has valid contact information', () => {
      expect(contact).toBeDefined()
      expect(contact.storePhone).toMatch(/^\+94/)
      expect(contact.whatsapp).toMatch(/^\+94/)
      expect(contact.email).toMatch(/@/)
    })

    it('has WhatsApp link', () => {
      expect(contact.whatsappLink).toContain('wa.me')
    })

    it('has call link', () => {
      expect(contact.callLink).toContain('tel:')
    })
  })

  describe('businessHours', () => {
    it('has opening hours defined', () => {
      expect(businessHours).toBeDefined()
      expect(businessHours.days).toBeDefined()
      expect(businessHours.time).toBeDefined()
    })
    
    it('has schedule array', () => {
      expect(businessHours.schedule).toBeDefined()
      expect(businessHours.schedule.length).toBe(7)
    })
    
    it('all days have same hours (9-19)', () => {
      businessHours.schedule.forEach(day => {
        expect(day.open).toBe(9)
        expect(day.close).toBe(19)
      })
    })
  })

  describe('navLinks', () => {
    it('has navigation links', () => {
      expect(navLinks).toBeDefined()
      expect(navLinks.length).toBeGreaterThan(0)
    })

    it('each link has required properties', () => {
      navLinks.forEach(link => {
        expect(link).toHaveProperty('id')
        expect(link).toHaveProperty('label')
        expect(link).toHaveProperty('href')
        expect(link.href).toMatch(/^#/)
      })
    })

    it('has home link', () => {
      const homeLink = navLinks.find(link => link.id === 'home')
      expect(homeLink).toBeDefined()
    })

    it('has contact link', () => {
      const contactLink = navLinks.find(link => link.id === 'contact')
      expect(contactLink).toBeDefined()
    })
  })

  describe('products', () => {
    it('has product categories', () => {
      expect(products).toBeDefined()
      expect(products.length).toBeGreaterThan(0)
    })

    it('each product has required properties', () => {
      products.forEach(product => {
        expect(product).toHaveProperty('id')
        expect(product).toHaveProperty('name')
        expect(product).toHaveProperty('icon')
        expect(product).toHaveProperty('description')
      })
    })
  })
})
