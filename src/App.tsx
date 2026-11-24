import { useState, useEffect, useCallback } from 'react';
import { Phone, MessageCircle, ArrowRight, ChevronDown, Mail } from 'lucide-react';
import { Header } from './components/Header';
import { ContactForm } from './components/ContactForm';
import { StatsSection } from './components/StatsSection';
import { ServiceAreasSection } from './components/ServiceAreasSection';
import { AppLink } from './components/AppLink';
import { OptimizedImage } from './components/OptimizedImage';
import { InstallationReplacementPage } from './pages/InstallationReplacementPage';
import { DrainSewerPage } from './pages/DrainSewerPage';
import { NewConstructionPage } from './pages/NewConstructionPage';
import { MaintenanceInspectionPage } from './pages/MaintenanceInspectionPage';
import { WhyIcon, PlumberMascotSvg, WhatsAppLogoIcon } from './components/Icons';
import {
  PageRoute,
  ROUTE_REGISTRY,
  LEGACY_HASH_TO_PATH,
  getRouteByPathname,
  normalizePathname,
  resolveProductionSiteUrl,
  buildAbsoluteOrPathUrl,
  buildStructuredDataJson,
} from './routes';
import {
  BUSINESS_EMAIL,
  BUSINESS_EMAIL_LINK,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_TEL,
  BUSINESS_WHATSAPP_LINK,
  BUSINESS_WHATSAPP_URL,
  HERO_FEATURES,
  WHY_CHOOSE_CARDS,
  PLUMBING_SERVICES,
  CATEGORY_CARDS,
  PROCESS_STEPS,
  FAQ_ITEMS,
  FOOTER_SERVICES,
} from './data/plumbingData';

interface AppProps {
  initialPath?: string;
}

