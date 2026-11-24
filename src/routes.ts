import {
  BUSINESS_EMAIL,
  BUSINESS_PHONE_TEL,
  FAQ_ITEMS,
  HOME_SERVICE_AREAS,
} from './data/plumbingData';

export type PageRoute =
  | 'home'
  | 'installation-replacement'
  | 'drain-sewer'
  | 'new-construction'
  | 'maintenance-inspection'
  | 'not-found';

export interface RouteMeta {
  key: PageRoute;
  path: string;
  label: string;
  shortLabel: string;
  title: string;
  description: string;
  ogImage: string;
  ogImageAlt: string;
  robots: string;
  serviceType?: string;
  serviceDescription?: string;
}

export const SITE_NAME = 'FIXIT PLUMBER';

export const ROUTE_REGISTRY: Record<PageRoute, RouteMeta> = {
  home: {
    key: 'home',
    path: '/',
    label: 'Home',
    shortLabel: 'Home',
    title: 'FIXIT PLUMBER – Plumbing Repair & Installation in Patna',
    description:
      'FIXIT PLUMBER provides residential leak repair, pipe fitting, bathroom fittings, drainage, tank and pump services in Patna, Bihar. Call +91 9507611252.',
    ogImage: '/images/hero-bg.jpg',
    ogImageAlt: 'FIXIT PLUMBER residential plumbing services in Patna',
    robots: 'index, follow',
  },
  'installation-replacement': {
    key: 'installation-replacement',
    path: '/installation-replacement',
    label: 'Installation & Replacement',
    shortLabel: 'Installation & Replacement',
    title: 'Installation & Replacement in Patna | FIXIT PLUMBER',
    description:
      'Get water pipe installation and replacement, water heater, sump pump, and heat pump plumbing connections in Patna from FIXIT PLUMBER. Call +91 9507611252.',
    ogImage: '/images/ir-pipe-installation.jpg',
    ogImageAlt: 'Water pipe installation and replacement in Patna by FIXIT PLUMBER',
    robots: 'index, follow',
    serviceType: 'Plumbing Installation & Replacement',
    serviceDescription:
      'Residential water pipe installation and replacement, water heater plumbing connections, sump pump installation, and heat pump water pipe connections in Patna, Bihar.',
  },
  'drain-sewer': {
    key: 'drain-sewer',
    path: '/drain-sewer-services',
    label: 'Drain & Sewer Services',
    shortLabel: 'Drain & Sewer Services',
    title: 'Drain & Sewer Services in Patna | FIXIT PLUMBER',
    description:
      'Drainage system installation and sewer line repair or replacement for Patna homes by FIXIT PLUMBER, helping prevent leaks and blockages. Call +91 9507611252.',
    ogImage: '/images/ds-drainage-installation.jpg',
    ogImageAlt: 'Drainage system installation and sewer line repair in Patna by FIXIT PLUMBER',
    robots: 'index, follow',
    serviceType: 'Drain & Sewer Plumbing Services',
    serviceDescription:
      'Residential drainage system installation, bathroom and kitchen drainage pipelines, and sewer line repair and replacement services in Patna, Bihar.',
  },
  'new-construction': {
    key: 'new-construction',
    path: '/new-construction-remodeling',
    label: 'New Construction & Remodeling',
    shortLabel: 'New Construction & Remodeling',
    title: 'New Construction & Remodeling in Patna | FIXIT PLUMBER',
    description:
      'Complete plumbing for new homes, full home re-piping, and bathroom or kitchen remodeling in Patna, Bihar by FIXIT PLUMBER. Call +91 9507611252.',
    ogImage: '/images/nc-new-construction.jpg',
    ogImageAlt: 'New construction and home remodeling plumbing in Patna by FIXIT PLUMBER',
    robots: 'index, follow',
    serviceType: 'New Construction & Remodeling Plumbing',
    serviceDescription:
      'New residential construction plumbing setup, full home water pipeline re-piping, and bathroom and kitchen remodeling plumbing services in Patna, Bihar.',
  },
  'maintenance-inspection': {
    key: 'maintenance-inspection',
    path: '/plumbing-maintenance-inspection',
    label: 'Comprehensive Plumbing Maintenance and Inspection Program',
    shortLabel: 'Plumbing Maintenance & Inspection',
    title: 'Plumbing Maintenance & Inspection in Patna | FIXIT PLUMBER',
    description:
      'Annual plumbing checkups, preventive plans, seasonal inspections, and commercial maintenance in Patna by FIXIT PLUMBER. Call +91 9507611252.',
    ogImage: '/images/pm-annual-checkup.jpg',
    ogImageAlt: 'Plumbing maintenance and inspection services in Patna by FIXIT PLUMBER',
    robots: 'index, follow',
    serviceType: 'Plumbing Maintenance & Inspection',
    serviceDescription:
      'Annual plumbing checkups, preventive maintenance plans, seasonal pipe and drainage inspections, and commercial plumbing maintenance in Patna, Bihar.',
  },
  'not-found': {
    key: 'not-found',
    path: '/404',
    label: 'Page Not Found',
    shortLabel: '404',
    title: 'Page Not Found | FIXIT PLUMBER',
    description:
      'The requested page could not be found on FIXIT PLUMBER. Explore our plumbing services in Patna or contact us on +91 9507611252.',
    ogImage: '/images/hero-bg.jpg',
    ogImageAlt: 'FIXIT PLUMBER Patna plumbing services',
    robots: 'noindex, nofollow',
  },
};

