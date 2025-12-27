import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import useBusinessHours from '../hooks/useBusinessHours'

describe('useBusinessHours', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns isOpen as true during business hours', () => {
    // Set to Wednesday 2:00 PM (14:00) Colombo time
    // Colombo is UTC+5:30
    const wednesdayAfternoon = new Date('2024-01-10T08:30:00.000Z') // 14:00 Colombo
    vi.setSystemTime(wednesdayAfternoon)

    const { result } = renderHook(() => useBusinessHours())
    
    expect(result.current.isOpen).toBe(true)
  })

  it('returns isOpen as false outside business hours', () => {
    // Set to Wednesday 8:00 PM (20:00) Colombo time
    const wednesdayEvening = new Date('2024-01-10T14:30:00.000Z') // 20:00 Colombo
    vi.setSystemTime(wednesdayEvening)

    const { result } = renderHook(() => useBusinessHours())
    
    expect(result.current.isOpen).toBe(false)
  })

  it('returns isOpen as false before opening time', () => {
    // Set to Wednesday 7:00 AM (07:00) Colombo time
    const wednesdayMorning = new Date('2024-01-10T01:30:00.000Z') // 07:00 Colombo
    vi.setSystemTime(wednesdayMorning)

    const { result } = renderHook(() => useBusinessHours())
    
    expect(result.current.isOpen).toBe(false)
  })

  it('returns correct message when open', () => {
    // Set to Wednesday 2:00 PM Colombo time
    const wednesdayAfternoon = new Date('2024-01-10T08:30:00.000Z')
    vi.setSystemTime(wednesdayAfternoon)

    const { result } = renderHook(() => useBusinessHours())
    
    expect(result.current.message).toContain('Closes')
  })

  it('returns correct message when closed', () => {
    // Set to Wednesday 8:00 PM Colombo time
    const wednesdayEvening = new Date('2024-01-10T14:30:00.000Z')
    vi.setSystemTime(wednesdayEvening)

    const { result } = renderHook(() => useBusinessHours())
    
    expect(result.current.message).toContain('Opens')
  })

  it('returns currentDay correctly', () => {
    // Set to Wednesday
    const wednesday = new Date('2024-01-10T08:30:00.000Z')
    vi.setSystemTime(wednesday)

    const { result } = renderHook(() => useBusinessHours())
    
    expect(result.current.currentDay).toBe('Wednesday')
  })
})
