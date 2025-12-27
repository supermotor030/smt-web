import { 
  GiMechanicalArm, 
  GiCarWheel,
  GiGearStick,
  GiOilDrum,
  GiHeatHaze,
  GiChainLightning,
  GiCog,
  GiShield,
  GiTrophyCup,
  GiSpanner,
  GiGears
} from 'react-icons/gi'
import { 
  LuTag, 
  LuPackage, 
  LuTruck, 
  LuHeadphones,
  LuDisc
} from 'react-icons/lu'

// Company Information
export const company = {
  name: 'Super Motor Trading',
  tagline: 'PRECISION PARTS. POWERFUL PERFORMANCE.',
  subTagline: 'Your Trusted Automotive Partner',
  established: 2024,
  yearsInBusiness: new Date().getFullYear() - 2024 || 1,
}

// Contact Information
export const contact = {
  address: '160/1/B, Ihalakaragahamuna, Kadawatha, Sri Lanka',
  storePhone: '+94 70 434 4855',
  mobile: '+94 77 729 1364',
  whatsapp: '+94 70 434 4855',
  whatsappLink: 'https://wa.me/94704344855?text=Hello!%20I\'m%20interested%20in%20spare%20parts.',
  email: 'supermotortrading01@gmail.com',
  facebook: 'https://web.facebook.com/profile.php?id=100093416801357',
  callLink: 'tel:+94704344855',
  emailLink: 'mailto:supermotortrading01@gmail.com',
  mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63359.38388296772!2d79.87365782260893!3d7.013811683006309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2f9e611191f29%3A0x535298232b68ba21!2sSuper%20Motor%20Trading!5e0!3m2!1sen!2slk',
  mapsLink: 'https://maps.google.com/?q=Super+Motor+Trading+Kadawatha',
}

// Business Hours - Mon-Sun 9AM-7PM
export const businessHours = {
  days: 'Monday - Sunday',
  daysShort: '7 DAYS A WEEK',
  time: '9:00 AM - 7:00 PM',
  timezone: 'Asia/Colombo',
  schedule: [
    { day: 'Monday', open: 9, close: 19 },
    { day: 'Tuesday', open: 9, close: 19 },
    { day: 'Wednesday', open: 9, close: 19 },
    { day: 'Thursday', open: 9, close: 19 },
    { day: 'Friday', open: 9, close: 19 },
    { day: 'Saturday', open: 9, close: 19 },
    { day: 'Sunday', open: 9, close: 19 },
  ],
}

