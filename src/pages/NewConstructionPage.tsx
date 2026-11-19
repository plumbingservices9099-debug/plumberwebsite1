import { Bath, Check, Wrench } from 'lucide-react';
import {
  NEW_CONSTRUCTION_SERVICES,
  NEW_CONSTRUCTION_WHY_CARDS,
  NewConstructionFeatureCard,
} from '../data/newConstructionData';
import { OptimizedImage } from '../components/OptimizedImage';
import { AppLink } from '../components/AppLink';
import { ROUTE_REGISTRY } from '../routes';
import {
  ServiceBreadcrumb,
  ServicePageConnectAndRelated,
} from '../components/ServiceSubpageFooterLinks';

function FeatureIcon({ type }: { type: NewConstructionFeatureCard['id'] }) {
  return (
    <div className="w-11 h-11 rounded-full bg-[#2C78DB] text-white flex items-center justify-center mb-4 shrink-0">
      {type === 'planning' && (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 19V5l14 14H5z" />
          <path d="M8.5 15.5v-4l4 4h-4z" />
        </svg>
      )}
      {type === 'reliable' && (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-white"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 3.2C12 3.2 6.5 9.8 6.5 14.2a5.5 5.5 0 0 0 11 0C17.5 9.8 12 3.2 12 3.2zm-1.9 12.1a.75.75 0 0 1-.95-.46 4.2 4.2 0 0 1 .28-2.95.75.75 0 1 1 1.34.67 2.7 2.7 0 0 0-.18 1.82.75.75 0 0 1-.49.92z" />
        </svg>
      )}
      {type === 'careful' && <Wrench className="w-5 h-5 text-white" />}
      {type === 'remodeling' && <Bath className="w-5 h-5 text-white" />}
      {type === 'inspection' && (
        <span className="w-5 h-5 rounded-[4px] bg-[#15803D] text-white inline-flex items-center justify-center">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </span>
      )}
    </div>
  );
}

export function NewConstructionPage() {
  return (
    <div className="bg-white text-[#0F2306]">
      <ServiceBreadcrumb currentPage="new-construction" />

      {/* 1. Hero Heading & 3-Card Service Grid */}
      <section className="bg-white pt-6 sm:pt-8 pb-12 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-[28px] min-[375px]:text-[34px] sm:text-[48px] lg:text-[56px] font-extrabold text-[#0F2306] leading-[1.08] tracking-tight text-center">
            New Construction &amp; Remodeling
            <br className="hidden sm:inline" /> Plumbing Services in Patna
          </h1>

          <h2 className="sr-only">
            New Construction, Full Home Re-Piping &amp; Remodeling Plumbing
          </h2>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {NEW_CONSTRUCTION_SERVICES.map((service, idx) => (
              <article
                key={service.id}
                id={service.id}
                className="bg-[#EBF2E7] rounded-[18px] p-6 sm:p-7 text-center flex flex-col"
              >
                <div className="rounded-[14px] overflow-hidden aspect-[4/3] bg-[#DDE6D7]">
                  <OptimizedImage
                    src={service.image}
                    alt={service.imageAlt}
                    width={474}
                    height={353}
                    priority={idx === 0}
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mt-5 text-[18px] sm:text-[20px] font-bold text-[#002B5C] leading-snug">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-[14px] sm:text-[15px] text-[#475569] leading-[1.55] px-1">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Why Choose FIXIT PLUMBER for Construction & Remodeling Plumbing? */}
      <section className="bg-white pt-10 sm:pt-14 pb-14 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-[#002B5C] leading-[1.15] tracking-tight text-center">
            Why Choose FIXIT PLUMBER for
            <br className="hidden sm:inline" /> Construction &amp; Remodeling Plumbing?
          </h2>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {NEW_CONSTRUCTION_WHY_CARDS.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-[16px] p-7 sm:p-8 text-left border border-[#E2E8F0] shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
              >
                <FeatureIcon type={card.id} />
                <h3 className="text-[18px] sm:text-[20px] font-bold text-[#002B5C] leading-snug mb-3">
                  {card.title}
                </h3>
                <p className="text-[14.5px] sm:text-[15.5px] text-[#475569] leading-[1.55]">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Planning a New Construction or Home Renovation? Info Banner */}
      <section className="bg-white pt-8 pb-20 sm:pb-28 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[1160px] mx-auto bg-[#E9EEDD] rounded-[40px] sm:rounded-[64px] px-6 sm:px-12 lg:px-20 py-10 sm:py-12 text-center">
          <p className="text-[15.5px] sm:text-[17.5px] text-[#0F2306] leading-[1.55] max-w-[920px] mx-auto">
            Every construction and renovation project has different plumbing requirements. We focus
            on understanding your layout, planning suitable connections and completing the agreed
            plumbing work with attention to proper fitting and functionality.
          </p>

          <h2 className="mt-7 text-[26px] min-[375px]:text-[30px] sm:text-[42px] lg:text-[50px] font-extrabold text-[#0F2306] leading-[1.08] tracking-tight">
            Planning a New Construction or
            <br className="hidden sm:inline" /> Home Renovation?
          </h2>

          <p className="mt-7 text-[15.5px] sm:text-[17.5px] text-[#0F2306] leading-[1.55] max-w-[820px] mx-auto">
            <AppLink
              href="/#contact"
              className="text-[#002B5C] font-semibold underline decoration-[#002B5C]/40 underline-offset-2 hover:text-[#135CB8] transition-colors"
            >
              Get in touch with FIXIT PLUMBER
            </AppLink>{' '}
            to discuss your new construction plumbing, home re-piping or remodeling requirements in
            Patna, Bihar. We also handle{' '}
            <AppLink
              href={ROUTE_REGISTRY['installation-replacement'].path}
              className="text-[#002B5C] font-semibold underline decoration-[#002B5C]/40 underline-offset-2 hover:text-[#135CB8] transition-colors"
            >
              water heater and pump installations
            </AppLink>{' '}
            and{' '}
            <AppLink
              href={ROUTE_REGISTRY['drain-sewer'].path}
              className="text-[#002B5C] font-semibold underline decoration-[#002B5C]/40 underline-offset-2 hover:text-[#135CB8] transition-colors"
            >
              drainage and sewer line connections
            </AppLink>{' '}
            for residential projects.
          </p>

          <p className="mt-7 text-[15.5px] sm:text-[17.5px] text-[#0F2306] leading-[1.55]">
            FIXIT PLUMBER – Reliable Plumbing Solutions for New Homes and Renovations.
          </p>
        </div>
      </section>

      <ServicePageConnectAndRelated currentPage="new-construction" showContactCtas={true} />
    </div>
  );
}
