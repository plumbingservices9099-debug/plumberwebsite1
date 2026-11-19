import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  INDEXABLE_ROUTES,
  ROUTE_REGISTRY,
  RouteMeta,
  buildAbsoluteOrPathUrl,
  buildStructuredDataJson,
  resolveProductionSiteUrl,
} from '../src/routes';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const SSR_DIR = path.join(ROOT_DIR, 'dist-ssr');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function injectRouteIntoTemplate(
  template: string,
  route: RouteMeta,
  appHtml: string,
  siteUrl: string
): string {
  const canonicalUrl = buildAbsoluteOrPathUrl(siteUrl, route.path);
  const ogImageUrl = buildAbsoluteOrPathUrl(siteUrl, route.ogImage);
  const jsonLd = buildStructuredDataJson(route, siteUrl);
  const jsonLdTag = jsonLd
    ? `<script type="application/ld+json">${jsonLd}</script>`
    : '';

  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtmlAttr(route.title)}</title>`);
  html = html.replace(
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${escapeHtmlAttr(route.description)}" />`
  );
  html = html.replace(
    /<meta\s+name="robots"[\s\S]*?\/>/,
    `<meta name="robots" content="${escapeHtmlAttr(route.robots)}" />`
  );
  const canonicalTag =
    route.key === 'not-found'
      ? ''
      : `<link rel="canonical" href="${escapeHtmlAttr(canonicalUrl)}" />`;
  html = html.replace('<!--canonical-tag-->', canonicalTag);
  html = html.replace(
    /<meta\s+property="og:url"[\s\S]*?\/>/,
    `<meta property="og:url" content="${escapeHtmlAttr(canonicalUrl)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"[\s\S]*?\/>/,
    `<meta property="og:title" content="${escapeHtmlAttr(route.title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${escapeHtmlAttr(route.description)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image"[\s\S]*?\/>/,
    `<meta property="og:image" content="${escapeHtmlAttr(ogImageUrl)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image:alt"[\s\S]*?\/>/,
    `<meta property="og:image:alt" content="${escapeHtmlAttr(route.ogImageAlt)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"[\s\S]*?\/>/,
    `<meta name="twitter:title" content="${escapeHtmlAttr(route.title)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"[\s\S]*?\/>/,
    `<meta name="twitter:description" content="${escapeHtmlAttr(route.description)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"[\s\S]*?\/>/,
    `<meta name="twitter:image" content="${escapeHtmlAttr(ogImageUrl)}" />`
  );

  const lcpWebpPath = route.ogImage.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const lcpWebpUrl = buildAbsoluteOrPathUrl(siteUrl, lcpWebpPath);
  const preloadLcpTag =
    route.key === 'not-found'
      ? ''
      : `<link rel="preload" as="image" href="${escapeHtmlAttr(lcpWebpUrl)}" type="image/webp" fetchpriority="high" />`;

  html = html.replace('<!--preload-lcp-->', preloadLcpTag);
  html = html.replace('<!--structured-data-->', jsonLdTag);
  html = html.replace('<!--app-html-->', appHtml);

  return html;
}

async function run() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    throw new Error(`Missing built template at ${TEMPLATE_PATH}. Run vite build first.`);
  }

  const ssrEntryFile = fs
    .readdirSync(SSR_DIR)
    .find((file) => file.startsWith('entry-server') && (file.endsWith('.js') || file.endsWith('.mjs')));

  if (!ssrEntryFile) {
    throw new Error(`Missing SSR bundle inside ${SSR_DIR}.`);
  }

  const ssrModule = (await import(pathToFileURL(path.join(SSR_DIR, ssrEntryFile)).href)) as {
    render: (pathname: string) => string;
  };

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
  const rawSiteUrl = process.env.SITE_URL || process.env.VITE_SITE_URL || '';
  const siteUrl = resolveProductionSiteUrl(rawSiteUrl);

  const routesToPrerender: RouteMeta[] = [...INDEXABLE_ROUTES, ROUTE_REGISTRY['not-found']];

  for (const route of routesToPrerender) {
    const appHtml = ssrModule.render(route.path);
    const fullHtml = injectRouteIntoTemplate(template, route, appHtml, siteUrl);

    if (route.path === '/') {
      fs.writeFileSync(path.join(DIST_DIR, 'index.html'), fullHtml, 'utf-8');
    } else if (route.key === 'not-found') {
      fs.writeFileSync(path.join(DIST_DIR, '404.html'), fullHtml, 'utf-8');
    } else {
      const slug = route.path.replace(/^\/+/, '');
      const routeDir = path.join(DIST_DIR, slug);
      fs.mkdirSync(routeDir, { recursive: true });
      fs.writeFileSync(path.join(routeDir, 'index.html'), fullHtml, 'utf-8');
    }
  }

  // Generate sitemap.xml matching canonical URLs
  const sitemapComment = siteUrl
    ? ''
    : '\n<!-- NOTE: Set SITE_URL=https://yourdomain.com before building for production to emit absolute https:// sitemap URLs. -->';
  const sitemapEntries = INDEXABLE_ROUTES.map((route) => {
    const loc = escapeXml(buildAbsoluteOrPathUrl(siteUrl, route.path));
    const priority = route.path === '/' ? '1.0' : '0.8';
    return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  }).join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>${sitemapComment}\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');

  // Generate robots.txt
  const sitemapDirective = siteUrl
    ? `Sitemap: ${siteUrl}/sitemap.xml`
    : `# Set SITE_URL=https://yourdomain.com before building for absolute Sitemap URL\nSitemap: /sitemap.xml`;
  const robotsTxt = `User-agent: *\nAllow: /\n\n${sitemapDirective}\n`;
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt, 'utf-8');

  // Remove temporary SSR directory
  fs.rmSync(SSR_DIR, { recursive: true, force: true });

  console.log(
    `[prerender] Generated ${routesToPrerender.length} static HTML pages, sitemap.xml, and robots.txt (SITE_URL=${
      siteUrl || 'not configured / relative mode'
    }).`
  );
}

run().catch((err) => {
  console.error('[prerender] Failed:', err);
  process.exit(1);
});
