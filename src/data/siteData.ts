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
  mobile: '+94 77 729 1364', // Main CTA number
  whatsapp: '+94 70 434 4855',
  whatsappLink: 'https://wa.me/94704344855?text=Hello!%20I\'m%20interested%20in%20spare%20parts.',
  email: 'info@supermotortrading.com',
  facebook: 'https://web.facebook.com/profile.php?id=100093416801357',
  callLink: 'tel:+94777291364', // Main CTA number
  emailLink: 'mailto:info@supermotortrading.com',
  mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15839.84597074193!2d79.93082106113437!3d7.013811683006321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2f9e611191f29%3A0x535298232b68ba21!2sSuper%20Motor%20Trading!5e0!3m2!1sen!2slk!4v1770136563857!5m2!1sen!2slk',
  mapsLink: 'https://maps.app.goo.gl/VggYinnmNNcuXFDc7',
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
    description: 'Authentic quality guaranteed',
    icon: GiShield,
  },
  {
    value: 10000,
    suffix: '+',
    label: 'PARTS IN STOCK',
    color: '#0077FF',
    description: 'Wide range available',
    icon: LuPackage,
  },
  {
    value: 500,
    suffix: '+',
    label: 'HAPPY CUSTOMERS',
    color: '#22C55E',
    description: 'Satisfied drivers across Sri Lanka',
    icon: GiTrophyCup,
  },
  {
    value: 25,
    suffix: '+',
    label: 'YEARS EXPERIENCE',
    color: '#8B5CF6',
    description: 'Trusted automotive expertise',
    icon: GiSpanner,
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
    image: '/images/engine-parts.png',
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
    image: '/images/brake-parts.png',
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
    image: '/images/suspension-parts.png',
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
    image: '/images/transmission-parts.png',
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
    image: '/images/filters-parts.png',
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
    image: '/images/cooling-parts.png',
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
    image: '/images/belts-parts.png',
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
    image: '/images/bearings-parts.png',
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
    brands: ['Mahindra', 'Maruti Suzuki'],
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
    stat: '100%',
    statLabel: 'Genuine',
  },
  {
    id: 'expertise',
    title: 'EXPERT KNOWLEDGE',
    icon: GiTrophyCup,
    color: '#F59E0B',
    description: 'Professional automotive expertise serving Sri Lankan drivers',
    stat: '25+',
    statLabel: 'Years Experience',
  },
  {
    id: 'prices',
    title: 'COMPETITIVE PRICES',
    icon: LuTag,
    color: '#0077FF',
    description: 'Best market rates without ever compromising on quality',
    stat: '30%',
    statLabel: 'Avg. Savings',
  },
  {
    id: 'inventory',
    title: 'MASSIVE INVENTORY',
    icon: LuPackage,
    color: '#8B5CF6',
    description: 'Extensive stock covering Japanese, European & Indian vehicles',
    stat: '10K+',
    statLabel: 'Parts Available',
  },
  {
    id: 'delivery',
    title: 'ISLANDWIDE DELIVERY',
    icon: LuTruck,
    color: '#FF5500',
    description: 'Fast, reliable shipping to anywhere in Sri Lanka',
    stat: '24h',
    statLabel: 'Colombo Delivery',
  },
  {
    id: 'consultation',
    title: 'EXPERT CONSULTATION',
    icon: LuHeadphones,
    color: '#06B6D4',
    description: 'Technical advice to find exactly the right parts for your vehicle',
    stat: '7/7',
    statLabel: 'Days Available',
  },
]

// Testimonials
export const testimonials = [
  {
    id: 1,
    name: 'Kasun Perera',
    role: 'Workshop Owner',
    company: 'KP Auto Services, Colombo',
    quote: "Best spare parts supplier I've worked with in 15 years. Quality parts, fair prices, and they really know their stuff!",
    rating: 5,
    avatar: 'KP',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 2,
    name: 'Anura Silva',
    role: 'Car Enthusiast',
    company: 'Toyota Club Sri Lanka',
    quote: "Found rare parts for my classic Corolla that no one else had. Super Motor Trading is now my only choice.",
    rating: 5,
    avatar: 'AS',
    photo: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    id: 3,
    name: 'Nimali Fernando',
    role: 'Fleet Manager',
    company: 'Express Logistics, Kandy',
    quote: "Managing 50+ vehicles is tough. These guys always deliver genuine parts on time. Absolutely reliable!",
    rating: 5,
    avatar: 'NF',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 4,
    name: 'Roshan Jayawardena',
    role: 'BMW Owner',
    company: 'Verified Customer',
    quote: "European parts at reasonable prices? I didn't believe it until I found Super Motor. Zero compromises.",
    rating: 5,
    avatar: 'RJ',
    photo: 'https://randomuser.me/api/portraits/men/67.jpg',
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
