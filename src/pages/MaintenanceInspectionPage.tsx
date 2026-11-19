import {
  MAINTENANCE_INTRO_PARAGRAPHS,
  MAINTENANCE_CARDS,
} from '../data/maintenanceData';
import { AppLink } from '../components/AppLink';
import { ROUTE_REGISTRY } from '../routes';
import { OptimizedImage } from '../components/OptimizedImage';
import {
  ServiceBreadcrumb,
  ServicePageConnectAndRelated,
} from '../components/ServiceSubpageFooterLinks';

interface MaintenanceInspectionPageProps {
  onActionClick?: (mode: 'call' | 'whatsapp' | 'request') => void;
}

export function MaintenanceInspectionPage({
  onActionClick,
}: MaintenanceInspectionPageProps) {
  return (
    <div className="bg-white text-[#0F2306]">
      <ServiceBreadcrumb currentPage="maintenance-inspection" />

      {/* 1. Intro Heading Section */}
      <section className="bg-white pt-8 sm:pt-10 pb-8 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[1260px] mx-auto">
          <h1 className="text-[32px] sm:text-[46px] lg:text-[54px] font-extrabold text-[#0F2306] leading-[1.08] tracking-tight">
            Plumbing Maintenance &amp;
            <br className="hidden sm:inline" /> Inspection Services in Patna
          </h1>

          <h2 className="mt-8 sm:mt-10 text-[26px] sm:text-[36px] lg:text-[42px] font-extrabold text-[#0F2306] leading-[1.12] tracking-tight">
            Keep Your Plumbing System in Good
            <br className="hidden sm:inline" /> Working Condition
          </h2>

          <div className="mt-8 space-y-6 text-[15px] sm:text-[16.5px] text-[#0F2306]/90 leading-[1.55]">
            {MAINTENANCE_INTRO_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Four Detailed Maintenance & Inspection Cards */}
      <section className="bg-white py-4 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[1260px] mx-auto space-y-8 sm:space-y-10">
          {MAINTENANCE_CARDS.map((card, idx) => (
            <article
              key={card.id}
              id={card.id}
              className={`bg-[#D5DDD1] p-6 sm:p-9 lg:px-11 lg:py-9 ${
                card.bordered ? 'border border-[#7783A4]' : ''
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-start">
                <div className="lg:col-span-5">
                  <OptimizedImage
                    src={card.image}
                    alt={card.imageAlt}
                    width={card.id === 'commercial-maintenance-contracts' ? 473 : 554}
                    height={card.id === 'commercial-maintenance-contracts' ? 354 : 414}
                    priority={idx === 0}
                    className={`object-cover rounded-[20px] aspect-[4/3] ${
                      card.smallerPhoto ? 'w-full sm:w-[90%]' : 'w-full'
                    }`}
                  />
                </div>

                <div className="lg:col-span-7">
                  <h2 className="text-[28px] min-[375px]:text-[32px] sm:text-[42px] lg:text-[46px] font-extrabold text-[#0F2306] leading-[1.06] tracking-tight">
                    {card.titleLine1}
                    <br className="hidden sm:inline" /> {card.titleLine2}
                  </h2>

                  <h3 className="mt-4 text-[22px] sm:text-[26px] lg:text-[29px] font-extrabold text-[#0F2306] leading-[1.14] tracking-tight">
                    {card.subtitleLine1}
                    <br className="hidden sm:inline" /> {card.subtitleLine2}
                  </h3>

                  <div
                    className={`mt-4 space-y-4 text-[15px] sm:text-[16px] leading-[1.55] ${
                      card.paragraphTone === 'slate-blue'
                        ? 'text-[#2F465E]'
                        : 'text-[#0F2306]/90'
                    }`}
                  >
                    {card.paragraphs.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>

                  <p className="mt-5 text-[15px] sm:text-[15.5px] font-normal text-[#0F2306]">
                    {card.checklistTitle}
                  </p>

                  <ul className="mt-4 pl-6 list-disc space-y-0.5 text-[14.5px] sm:text-[15.5px] text-[#0F2306] leading-[1.48]">
                    {card.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Why Choose FIXIT PLUMBER for Plumbing Maintenance? */}
      <section className="bg-white pt-10 pb-16 sm:pb-24 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[1260px] mx-auto bg-[#F1F7FC]">
          <div className="bg-[#D6E1D0] py-6 px-6 sm:px-10 text-center">
            <h2 className="text-[26px] sm:text-[34px] lg:text-[38px] font-extrabold text-[#002B5C] leading-tight tracking-tight">
              Why Choose FIXIT PLUMBER for Plumbing Maintenance?
            </h2>
          </div>

          <div className="px-5 sm:px-10 lg:px-14 pt-8 pb-10 text-[#0F2306]">
            <p className="text-[15.5px] sm:text-[17px] leading-[1.55]">
              Good plumbing maintenance is about more than fixing leaks. Regular attention to
              pipes, fittings and{' '}
              <AppLink
                href={ROUTE_REGISTRY['drain-sewer'].path}
                className="text-[#002B5C] font-semibold underline decoration-[#002B5C]/40 underline-offset-2 hover:text-[#135CB8] transition-colors"
              >
                drainage connections
              </AppLink>{' '}
              helps property owners identify potential problems and plan necessary repairs or{' '}
              <AppLink
                href={ROUTE_REGISTRY['installation-replacement'].path}
                className="text-[#002B5C] font-semibold underline decoration-[#002B5C]/40 underline-offset-2 hover:text-[#135CB8] transition-colors"
              >
                pipe and water heater replacements
              </AppLink>
              .
            </p>

            <p className="mt-6 sm:pl-14 text-[15.5px] sm:text-[17px] leading-[1.55]">
              FIXIT PLUMBER focuses on practical inspections, clear recommendations and suitable
              maintenance solutions for homes and businesses in Patna.
            </p>

            <div className="mt-6 flex justify-center">
              <AppLink
                href="/#contact"
                onClick={() => onActionClick?.('request')}
                className="bg-[#DBE5D5] hover:bg-[#CFDDC7] border-2 border-[#707A2D] rounded-tl-[26px] rounded-br-[26px] rounded-tr-[4px] rounded-bl-[4px] px-6 sm:px-16 py-3 text-[14.5px] sm:text-[15.5px] font-medium text-[#0F2306] text-center transition-colors cursor-pointer"
              >
                Looking for Plumbing Maintenance in Patna?
              </AppLink>
            </div>

            <p className="mt-6 text-[15.5px] sm:text-[17px] leading-[1.55]">
              Whether you need an annual plumbing checkup, preventive maintenance or commercial
              plumbing assistance, contact FIXIT PLUMBER to discuss your requirements and available
              services.
            </p>

            <p className="mt-7 text-center text-[15.5px] sm:text-[17px]">
              FIXIT PLUMBER – Reliable Plumbing Care for Homes and Businesses.
            </p>
          </div>
        </div>
      </section>

      <ServicePageConnectAndRelated currentPage="maintenance-inspection" showContactCtas={true} />
    </div>
  );
}