export const INDEXABLE_ROUTES: RouteMeta[] = [
  ROUTE_REGISTRY.home,
  ROUTE_REGISTRY['installation-replacement'],
  ROUTE_REGISTRY['drain-sewer'],
  ROUTE_REGISTRY['new-construction'],
  ROUTE_REGISTRY['maintenance-inspection'],
];

export const LEGACY_HASH_TO_PATH: Record<string, string> = {
  '#/installation-replacement': ROUTE_REGISTRY['installation-replacement'].path,
  '#/drain-sewer-services': ROUTE_REGISTRY['drain-sewer'].path,
  '#/new-construction-remodeling': ROUTE_REGISTRY['new-construction'].path,
  '#/plumbing-maintenance-inspection': ROUTE_REGISTRY['maintenance-inspection'].path,
};

export function normalizePathname(rawPathname: string): string {
  const pathOnly = rawPathname.split('?')[0].split('#')[0];
  let cleaned = pathOnly.replace(/\/index\.html$/i, '/');
  if (cleaned.length > 1 && cleaned.endsWith('/')) {
    cleaned = cleaned.slice(0, -1);
  }
  return cleaned || '/';
}

export function getRouteByPathname(rawPathname: string): RouteMeta {
  const normalized = normalizePathname(rawPathname);
  const found = INDEXABLE_ROUTES.find((route) => route.path === normalized);
  return found ?? ROUTE_REGISTRY['not-found'];
}

export const DEFAULT_PRODUCTION_SITE_URL = 'https://www.fixitplumber.in';

/**
 * Resolves configured production SITE_URL, explicitly ignoring preview URLs
 * (such as *.run.app) or localhost so preview hosts are never published as canonicals.
 * Falls back to the official production domain https://www.fixitplumber.in.
 */
export function resolveProductionSiteUrl(rawSiteUrl?: string): string {
  if (!rawSiteUrl) return DEFAULT_PRODUCTION_SITE_URL;
  const trimmed = rawSiteUrl.trim().replace(/\/+$/, '');
  if (!trimmed) return DEFAULT_PRODUCTION_SITE_URL;
  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.toLowerCase();
    if (
      host.endsWith('.run.app') ||
      host === 'localhost' ||
      host === '127.0.0.1' ||
      trimmed.includes('MY_SITE_URL')
    ) {
      return DEFAULT_PRODUCTION_SITE_URL;
    }
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return DEFAULT_PRODUCTION_SITE_URL;
  }
}

export function buildAbsoluteOrPathUrl(siteUrl: string, path: string): string {
  return siteUrl ? `${siteUrl}${path}` : path;
}

export function buildStructuredDataJson(route: RouteMeta, siteUrl: string): string {
  if (route.key === 'not-found') {
    return '';
  }

  const businessId = siteUrl ? `${siteUrl}/#business` : '#business';
  const homeUrl = buildAbsoluteOrPathUrl(siteUrl, '/');
  const pageUrl = buildAbsoluteOrPathUrl(siteUrl, route.path);
  const logoUrl = buildAbsoluteOrPathUrl(siteUrl, '/images/logo.png');
  const businessImageUrl = buildAbsoluteOrPathUrl(siteUrl, ROUTE_REGISTRY.home.ogImage);
  const serviceImageUrl = buildAbsoluteOrPathUrl(siteUrl, route.ogImage);

  const plumberEntity: Record<string, unknown> = {
    '@type': 'Plumber',
    '@id': businessId,
    name: SITE_NAME,
    description: ROUTE_REGISTRY.home.description,
    url: homeUrl,
    telephone: BUSINESS_PHONE_TEL.replace('tel:', ''),
    email: BUSINESS_EMAIL,
    image: businessImageUrl,
    logo: logoUrl,
    founder: {
      '@type': 'Person',
      name: 'Rishabh Kumar',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pure Ganga Vihar Colony',
      addressLocality: 'Patna',
      addressRegion: 'Bihar',
      addressCountry: 'IN',
    },
    areaServed: HOME_SERVICE_AREAS.map((area) => ({
      '@type': 'Place',
      name: area === 'Patna' ? 'Patna, Bihar, India' : `${area}, Patna, Bihar, India`,
    })),
  };

  const graph: Record<string, unknown>[] = [plumberEntity];

  if (route.key === 'home') {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  } else {
    graph.push({
      '@type': 'Service',
      name: route.serviceType ?? route.label,
      serviceType: route.serviceType ?? route.label,
      description: route.serviceDescription ?? route.description,
      image: serviceImageUrl,
      provider: { '@id': businessId },
      areaServed: {
        '@type': 'City',
        name: 'Patna',
      },
      url: pageUrl,
    });

    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: buildAbsoluteOrPathUrl(siteUrl, '/'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: route.shortLabel,
          item: pageUrl,
        },
      ],
    });
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  });
}
