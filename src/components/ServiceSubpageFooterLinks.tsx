import { ChevronRight, Home, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { AppLink } from './AppLink';
import { PageRoute, ROUTE_REGISTRY } from '../routes';
import { BUSINESS_PHONE_TEL, BUSINESS_WHATSAPP_LINK } from '../data/plumbingData';

export function ServiceBreadcrumb({ currentPage }: { currentPage: Exclude<PageRoute, 'home' | 'not-found'> }) {
  const meta = ROUTE_REGISTRY[currentPage];

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-white/95 border-b border-black/[0.06] py-2.5 px-5 sm:px-8 lg:px-14"
    >
      <ol className="max-w-[1320px] mx-auto flex flex-wrap items-center gap-1.5 text-[12.5px] text-[#475569]">
        <li>
          <AppLink
            href="/"
            className="inline-flex items-center gap-1 hover:text-[#002B5C] font-medium transition-colors"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Home</span>
          </AppLink>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
        </li>
        <li>
          <AppLink
            href={meta.path}
            aria-current="page"
            className="font-semibold text-[#002B5C] hover:underline transition-colors"
          >
            {meta.shortLabel}
          </AppLink>
        </li>
      </ol>
    </nav>
  );
}

const RELATED_PAGES: Exclude<PageRoute, 'home' | 'not-found'>[] = [
  'installation-replacement',
  'drain-sewer',
  'new-construction',
  'maintenance-inspection',
];

export function ServicePageConnectAndRelated({
  currentPage,
  showContactCtas = true,
}: {
  currentPage: Exclude<PageRoute, 'home' | 'not-found'>;
  showContactCtas?: boolean;
}) {
  const otherServices = RELATED_PAGES.filter((key) => key !== currentPage);

  return (
    <section
      aria-label="Contact FIXIT PLUMBER and Related Plumbing Services"
      className="bg-[#EBF2E7] border-t border-black/5 py-12 px-5 sm:px-8 lg:px-14"
    >
      <div className="max-w-[1220px] mx-auto space-y-10">
        {showContactCtas && (
          <div className="bg-[#5C6B55] rounded-[20px] py-8 px-6 sm:px-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm">
            <div>
              <h2 className="text-[22px] sm:text-[26px] font-extrabold text-white tracking-tight">
                Request Plumbing Service in Patna
              </h2>
              <p className="mt-1.5 text-[14px] sm:text-[15px] text-white/90">
                Contact FIXIT PLUMBER directly by phone, WhatsApp, or send a service request.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 lg:shrink-0">
              <a
                href={BUSINESS_PHONE_TEL}
                className="bg-black text-white hover:bg-neutral-900 rounded-md px-6 py-2.5 min-h-[44px] text-[13px] font-semibold inline-flex items-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Call Now</span>
              </a>
              <a
                href={BUSINESS_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#137A39] text-white hover:bg-[#0E632D] rounded-md px-6 py-2.5 min-h-[44px] text-[13px] font-semibold inline-flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>WhatsApp Us</span>
              </a>
              <AppLink
                href="/#contact"
                className="bg-white text-[#002B5C] hover:bg-neutral-100 rounded-md px-6 py-2.5 min-h-[44px] text-[13px] font-semibold inline-flex items-center justify-center transition-colors"
              >
                Request a Service
              </AppLink>
            </div>
          </div>
        )}

        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
            <h2 className="text-[20px] sm:text-[22px] font-extrabold text-[#002B5C] tracking-tight">
              Explore Other Plumbing Services in Patna
            </h2>
            <AppLink
              href="/#services"
              className="text-[13.5px] font-semibold text-[#135CB8] hover:text-[#002B5C] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>View All General Plumbing Services</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </AppLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherServices.map((key) => {
              const item = ROUTE_REGISTRY[key];
              return (
                <AppLink
                  key={item.key}
                  href={item.path}
                  className="bg-white border border-[#002B5C]/12 rounded-[14px] p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-[#135CB8]/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-[15.5px] font-bold text-[#002B5C] leading-snug">
                      {item.label}
                    </h3>
                    <p className="mt-1.5 text-[13px] text-[#475569] leading-relaxed">
                      {item.serviceDescription}
                    </p>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#135CB8]">
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </AppLink>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
