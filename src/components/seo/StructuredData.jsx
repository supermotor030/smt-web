import { Helmet } from 'react-helmet-async'
import { company, contact, faqs } from '../../data/siteData'

/**
 * StructuredData - JSON-LD for LocalBusiness SEO
 */
export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AutoPartsStore',
    '@id': 'https://supermotortrading.lk/#business',
    name: company.name,
    alternateName: 'Super Motor Trading',
    description: company.tagline,
    url: 'https://supermotortrading.lk',
    logo: 'https://supermotortrading.lk/logo.jpg',
    image: 'https://supermotortrading.lk/og-image.svg',
    telephone: contact.storePhone,
    email: contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '160/1/B, Ihalakaragahamuna',
      addressLocality: 'Kadawatha',
      addressRegion: 'Western Province',
      postalCode: '11850',
      addressCountry: 'LK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 7.0138,
      longitude: 79.9549,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    priceRange: '$$',
    currenciesAccepted: 'LKR',
    paymentAccepted: 'Cash, Bank Transfer',
    areaServed: {
      '@type': 'Country',
      name: 'Sri Lanka',
    },
    sameAs: [
      contact.facebook,
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Auto Parts Catalog',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Engine Parts',
          description: 'Pistons, Gaskets, Timing Belts, Valves',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Brake System',
          description: 'Brake Pads, Discs, Calipers, Lines',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Suspension',
          description: 'Shock Absorbers, Springs, Control Arms',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Electrical',
          description: 'Batteries, Alternators, Starters, Sensors',
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
  }

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://supermotortrading.lk/#website',
    url: 'https://supermotortrading.lk',
    name: company.name,
    description: company.tagline,
    publisher: {
      '@id': 'https://supermotortrading.lk/#business',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://supermotortrading.lk/?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://supermotortrading.lk',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: 'https://supermotortrading.lk/#products',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Contact',
        item: 'https://supermotortrading.lk/#contact',
      },
    ],
  }

  // FAQ Schema for rich snippets
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <Helmet>
      {/* LocalBusiness Schema */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Website Schema */}
      <script type="application/ld+json">
        {JSON.stringify(websiteData)}
      </script>
      
      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
      
      {/* FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify(faqData)}
      </script>
    </Helmet>
  )
}