export default function App({ initialPath = '/' }: AppProps) {
  const [currentPage, setCurrentPage] = useState<PageRoute>(
    () => getRouteByPathname(initialPath).key
  );
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState('');
  const [contactIntent, setContactIntent] = useState<'call' | 'whatsapp' | 'request' | null>(null);
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>(() =>
    FAQ_ITEMS.reduce((acc, _, idx) => ({ ...acc, [idx]: true }), {})
  );

  const navigateToHref = useCallback((rawHref: string, replace = false) => {
    const [pathPart, hashPart] = rawHref.split('#');
    const targetPath = normalizePathname(pathPart || '/');
    const targetRoute = getRouteByPathname(targetPath);
    const fullUrl = hashPart ? `${targetPath}#${hashPart}` : targetPath;

    if (typeof window !== 'undefined') {
      const currentFull = `${normalizePathname(window.location.pathname)}${window.location.hash}`;
      if (currentFull !== fullUrl) {
        if (replace) {
          window.history.replaceState(null, '', fullUrl);
        } else {
          window.history.pushState(null, '', fullUrl);
        }
      }
    }

    setCurrentPage(targetRoute.key);

    if (hashPart) {
      setPendingScrollId(hashPart);
    } else if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Handle legacy hash links (#/installation-replacement, etc.), section hashes, and popstate
  useEffect(() => {
    const currentHash = window.location.hash;
    if (currentHash && LEGACY_HASH_TO_PATH[currentHash]) {
      navigateToHref(LEGACY_HASH_TO_PATH[currentHash], true);
    } else if (currentHash && currentHash.length > 1) {
      setPendingScrollId(currentHash.slice(1));
    }

    const syncFromBrowserLocation = () => {
      const hash = window.location.hash;
      if (hash && LEGACY_HASH_TO_PATH[hash]) {
        navigateToHref(LEGACY_HASH_TO_PATH[hash], true);
        return;
      }

      const matched = getRouteByPathname(window.location.pathname);
      setCurrentPage(matched.key);

      if (hash && hash.length > 1) {
        setPendingScrollId(hash.slice(1));
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const onCustomNavigate = (e: Event) => {
      const detail = (e as CustomEvent<{ href?: string }>).detail;
      if (detail?.href) {
        navigateToHref(detail.href);
      }
    };

    window.addEventListener('popstate', syncFromBrowserLocation);
    window.addEventListener('hashchange', syncFromBrowserLocation);
    window.addEventListener('fixit:navigate', onCustomNavigate);
    return () => {
      window.removeEventListener('popstate', syncFromBrowserLocation);
      window.removeEventListener('hashchange', syncFromBrowserLocation);
      window.removeEventListener('fixit:navigate', onCustomNavigate);
    };
  }, [navigateToHref]);

  // Synchronize document title, meta description, robots, and canonical during SPA transitions
  useEffect(() => {
    const meta = ROUTE_REGISTRY[currentPage];
    document.title = meta.title;

    const setMetaTag = (attrName: 'name' | 'property', key: string, value: string) => {
      const el = document.querySelector(`meta[${attrName}="${key}"]`);
      if (el) el.setAttribute('content', value);
    };

    setMetaTag('name', 'description', meta.description);
    setMetaTag('name', 'robots', meta.robots);
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);

    const siteUrl = resolveProductionSiteUrl(import.meta.env.VITE_SITE_URL);
    const canonicalHref = buildAbsoluteOrPathUrl(siteUrl, meta.path);
    const ogImageHref = buildAbsoluteOrPathUrl(siteUrl, meta.ogImage);
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (currentPage === 'not-found') {
      if (canonicalEl) canonicalEl.remove();
    } else {
      if (!canonicalEl) {
        canonicalEl = document.createElement('link');
        canonicalEl.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute('href', canonicalHref);
    }
    setMetaTag('property', 'og:url', canonicalHref);
    setMetaTag('property', 'og:image', ogImageHref);
    setMetaTag('property', 'og:image:alt', meta.ogImageAlt);
    setMetaTag('name', 'twitter:image', ogImageHref);

    const jsonLd = buildStructuredDataJson(meta, siteUrl);
    let ldScript = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLd) {
      if (ldScript) ldScript.remove();
    } else {
      if (!ldScript) {
        ldScript = document.createElement('script');
        ldScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(ldScript);
      }
      ldScript.textContent = jsonLd;
    }
  }, [currentPage]);

  useEffect(() => {
    if (pendingScrollId) {
      const targetId = pendingScrollId;
      const timer = setTimeout(() => {
        if (targetId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
        setPendingScrollId(null);
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [currentPage, pendingScrollId]);

  const handleActionClick = (mode: 'call' | 'whatsapp' | 'request', prefillService?: string) => {
    setContactIntent(mode);
    if (prefillService) {
      setSelectedService(prefillService);
    }

    const focusContactField = () => {
      const targetId = mode === 'call' ? 'mobileNumber' : 'fullName';
      const input = document.getElementById(targetId);
      if (input) input.focus({ preventScroll: true });
    };

    if (currentPage !== 'home') {
      navigateToHref('/#contact');
      setTimeout(focusContactField, 520);
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
        setTimeout(focusContactField, 450);
      }
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#EBF2E7] text-[#111827] overflow-x-clip">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[#002B5C] focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>
      {/* Header & Navigation */}
      <Header
        currentPage={currentPage}
        onActionClick={(mode) => handleActionClick(mode)}
      />

      <main id="main-content" className="flex-1">
        {currentPage === 'installation-replacement' ? (
          <InstallationReplacementPage onActionClick={(mode) => handleActionClick(mode)} />
        ) : currentPage === 'drain-sewer' ? (
          <DrainSewerPage onActionClick={(mode) => handleActionClick(mode)} />
        ) : currentPage === 'new-construction' ? (
          <NewConstructionPage />
        ) : currentPage === 'maintenance-inspection' ? (
          <MaintenanceInspectionPage onActionClick={(mode) => handleActionClick(mode)} />
        ) : currentPage === 'not-found' ? (
          <section className="bg-[#EBF2E7] py-20 px-5 sm:px-8 lg:px-14">
            <div className="max-w-[760px] mx-auto bg-white rounded-[20px] p-8 sm:p-12 text-center shadow-sm border border-black/5">
              <p className="text-[12px] font-bold tracking-[0.18em] uppercase text-[#135CB8]">
                404 ERROR
              </p>
              <h1 className="mt-3 text-[32px] sm:text-[42px] font-extrabold text-[#002B5C] tracking-tight">
                Page Not Found
              </h1>
              <p className="mt-4 text-[15px] sm:text-[16px] text-[#475569] leading-relaxed">
                The page you requested could not be found. Browse our plumbing services in Patna
                or return to the Home Page.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <AppLink
                  href="/"
                  className="bg-[#002B5C] text-white hover:bg-[#001F42] rounded-full px-7 py-2.5 text-[13.5px] font-semibold transition-colors"
                >
                  Back to Home
                </AppLink>
                <AppLink
                  href="/installation-replacement"
                  className="bg-[#EBF2E7] text-[#002B5C] hover:bg-[#DCE7D5] rounded-full px-5 py-2.5 text-[13px] font-medium transition-colors"
                >
                  Installation &amp; Replacement
                </AppLink>
                <AppLink
                  href="/drain-sewer-services"
                  className="bg-[#EBF2E7] text-[#002B5C] hover:bg-[#DCE7D5] rounded-full px-5 py-2.5 text-[13px] font-medium transition-colors"
                >
                  Drain &amp; Sewer Services
                </AppLink>
                <AppLink
                  href="/new-construction-remodeling"
                  className="bg-[#EBF2E7] text-[#002B5C] hover:bg-[#DCE7D5] rounded-full px-5 py-2.5 text-[13px] font-medium transition-colors"
                >
                  New Construction &amp; Remodeling
                </AppLink>
                <AppLink
                  href="/plumbing-maintenance-inspection"
                  className="bg-[#EBF2E7] text-[#002B5C] hover:bg-[#DCE7D5] rounded-full px-5 py-2.5 text-[13px] font-medium transition-colors"
                >
                  Maintenance &amp; Inspection
                </AppLink>
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* 2. Hero Section */}
            <section id="home" className="bg-[#EBF2E7] pt-3 pb-12 px-4 sm:px-8 lg:px-14 scroll-mt-[84px]">
              <div className="max-w-[1440px] mx-auto">
                <div className="relative rounded-[24px] overflow-hidden min-h-[540px] sm:min-h-[600px] lg:min-h-[700px] flex items-center shadow-sm">
                  <OptimizedImage
                    src="/images/hero-bg.jpg"
                    alt="Modern stone-tiled bathroom with chrome shower mixer, rain shower head, and wall-mounted toilet"
                    width={1800}
                    height={983}
                    priority
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  {/* Subtle left readability gradient matching warm interior lighting */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 w-full px-5 sm:px-12 lg:px-14 py-12 sm:py-14 max-w-[780px]">
                    <h1 className="text-white font-extrabold text-[32px] min-[360px]:text-[38px] sm:text-[56px] lg:text-[68px] leading-[1.05] sm:leading-[1.03] tracking-tight">
                      Residential{' '}
                      <br />
                      Plumbing{' '}
                      <br />
                      Services in{' '}
                      <br />
                      Patna
                    </h1>
                    <p className="mt-5 text-white/95 text-[15px] sm:text-[17px] leading-[1.55] max-w-[540px] font-normal">
                      Reliable Plumbing Solutions for Your Home. Expert Repairs, Quality
                      <br className="hidden sm:inline" /> Installation and 24/7 Emergency Plumbing
                      Support in Patna.
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <a
                        href={BUSINESS_PHONE_TEL}
                        className="bg-black text-white hover:bg-neutral-800 rounded-full px-6 sm:px-7 py-2.5 min-h-[44px] text-[13px] font-medium transition-colors cursor-pointer inline-flex items-center justify-center"
                      >
                        Call Now
                      </a>
                      <a
                        href={BUSINESS_WHATSAPP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-[#111827] hover:bg-neutral-100 rounded-full px-6 sm:px-7 py-2.5 min-h-[44px] text-[13px] font-medium transition-colors cursor-pointer inline-flex items-center justify-center"
                      >
                        WhatsApp Us
                      </a>
                      <AppLink
                        href="/#services"
                        className="bg-white text-[#111827] hover:bg-neutral-100 rounded-full px-6 sm:px-7 py-2.5 min-h-[44px] text-[13px] font-medium transition-colors cursor-pointer inline-flex items-center justify-center"
                      >
                        Explore All Services
                      </AppLink>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. About Section featuring Rishabh Kumar */}
            <section id="about" className="bg-[#EBF2E7] pt-12 pb-16 px-5 sm:px-8 lg:px-14 scroll-mt-[84px]">
              <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                <div className="lg:col-span-5">
                  <div className="rounded-[20px] overflow-hidden shadow-md bg-white">
                    <OptimizedImage
                      src="/images/about-card.jpg"
                      alt="FIXIT PLUMBER tool bag with pipe wrench, adjustable wrench, flexible hose, PTFE tape, and chrome faucet"
                      width={771}
                      height={957}
                      className="w-full h-auto object-cover block"
                    />
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <p className="text-[12px] font-medium tracking-[0.2em] uppercase text-[#1F2937]">
                    ABOUT FIXIT PLUMBER
                  </p>
                  <h2 className="mt-2.5 text-[28px] min-[375px]:text-[34px] sm:text-[44px] lg:text-[48px] font-extrabold text-[#111827] tracking-tight leading-[1.08]">
                    RISHABH KUMAR &mdash; LEAD PLUMBER
                  </h2>

                  <div className="mt-6 space-y-5 text-[16px] sm:text-[17px] leading-[1.6] text-[#1F2937] max-w-[660px]">
                    <p>
                      Expertise &amp; Dedication. FIXIT PLUMBER provides reliable and professional
                      plumbing solutions in Patna and surrounding areas. Led by Rishabh Kumar, with
                      over 12 years of practical experience, our focus is on quality workmanship,
                      dependable service and customer satisfaction.
                    </p>
                    <p>
                      From everyday plumbing repairs to{' '}
                      <AppLink
                        href={ROUTE_REGISTRY['installation-replacement'].path}
                        className="text-[#002B5C] font-medium underline decoration-[#002B5C]/40 underline-offset-2 hover:text-[#135CB8] transition-colors"
                      >
                        installation, replacement
                      </AppLink>{' '}
                      and{' '}
                      <AppLink
                        href={ROUTE_REGISTRY['maintenance-inspection'].path}
                        className="text-[#002B5C] font-medium underline decoration-[#002B5C]/40 underline-offset-2 hover:text-[#135CB8] transition-colors"
                      >
                        maintenance
                      </AppLink>{' '}
                      work, we aim to understand each customer&apos;s needs and provide suitable
                      solutions.
                    </p>
                  </div>

                  <ul className="mt-7 space-y-2 text-[15.5px] sm:text-[16.5px] text-[#1F2937]">
                    {HERO_FEATURES.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. Statistics and Experience Cards */}
            <StatsSection />

            {/* 5. Why Choose FIXIT PLUMBER? Section */}
            <section className="bg-[#EBF2E7] pt-10 pb-20 px-5 sm:px-8 lg:px-14">
              <div className="max-w-[1060px] mx-auto">
                <div className="text-center max-w-[640px] mx-auto">
                  <h2 className="text-[30px] sm:text-[36px] lg:text-[40px] font-extrabold text-[#002B5C] tracking-tight">
                    Why Choose FIXIT PLUMBER?
                  </h2>
                  <p className="mt-3 text-[14.5px] sm:text-[15.5px] text-[#475569] leading-relaxed">
                    We focus on providing dependable plumbing solutions with professional
                    workmanship and customer-focused service.
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {WHY_CHOOSE_CARDS.map((card) => (
                    <div
                      key={card.id}
                      className="bg-[#C3D2BA] rounded-[16px] py-9 px-8 text-center shadow-[0_6px_18px_rgba(0,0,0,0.09)] border border-black/5"
                    >
                      <WhyIcon type={card.id} />
                      <h3 className="text-[17px] font-bold text-[#002B5C] mb-2">{card.title}</h3>
                      <p className="text-[13.5px] text-[#475569] leading-relaxed max-w-[340px] mx-auto">
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 6. Our Professional Plumbing Services Grid */}
            <section id="services" className="bg-white pt-20 pb-14 px-5 sm:px-8 lg:px-14 scroll-mt-[84px]">
              <div className="max-w-[1160px] mx-auto">
                <div className="text-center">
                  <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-extrabold text-[#002B5C] uppercase leading-[1.2] tracking-tight">
                    OUR PROFESSIONAL
                    <br />
                    PLUMBING SERVICES
                  </h2>
                  <p className="mt-10 text-[14.5px] sm:text-[15.5px] text-[#475569] max-w-[600px] mx-auto leading-relaxed">
                    Reliable and Professional Plumbing Solutions for Your Home. Quality Workmanship
                    and Trusted Plumbing Services in Patna.
                  </p>
                </div>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                  {PLUMBING_SERVICES.map((srv) => (
                    <article
                      key={srv.id}
                      id={`service-${srv.id}`}
                      className="scroll-mt-[96px] bg-[#ECF3E8] rounded-[18px] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md border border-black/[0.04]"
                    >
                      <AppLink
                        href="/#contact"
                        onClick={() => handleActionClick('request', srv.title)}
                        className="block p-5 text-center rounded-[18px] h-full focus:outline-none focus:ring-2 focus:ring-[#135CB8]"
                      >
                        <div className="rounded-[12px] overflow-hidden mb-4 aspect-[525/349] bg-[#DDE6D7]">
                          <OptimizedImage
                            src={srv.image}
                            alt={srv.imageAlt}
                            width={srv.width}
                            height={srv.height}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-[17px] font-bold text-[#002B5C] leading-snug mb-2">
                          {srv.title}
                        </h3>
                        <p className="text-[13.5px] text-[#475569] leading-relaxed px-2">
                          {srv.description}
                        </p>
                      </AppLink>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* 7. Plumbing Category Cards */}
            <section id="service-categories" className="bg-white pt-10 pb-20 px-5 sm:px-8 lg:px-14 overflow-x-clip">
              <h2 className="sr-only">Specialized Plumbing Service Categories in Patna</h2>
              <div className="max-w-[1060px] mx-auto grid grid-cols-1 md:grid-cols-2 md:auto-rows-fr gap-x-10 lg:gap-x-16 gap-y-24">
                {CATEGORY_CARDS.map((cat) => {
                  const categoryHref =
                    cat.id === 'installation'
                      ? ROUTE_REGISTRY['installation-replacement'].path
                      : cat.id === 'drain-sewer'
                      ? ROUTE_REGISTRY['drain-sewer'].path
                      : cat.id === 'new-construction'
                      ? ROUTE_REGISTRY['new-construction'].path
                      : cat.id === 'maintenance'
                      ? ROUTE_REGISTRY['maintenance-inspection'].path
                      : '/#services';

                  return (
                    <div key={cat.id} className="relative pb-12 h-full">
                      <AppLink
                        href={categoryHref}
                        aria-label={cat.title}
                        className="bg-[#EFF4E8] border-2 border-[#6C7F33] rounded-tl-[44px] rounded-tr-[44px] rounded-br-[44px] rounded-bl-none p-7 sm:p-8 flex flex-col justify-between min-h-[250px] h-full cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#6C7F33]"
                      >
                        <div>
                          <h3
                            className={`font-bold text-[#111827] leading-snug mb-2.5 ${
                              cat.id === 'maintenance'
                                ? 'text-[17px] sm:text-[18.5px]'
                                : 'text-[20px] sm:text-[22px]'
                            }`}
                          >
                            {cat.title}
                          </h3>
                          <p
                            className={`text-[#1F2937] underline decoration-1 underline-offset-2 mb-5 ${
                              cat.id === 'maintenance'
                                ? 'text-[13.5px] leading-[1.45]'
                                : 'text-[14.5px] leading-[1.55]'
                            }`}
                          >
                            {cat.description}
                          </p>
                        </div>

                        <span className="w-full bg-white border border-[#1F2937]/45 hover:bg-neutral-50 text-[#111827] rounded-full py-2.5 px-6 text-[12px] font-medium tracking-wider uppercase flex items-center justify-center gap-2 transition-colors">
                          <span>EXPLORE SERVICES</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </span>
                      </AppLink>

                      {/* Mascot overlapping bottom-left corner */}
                      <PlumberMascotSvg className="w-24 h-28 absolute -bottom-2 -left-4 sm:-left-7 lg:-left-9 pointer-events-none select-none" />
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 8. Service Enquiry CTA Section */}
            <section className="bg-white pt-4 pb-16 px-5 sm:px-8 lg:px-14">
              <div className="max-w-[1160px] mx-auto bg-[#5C6B55] rounded-[24px] py-12 px-6 sm:px-12 text-center shadow-[0_14px_30px_rgba(0,0,0,0.14)]">
                <h2 className="text-[28px] sm:text-[34px] font-extrabold text-white tracking-tight">
                  Need Professional Plumbing Services?
                </h2>
                <p className="mt-3 text-white/85 text-[14.5px] sm:text-[15.5px] max-w-[580px] mx-auto leading-relaxed">
                  Looking for reliable residential plumbing services or 24/7 emergency assistance in
                  Patna? Call or WhatsApp FIXIT PLUMBER directly—we are ready to help.
                </p>
                <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={BUSINESS_PHONE_TEL}
                    className="bg-black text-white hover:bg-neutral-900 rounded-md px-8 py-3 min-h-[44px] text-[12.5px] font-semibold tracking-wider uppercase inline-flex items-center gap-2 transition-colors cursor-pointer min-w-[180px] justify-center"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>CALL NOW</span>
                  </a>
                  <a
                    href={BUSINESS_WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#8EB279] text-[#0F2306] hover:bg-[#7FA569] rounded-md px-8 py-3 min-h-[44px] text-[12.5px] font-semibold tracking-wider uppercase inline-flex items-center gap-2 transition-colors cursor-pointer min-w-[180px] justify-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WHATSAPP US</span>
                  </a>
                </div>
              </div>
            </section>

            {/* 9. How Our Plumbing Service Works */}
            <section className="bg-white pt-10 pb-20 px-5 sm:px-8 lg:px-14">
              <div className="max-w-[1220px] mx-auto">
                <h2 className="text-center text-[28px] sm:text-[34px] lg:text-[38px] font-extrabold text-[#002B5C] tracking-tight mb-12">
                  How Our Plumbing Service Works
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {PROCESS_STEPS.map((step) => (
                    <div key={step.number} className="bg-[#C3D2BA] p-6 text-left">
                      <div className="text-[24px] font-extrabold text-[#1C6ED5] tabular-nums mb-3">
                        {step.number}
                      </div>
                      <h3 className="text-[16.5px] font-bold text-[#002B5C] leading-snug mb-2.5">
                        {step.title}
                      </h3>
                      <p className="text-[13.5px] text-[#475569] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 10. Our Commitment to Every Customer Banner */}
            <section className="relative w-full min-h-[360px] sm:min-h-[430px] lg:min-h-[480px] flex items-center justify-center overflow-hidden">
              <OptimizedImage
                src="/images/commitment-bg.jpg"
                alt=""
                aria-hidden="true"
                width={1920}
                height={758}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="relative z-10 text-center px-6 py-12">
                <p className="text-[11.5px] sm:text-[12.5px] font-semibold tracking-[0.2em] uppercase text-white/90 mb-3">
                  OUR SERVICE COMMITMENT
                </p>
                <h2 className="text-[30px] sm:text-[38px] lg:text-[44px] font-extrabold text-white tracking-tight">
                  Our Commitment to Every Customer
                </h2>
                <div className="w-14 h-[3px] bg-[#1C6ED5] mx-auto mt-4" />
              </div>
            </section>

            {/* 11. Customer Reviews Section */}
            <section className="bg-white py-20 px-5 sm:px-8 lg:px-14">
              <div className="max-w-[1100px] mx-auto text-center">
                <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-extrabold text-[#002B5C] tracking-tight mb-10">
                  What Our Customers Say
                </h2>

                <div className="max-w-[680px] mx-auto bg-[#A9B4A4] rounded-[16px] py-12 px-8 shadow-[0_8px_22px_rgba(0,0,0,0.12)]">
                  <div className="text-[34px] font-bold text-[#002B5C] leading-none mb-4 select-none">
                    &ldquo;
                  </div>
                  <p className="text-[17px] font-semibold text-[#1E293B] mb-3">
                    Customer Feedback &amp; Honest Reviews
                  </p>
                  <p className="text-[13.5px] text-[#1E293B] max-w-[490px] mx-auto leading-relaxed">
                    We appreciate honest feedback from homeowners and businesses across Patna who
                    have used FIXIT PLUMBER. If our team recently assisted you, please share your
                    experience with us directly—verified customer reviews are published here as they
                    are received.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[13.5px] font-semibold">
                    <a
                      href={`${BUSINESS_WHATSAPP_URL}?text=${encodeURIComponent(
                        'Hello FIXIT PLUMBER, I would like to share feedback on my plumbing service.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#002B5C] underline decoration-[#002B5C]/45 underline-offset-4 hover:text-[#0F2306] transition-colors py-1"
                    >
                      Share Feedback on WhatsApp
                    </a>
                    <span className="text-[#1E293B]/60" aria-hidden="true">
                      &bull;
                    </span>
                    <a
                      href={BUSINESS_EMAIL_LINK}
                      className="text-[#002B5C] underline decoration-[#002B5C]/45 underline-offset-4 hover:text-[#0F2306] transition-colors py-1"
                    >
                      Email Your Review
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* 12. Frequently Asked Questions */}
            <section className="bg-[#EBF2E7] py-20 px-5 sm:px-8 lg:px-14">
              <div className="max-w-[980px] mx-auto">
                <p className="text-[11.5px] font-bold tracking-[0.15em] uppercase text-[#135CB8] mb-2">
                  FAQ
                </p>
                <h2 className="text-[30px] sm:text-[36px] lg:text-[40px] font-extrabold text-[#002B5C] tracking-tight mb-9">
                  Frequently Asked Questions
                </h2>

                <div className="bg-[#FEFFFB] rounded-[8px] shadow-sm border border-black/5 divide-y divide-[#E2E8F0]">
                  {FAQ_ITEMS.map((faq, idx) => {
                    const isOpen = !!openFaqs[idx];
                    return (
                      <div key={faq.question}>
                        <h3 className="m-0">
                          <button
                            type="button"
                            onClick={() => toggleFaq(idx)}
                            aria-expanded={isOpen}
                            aria-controls={`faq-panel-${idx}`}
                            className="w-full px-6 sm:px-8 pt-6 pb-4 text-left flex items-center justify-between gap-4 hover:bg-black/[0.015] transition-colors cursor-pointer"
                          >
                            <span className="text-[16px] sm:text-[17px] font-bold text-[#002B5C]">
                              {faq.question}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-[#002B5C]/70 shrink-0 transition-transform duration-150 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        </h3>
                        {isOpen && (
                          <div
                            id={`faq-panel-${idx}`}
                            className="px-6 sm:px-8 pb-6 text-[14.5px] text-[#475569] leading-relaxed"
                          >
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* 13. Need a Reliable Plumber Banner + Contact & Enquiry Section */}
            <section id="contact" className="scroll-mt-[84px]">
              {/* Olive Banner */}
              <div className="bg-[#5C6B55] py-14 px-5 sm:px-8 lg:px-14">
                <div className="max-w-[1220px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-extrabold text-white tracking-tight">
                      Need a Reliable Plumber in Patna?
                    </h2>
                    <p className="mt-2.5 text-white/85 text-[14.5px] sm:text-[15.5px] max-w-[540px] leading-relaxed">
                      Don&apos;t let plumbing problems disrupt your daily routine. Contact FIXIT
                      PLUMBER for planned plumbing work or 24/7 emergency plumbing support in Patna.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 md:shrink-0">
                    <a
                      href={BUSINESS_PHONE_TEL}
                      className="bg-[#1D63C9] hover:bg-[#1752A8] text-white rounded-lg px-7 py-3 min-h-[44px] text-[13.5px] font-semibold inline-flex items-center gap-2 shadow-md transition-colors cursor-pointer"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Now</span>
                    </a>
                    <a
                      href={BUSINESS_WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#137A39] hover:bg-[#0E632D] text-white rounded-lg px-7 py-3 min-h-[44px] text-[13.5px] font-semibold inline-flex items-center gap-2 shadow-md transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Us</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Cards & WhatsApp Request Form */}
              <div className="bg-[#D5DDD1] py-16 px-5 sm:px-8 lg:px-14">
                <div className="max-w-[1220px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                  <div className="lg:col-span-5 space-y-4">
                    {/* Card 1: Call Us */}
                    <div className="bg-[#EEF2EB] border border-[#96A292] rounded-[16px] p-5 sm:p-6 shadow-sm flex items-start gap-4">
                      <div className="w-11 h-11 rounded-[12px] bg-[#002B5C] text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Phone className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[17px] font-extrabold text-[#002B5C] leading-snug">
                          Call Us
                        </h3>
                        <p className="mt-1 text-[15px] font-semibold text-[#111827] tabular-nums">
                          {BUSINESS_PHONE_DISPLAY}
                        </p>
                        <a
                          href={BUSINESS_PHONE_TEL}
                          className="mt-2.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#135CB8] hover:text-[#002B5C] transition-colors"
                        >
                          <span>Call Now</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      </div>
                    </div>

                    {/* Card 2: WhatsApp Us */}
                    <div className="bg-[#EEF2EB] border border-[#96A292] rounded-[16px] p-5 sm:p-6 shadow-sm flex items-start gap-4">
                      <div className="w-11 h-11 rounded-[12px] bg-[#137A39] text-white flex items-center justify-center shrink-0 shadow-sm">
                        <WhatsAppLogoIcon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[17px] font-extrabold text-[#002B5C] leading-snug">
                          WhatsApp Us
                        </h3>
                        <p className="mt-1 text-[15px] font-semibold text-[#111827] tabular-nums">
                          {BUSINESS_PHONE_DISPLAY}
                        </p>
                        <a
                          href={BUSINESS_WHATSAPP_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#137A39] hover:text-[#0E632D] transition-colors"
                        >
                          <span>Chat on WhatsApp</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      </div>
                    </div>

                    {/* Card 3: Email Us */}
                    <div className="bg-[#EEF2EB] border border-[#96A292] rounded-[16px] p-5 sm:p-6 shadow-sm flex items-start gap-4">
                      <div className="w-11 h-11 rounded-[12px] bg-[#135CB8] text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Mail className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[17px] font-extrabold text-[#002B5C] leading-snug">
                          Email Us
                        </h3>
                        <p className="mt-1 text-[14.5px] font-semibold text-[#111827] break-all">
                          <a
                            href={BUSINESS_EMAIL_LINK}
                            className="hover:text-[#135CB8] transition-colors"
                          >
                            {BUSINESS_EMAIL}
                          </a>
                        </p>
                        <a
                          href={BUSINESS_EMAIL_LINK}
                          className="mt-2.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#135CB8] hover:text-[#002B5C] transition-colors"
                        >
                          <span>Send Email</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      </div>
                    </div>

                    <div className="pt-4 pl-4 sm:pl-10">
                      <OptimizedImage
                        src="/images/scooter.png"
                        alt=""
                        aria-hidden="true"
                        width={282}
                        height={208}
                        className="w-40 sm:w-48 h-auto object-contain"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <ContactForm
                      selectedService={selectedService}
                      contactIntent={contactIntent}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 14. Our Service Areas in Patna */}
            <ServiceAreasSection />
          </>
        )}
      </main>

      {/* 14. Footer */}
      <footer className="bg-[#0F2306] text-white pt-16 pb-8 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[1220px] mx-auto space-y-10">
          {/* Brand Summary */}
          <div>
            <p className="text-[17px] font-bold tracking-wide text-white uppercase">
              FIXIT PLUMBER
            </p>
            <p className="mt-3 text-[13.5px] text-white/80 max-w-[760px] leading-relaxed">
              FIXIT PLUMBER provides household plumbing solutions in Patna, focusing on reliable
              service, quality workmanship and customer satisfaction.
            </p>
            <p className="mt-3 text-[13.5px] text-white/90">
              <span className="font-bold">Rishabh Kumar</span> · 12+ Years of Experience
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-[15.5px] font-bold text-white mb-3">Quick Links</h2>
            <ul className="space-y-1 text-[13.5px] text-white/80">
              <li>
                <AppLink
                  href="/"
                  className="inline-flex items-center gap-2 py-1 hover:text-white transition-colors"
                >
                  <span className="w-1 h-1 rounded-full bg-white/70 shrink-0" />
                  <span>Home</span>
                </AppLink>
              </li>
              <li>
                <AppLink
                  href="/#about"
                  className="inline-flex items-center gap-2 py-1 hover:text-white transition-colors"
                >
                  <span className="w-1 h-1 rounded-full bg-white/70 shrink-0" />
                  <span>About</span>
                </AppLink>
              </li>
              <li>
                <AppLink
                  href="/#services"
                  className="inline-flex items-center gap-2 py-1 hover:text-white transition-colors"
                >
                  <span className="w-1 h-1 rounded-full bg-white/70 shrink-0" />
                  <span>Services</span>
                </AppLink>
              </li>
              <li>
                <AppLink
                  href={ROUTE_REGISTRY['installation-replacement'].path}
                  className="inline-flex items-center gap-2 py-1 hover:text-white transition-colors"
                >
                  <span className="w-1 h-1 rounded-full bg-white/70 shrink-0" />
                  <span>Installation &amp; Replacement</span>
                </AppLink>
              </li>
              <li>
                <AppLink
                  href={ROUTE_REGISTRY['drain-sewer'].path}
                  className="inline-flex items-center gap-2 py-1 hover:text-white transition-colors"
                >
                  <span className="w-1 h-1 rounded-full bg-white/70 shrink-0" />
                  <span>Drain &amp; Sewer Services</span>
                </AppLink>
              </li>
              <li>
                <AppLink
                  href={ROUTE_REGISTRY['new-construction'].path}
                  className="inline-flex items-center gap-2 py-1 hover:text-white transition-colors"
                >
                  <span className="w-1 h-1 rounded-full bg-white/70 shrink-0" />
                  <span>New Construction &amp; Remodeling</span>
                </AppLink>
              </li>
              <li>
                <AppLink
                  href={ROUTE_REGISTRY['maintenance-inspection'].path}
                  className="inline-flex items-center gap-2 py-1 hover:text-white transition-colors"
                >
                  <span className="w-1 h-1 rounded-full bg-white/70 shrink-0" />
                  <span>Maintenance &amp; Inspection Program</span>
                </AppLink>
              </li>
            </ul>
          </div>

          {/* Our Plumbing Services */}
          <div>
            <h2 className="text-[15.5px] font-bold text-white mb-3">Our Plumbing Services</h2>
            <ul className="space-y-1 text-[13.5px] text-white/80">
              {FOOTER_SERVICES.map((item) => (
                <li key={item.id}>
                  <AppLink
                    href={`/#service-${item.id}`}
                    className="inline-flex items-center gap-2 py-1 hover:text-white transition-colors"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/70 shrink-0" />
                    <span>{item.label}</span>
                  </AppLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-[15.5px] font-bold text-white mb-3">Contact Information</h2>
            <div className="space-y-2 text-[13.5px] text-white/80 leading-relaxed">
              <p className="font-bold text-white">FIXIT PLUMBER</p>
              <p>Pure Ganga Vihar Colony, Patna, Bihar, India.</p>
              <p>Rishabh Kumar</p>
              <p>
                Phone:{' '}
                <a
                  href={BUSINESS_PHONE_TEL}
                  className="text-white hover:underline font-medium tabular-nums"
                >
                  {BUSINESS_PHONE_DISPLAY}
                </a>
              </p>
              <p>
                WhatsApp:{' '}
                <a
                  href={BUSINESS_WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline font-medium tabular-nums"
                >
                  {BUSINESS_PHONE_DISPLAY}
                </a>
              </p>
              <p>
                Email:{' '}
                <a
                  href={BUSINESS_EMAIL_LINK}
                  className="text-white hover:underline font-medium break-all"
                >
                  {BUSINESS_EMAIL}
                </a>
              </p>
              <p>Emergency Support: 24/7</p>
              <p>
                Service Areas: Khajpura, Bailey Road, Boring Road, Kankarbagh, Danapur, Ashiana
                Nagar, Anisabad, Rajendra Nagar, Beur, Phulwari Sharif, Gardanibagh, Sipara,
                Chitkohra Chawal Bazar, Bitaura, Tej Pratap Nagar &amp;{' '}
                <AppLink href="/#service-areas" className="text-white underline hover:text-white/90">
                  all 32 Patna areas
                </AppLink>
              </p>
            </div>
          </div>

          {/* Copyright & Back to Top */}
          <div className="border-t border-white/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-white/75">
            <p>&copy; 2026 FIXIT PLUMBER. All Rights Reserved.</p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="py-1.5 px-2 hover:text-white transition-colors cursor-pointer"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
