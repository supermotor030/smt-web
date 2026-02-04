import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineHome, HiOutlineCube, HiOutlinePhone, HiOutlineChatBubbleLeftRight, HiOutlineMagnifyingGlass, HiOutlineXMark } from 'react-icons/hi2'
import { contact } from '../data/siteData'
import useMediaQuery from '../hooks/useMediaQuery'

const navItems = [
  { id: 'home', label: 'Home', icon: HiOutlineHome, href: '#' },
  { id: 'products', label: 'Parts', icon: HiOutlineCube, href: '#products' },
  { id: 'search', label: 'Search', icon: HiOutlineMagnifyingGlass, action: 'search' },
  { id: 'contact', label: 'Contact', icon: HiOutlinePhone, href: '#contact' },
  { id: 'chat', label: 'Chat', icon: HiOutlineChatBubbleLeftRight, action: 'whatsapp' },
]

export default function MobileBottomNav() {
  // Disabled - removing 5-item mobile bottom nav as per user request
  return null
}
