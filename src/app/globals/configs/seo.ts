import { PageSeoConfig, SeoConfig } from '../types/types';

export const GLOBAL_SEO_CONFIG: { default: SeoConfig; pages: PageSeoConfig } = {
  default: {
    title: 'TrackCargo - AWB & Container Tracking',
    description: 'Track your air and sea shipments in real-time with TrackCargo. Stay updated on your cargo status.',
    keywords: 'shipment tracking, air cargo, sea freight, container tracking, AWB tracking',
    image: '',
    url: 'https://trackcargo.co',

    metaTags: [
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'TrackCargo' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],

    ogTags: [
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'TrackCargo' },
      { property: 'og:title', content: 'TrackCargo - AWB & Container Tracking' },
      { property: 'og:description', content: 'Track your air and sea shipments in real-time with TrackCargo.' },
      { property: 'og:image', content: '' },
      { property: 'og:url', content: 'https://trackcargo.co' },
    ],

    twitterTags: [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@TrackCargo' },
      { name: 'twitter:title', content: 'TrackCargo - AWB & Container Tracking' },
      { name: 'twitter:description', content: 'Track your air and sea shipments in real-time with TrackCargo.' },
      { name: 'twitter:image', content: '' },
    ],
  },

  pages: {
    'track/sea': {
      title: 'Sea Freight Tracking - Container Status | TrackCargo',
      description: 'Track your sea freight shipments with real-time updates on container status.',
      keywords: 'sea freight tracking, container tracking, maritime shipments',
      url: 'https://trackcargo.co/track/sea',
      image: '',

      ogTags: [
        { property: 'og:image', content: '' },
        { property: 'og:url', content: 'https://trackcargo.co/track/sea' },
      ],

      twitterTags: [{ name: 'twitter:image', content: '' }],

      jsonLdSchema: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'TrackCargo - Sea Freight Tracking',
        url: 'https://trackcargo.co/track/sea',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://trackcargo.co/track/sea/{search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    },

    'track/air': {
      title: 'Air Cargo Tracking - AWB Status | TrackCargo',
      description: 'Monitor your air cargo shipments in real-time with our AWB tracking system.',
      keywords: 'air cargo tracking, airway bill tracking, air shipments',
      url: 'https://trackcargo.co/track/air',
      image: '',

      ogTags: [
        { property: 'og:image', content: '' },
        { property: 'og:url', content: 'https://trackcargo.co/track/air' },
      ],

      twitterTags: [{ name: 'twitter:image', content: '' }],

      jsonLdSchema: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'TrackCargo - Air Cargo Tracking',
        url: 'https://trackcargo.co/track/air',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://trackcargo.co/track/sea/{search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    },
  },
};