// Navigation Links
export const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'products', label: 'Products', href: '#products' },
  { id: 'why-us', label: 'Why Us', href: '#why-us' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

// Statistics
export const stats = [
  { 
    value: 100, 
    suffix: '%', 
    label: 'GENUINE PARTS', 
    color: '#F59E0B',
    description: 'Authentic quality guaranteed'
  },
  { 
    value: 1000, 
    suffix: '+', 
    label: 'PARTS IN STOCK', 
    color: '#0077FF',
    description: 'Wide range available'
  },
  { 
    value: 500, 
    suffix: '+', 
    label: 'HAPPY CUSTOMERS', 
    color: '#22C55E',
    description: 'Satisfied drivers across Sri Lanka'
  },
  { 
    value: 7, 
    suffix: '/7', 
    label: 'DAYS OPEN', 
    color: '#8B5CF6',
    description: 'Always here when you need us'
  },
]

// Product Categories
export const products = [
  {
    id: 'engine',
    name: 'Engine Parts',
    icon: GiMechanicalArm,
    color: '#FF5500',
    description: 'Heart of your vehicle',
    tagline: 'Power that performs',
    items: ['Pistons', 'Gaskets', 'Valves', 'Timing Components', 'Cylinder Heads', 'Camshafts', 'Crankshafts', 'Engine Mounts'],
    popular: ['Pistons', 'Gaskets', 'Timing Components'],
  },
  {
    id: 'brakes',
    name: 'Brake System',
    icon: LuDisc,
    color: '#EF4444',
    description: 'Stop with confidence',
    tagline: 'Safety first, always',
    items: ['Brake Pads', 'Discs & Rotors', 'Calipers', 'Brake Lines', 'Master Cylinders', 'Brake Shoes', 'Brake Drums'],
    popular: ['Brake Pads', 'Discs & Rotors'],
  },
  {
    id: 'suspension',
    name: 'Suspension',
    icon: GiCarWheel,
    color: '#0077FF',
    description: 'Smooth every journey',
    tagline: 'Ride in comfort',
    items: ['Shock Absorbers', 'Bushings', 'Ball Joints', 'Control Arms', 'Stabilizers', 'Coil Springs', 'Strut Mounts'],
    popular: ['Shock Absorbers', 'Ball Joints'],
  },
  {
    id: 'transmission',
    name: 'Transmission',
    icon: GiGearStick,
    color: '#8B5CF6',
    description: 'Power to the wheels',
    tagline: 'Seamless shifting',
    items: ['Gearbox Parts', 'Clutch Kits', 'CV Joints', 'Axles', 'Differentials', 'Flywheel', 'Transmission Mounts'],
    popular: ['Clutch Kits', 'CV Joints'],
  },
  {
    id: 'filters',
    name: 'Filters',
    icon: GiOilDrum,
    color: '#22C55E',
    description: 'Keep it clean',
    tagline: 'Pure performance',
    items: ['Oil Filters', 'Air Filters', 'Fuel Filters', 'Cabin Filters', 'Transmission Filters'],
    popular: ['Oil Filters', 'Air Filters'],
  },
  {
    id: 'cooling',
    name: 'Cooling System',
    icon: GiHeatHaze,
    color: '#06B6D4',
    description: 'Beat the heat',
    tagline: 'Stay cool under pressure',
    items: ['Radiators', 'Water Pumps', 'Thermostats', 'Coolant Hoses', 'Fans', 'Radiator Caps', 'Expansion Tanks'],
    popular: ['Radiators', 'Water Pumps'],
  },
  {
    id: 'belts',
    name: 'Belts & Hoses',
    icon: GiChainLightning,
    color: '#F59E0B',
    description: 'Connected performance',
    tagline: 'Every connection matters',
    items: ['Timing Belts', 'V-Belts', 'Serpentine Belts', 'Coolant Hoses', 'Power Steering Hoses', 'Tensioners'],
    popular: ['Timing Belts', 'Serpentine Belts'],
  },
  {
    id: 'bearings',
    name: 'Bearings',
    icon: GiCog,
    color: '#6E6E7A',
    description: 'Precision in motion',
    tagline: 'Smooth rotation guaranteed',
    items: ['Wheel Bearings', 'Hub Assemblies', 'Axle Bearings', 'Pilot Bearings', 'Thrust Bearings'],
    popular: ['Wheel Bearings', 'Hub Assemblies'],
  },
]

// Vehicle Brands
export const vehicleBrands = {
  japanese: {
    label: 'Japanese',
    flag: 'JP',
    gradient: 'from-red-600 to-red-800',
    brands: ['Toyota', 'Honda', 'Nissan', 'Suzuki', 'Mitsubishi', 'Mazda', 'Subaru', 'Isuzu'],
  },
  european: {
    label: 'European',
    flag: 'EU',
    gradient: 'from-blue-600 to-blue-800',
    brands: ['BMW', 'Mercedes-Benz', 'Volkswagen', 'Audi', 'Peugeot', 'Volvo'],
  },
  indian: {
    label: 'Indian',
    flag: 'IN',
    gradient: 'from-orange-500 to-green-600',
    brands: ['TATA', 'Mahindra', 'Maruti Suzuki'],
  },
}

// Why Choose Us Features
export const features = [
  {
    id: 'genuine',
    title: '100% GENUINE PARTS',
    icon: GiShield,
    color: '#22C55E',
    description: 'Authentic OEM & premium aftermarket from trusted global manufacturers',
  },
  {
    id: 'expertise',
    title: 'EXPERT KNOWLEDGE',
    icon: GiTrophyCup,
    color: '#F59E0B',
    description: 'Professional automotive expertise serving Sri Lankan drivers',
  },
  {
    id: 'prices',
    title: 'COMPETITIVE PRICES',
    icon: LuTag,
    color: '#0077FF',
    description: 'Best market rates without ever compromising on quality',
  },
  {
    id: 'inventory',
    title: 'MASSIVE INVENTORY',
    icon: LuPackage,
    color: '#8B5CF6',
    description: 'Extensive stock covering Japanese, European & Indian vehicles',
  },
  {
    id: 'delivery',
    title: 'ISLANDWIDE DELIVERY',
    icon: LuTruck,
    color: '#FF5500',
    description: 'Fast, reliable shipping to anywhere in Sri Lanka',
  },
  {
    id: 'consultation',
    title: 'EXPERT CONSULTATION',
    icon: LuHeadphones,
    color: '#06B6D4',
    description: 'Technical advice to find exactly the right parts for your vehicle',
  },
]

// Testimonials
export const testimonials = [
  {
    id: 1,
    name: 'Kasun Perera',
    role: 'Workshop Owner, Colombo',
    quote: "Best spare parts supplier I've worked with in 15 years. Quality parts, fair prices, and they really know their stuff!",
    rating: 5,
    avatar: 'KP',
  },
  {
    id: 2,
    name: 'Anura Silva',
    role: 'Toyota Enthusiast',
    quote: "Found rare parts for my classic Corolla that no one else had. Super Motor Trading is now my only choice.",
    rating: 5,
    avatar: 'AS',
  },
  {
    id: 3,
    name: 'Nimali Fernando',
    role: 'Fleet Manager, Kandy',
    quote: "Managing 50+ vehicles is tough. These guys always deliver genuine parts on time. Absolutely reliable!",
    rating: 5,
    avatar: 'NF',
  },
  {
    id: 4,
    name: 'Roshan Jayawardena',
    role: 'BMW Owner',
    quote: "European parts at reasonable prices? I didn't believe it until I found Super Motor. Zero compromises.",
    rating: 5,
    avatar: 'RJ',
  },
]

// FAQ
export const faqs = [
  {
    id: 1,
    question: 'Do you offer warranties on parts?',
    answer: 'Absolutely! All genuine OEM parts come with full manufacturer warranty. Our aftermarket parts include our satisfaction guarantee.',
  },
  {
    id: 2,
    question: 'How fast is delivery?',
    answer: 'Colombo & suburbs: Same day or next day. Rest of Sri Lanka: 2-3 business days via trusted couriers.',
  },
  {
    id: 3,
    question: "Can I return parts if they don't fit?",
    answer: 'Yes! Unused parts in original packaging within 7 days for exchange or refund.',
  },
  {
    id: 4,
    question: 'Do you source hard-to-find parts?',
    answer: "That's our specialty! We can source most parts within 3-7 days from our global network.",
  },
  {
    id: 5,
    question: 'Do you offer installation services?',
    answer: 'We focus on parts supply but partner with trusted mechanics we can recommend.',
  },
]

// Trust Badges
export const trustBadges = [
  { icon: GiShield, text: 'Genuine Parts' },
  { icon: GiGears, text: 'Expert Advice' },
  { icon: LuTruck, text: 'Fast Delivery' },
]

// Hero floating parts for animation
export const floatingParts = [
  { icon: GiCog, size: 60, delay: 0 },
  { icon: GiMechanicalArm, size: 50, delay: 0.2 },
  { icon: GiSpanner, size: 45, delay: 0.4 },
  { icon: GiGears, size: 55, delay: 0.6 },
  { icon: GiCarWheel, size: 65, delay: 0.8 },
]
