import { useState, useEffect, useMemo } from 'react'
import { businessHours } from '../data/siteData'
import type { BusinessHoursStatus, DaySchedule } from '../types'

export default function useBusinessHours(): BusinessHoursStatus {
    const [currentTime, setCurrentTime] = useState<Date>(new Date())

    useEffect(() => {
        // Update every minute
        const interval = setInterval(() => {
            setCurrentTime(new Date())
        }, 60000)

        return () => clearInterval(interval)
    }, [])

    const status = useMemo((): BusinessHoursStatus => {
        // Get Sri Lanka time
        const sriLankaTime = new Date(currentTime.toLocaleString('en-US', {
            timeZone: businessHours.timezone
        }))

        const hours = sriLankaTime.getHours()
        const minutes = sriLankaTime.getMinutes()
        const dayOfWeek = sriLankaTime.getDay() // 0 = Sunday, 1 = Monday, etc.
        const currentMinutes = hours * 60 + minutes

        // Get today's schedule (convert JS day to schedule index)
        // JS: 0=Sun, 1=Mon, ... 6=Sat
        // Schedule: 0=Mon, 1=Tue, ... 5=Sat, 6=Sun
        const scheduleIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1
        const todaySchedule: DaySchedule = businessHours.schedule[scheduleIndex]

        const openMinutes = todaySchedule.open * 60
        const closeMinutes = todaySchedule.close * 60

        const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes

        let timeUntilChange: number
        let message: string

        if (isOpen) {
            // Calculate time until close
            const minutesUntilClose = closeMinutes - currentMinutes
            const hoursUntilClose = Math.floor(minutesUntilClose / 60)
            const minsUntilClose = minutesUntilClose % 60

            if (hoursUntilClose > 0) {
                message = `Closes in ${hoursUntilClose}h ${minsUntilClose}m`
            } else {
                message = `Closes in ${minsUntilClose}m`
            }
            timeUntilChange = minutesUntilClose
        } else {
            // Calculate time until open
            let minutesUntilOpen: number
            if (currentMinutes < openMinutes) {
                // Before opening today
                minutesUntilOpen = openMinutes - currentMinutes
            } else {
                // After closing, find next day's opening time
                const tomorrowIndex = (scheduleIndex + 1) % 7
                const tomorrowSchedule = businessHours.schedule[tomorrowIndex]
                minutesUntilOpen = (24 * 60 - currentMinutes) + (tomorrowSchedule.open * 60)
            }

            const hoursUntilOpen = Math.floor(minutesUntilOpen / 60)
            const minsUntilOpen = minutesUntilOpen % 60

            if (hoursUntilOpen > 0) {
                message = `Opens in ${hoursUntilOpen}h ${minsUntilOpen}m`
            } else {
                message = `Opens in ${minsUntilOpen}m`
            }
            timeUntilChange = minutesUntilOpen
        }

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const currentDay = days[dayOfWeek]

        return {
            isOpen,
            message,
            timeUntilChange,
            currentHour: hours,
            currentDay,
            todaySchedule,
            formattedTime: sriLankaTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }),
        }
    }, [currentTime])

    return status
}
