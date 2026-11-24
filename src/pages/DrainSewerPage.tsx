import { Check, Home, RotateCw } from 'lucide-react';
import {
  DRAIN_SEWER_INTRO_PARAGRAPHS,
  DRAINAGE_INSTALLATION_DATA,
  SEWER_REPAIR_DATA,
  WHY_CHOOSE_DRAIN_SEWER_ITEMS,
  DrainSewerFeatureItem,
} from '../data/drainSewerData';
import { OptimizedImage } from '../components/OptimizedImage';
import { AppLink } from '../components/AppLink';
import { ROUTE_REGISTRY } from '../routes';
import {
  ServiceBreadcrumb,
  ServicePageConnectAndRelated,
} from '../components/ServiceSubpageFooterLinks';

interface DrainSewerPageProps {
  onActionClick?: (mode: 'call' | 'whatsapp' | 'request') => void;
  onBackHome?: () => void;
}

function WhyDrainIcon({ type }: { type: DrainSewerFeatureItem['id'] }) {
  return (
    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1E6FD9] flex items-center justify-center shrink-0">
      {type === 'accumulation' && (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-white"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 3.2C12 3.2 6.5 9.8 6.5 14.2a5.5 5.5 0 0 0 11 0C17.5 9.8 12 3.2 12 3.2zm-1.9 12.1a.75.75 0 0 1-.95-.46 4.2 4.2 0 0 1 .28-2.95.75.75 0 1 1 1.34.67 2.7 2.7 0 0 0-.18 1.82.75.75 0 0 1-.49.92z" />
        </svg>
      )}
      {type === 'flow' && <RotateCw className="w-5 h-5 text-white stroke-[2.3]" />}
      {type === 'timely' && (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="7.5" strokeDasharray="2.5 2.2" />
          <path d="M12 8.5v3.8l2.5 1.5" />
        </svg>
      )}
      {type === 'workmanship' && <Check className="w-5 h-5 text-[#0F2306] stroke-[2.6]" />}
      {type === 'residential' && <Home className="w-5 h-5 text-white stroke-[2]" />}
    </div>
  );
}

export function DrainSewerPage(_props: DrainSewerPageProps) {
  return (
    <div className="bg-[#FEFFFB] text-[#0F2306]">
      <ServiceBreadcrumb currentPage="drain-sewer" />

      {/* 1. Hero / Intro Section */}
      <section className="bg-[#FEFFFB] pt-10 sm:pt-12 pb-6 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[1320px] mx-auto">
          <div className="text-center">
            <p className="text-[11px] sm:text-[11.5px] font-bold text-[#0F2306] tracking-wide">
              Drain &amp; Sewer Services in Patna
            </p>
            <h1 className="mt-5 text-[34px] sm:text-[46px] lg:text-[54px] font-extrabold text-[#0F2306] leading-[1.1] tracking-tight">
              Drainage &amp; Sewer Line
              <br className="hidden sm:inline" /> Services in Patna
            </h1>
          </div>

          <div className="mt-7 max-w-[1120px] mx-auto space-y-5 text-[15.5px] sm:text-[17px] text-[#0F2306]/90 leading-[1.55]">
            {DRAIN_SEWER_INTRO_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Expert Drainage System Installation Service */}
      <section id="drainage-installation" className="bg-[#FEFFFB] pt-5 pb-12 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold text-[#0F2306] leading-[1.08] tracking-tight text-center">
            {DRAINAGE_INSTALLATION_DATA.mainTitleLine1}
            <br className="hidden sm:inline" /> {DRAINAGE_INSTALLATION_DATA.mainTitleLine2}
          </h2>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <OptimizedImage
                src={DRAINAGE_INSTALLATION_DATA.image}
                alt={DRAINAGE_INSTALLATION_DATA.imageAlt}
                width={756}
                height={567}
                priority
                className="w-full aspect-[4/3] object-cover rounded-[20px]"
              />
            </div>

            <div className="lg:col-span-7">
              <h3 className="text-[26px] sm:text-[32px] lg:text-[36px] font-extrabold text-[#0F2306] leading-[1.14] tracking-tight">
                {DRAINAGE_INSTALLATION_DATA.subHeadingLine1}
                <br className="hidden sm:inline" /> {DRAINAGE_INSTALLATION_DATA.subHeadingLine2}
              </h3>

              <div className="mt-6 space-y-5 text-[15.5px] sm:text-[17px] text-[#0F2306]/90 leading-[1.55] max-w-[580px]">
                {DRAINAGE_INSTALLATION_DATA.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <p className="mt-7 text-[18px] sm:text-[20px] font-normal text-[#0F2306]">
                {DRAINAGE_INSTALLATION_DATA.includesTitle}
              </p>

              <ul className="mt-5 pl-6 sm:pl-10 list-disc space-y-1 text-[15.5px] sm:text-[17px] text-[#0F2306] leading-[1.5]">
                {DRAINAGE_INSTALLATION_DATA.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10 text-center text-[12px] sm:text-[13px] text-[#0F2306]">
            {DRAINAGE_INSTALLATION_DATA.captionTitle}
          </p>
          <p className="mt-5 text-left text-[11px] sm:text-[11.5px] text-[#0F2306]">
            {DRAINAGE_INSTALLATION_DATA.captionNote}
          </p>
        </div>
      </section>

      {/* 3. Expert Sewer Line Repair & Replacement Service */}
      <section id="sewer-repair" className="bg-[#FEFFFB] pt-10 pb-14 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold text-[#0F2306] leading-[1.08] tracking-tight text-center">
            {SEWER_REPAIR_DATA.mainTitleLine1}
            <br className="hidden sm:inline" /> {SEWER_REPAIR_DATA.mainTitleLine2}
          </h2>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <OptimizedImage
                src={SEWER_REPAIR_DATA.image}
                alt={SEWER_REPAIR_DATA.imageAlt}
                width={756}
                height={567}
                className="w-full aspect-[4/3] object-cover rounded-[20px]"
              />
            </div>

            <div className="lg:col-span-7">
              <h3 className="text-[26px] sm:text-[32px] lg:text-[36px] font-extrabold text-[#0F2306] leading-[1.14] tracking-tight text-left lg:text-center max-w-[580px]">
                {SEWER_REPAIR_DATA.subHeadingLine1}
                <br className="hidden sm:inline" /> {SEWER_REPAIR_DATA.subHeadingLine2}
              </h3>

              <div className="mt-6 space-y-5 text-[15.5px] sm:text-[17px] text-[#0F2306]/90 leading-[1.55] max-w-[580px]">
                {SEWER_REPAIR_DATA.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <p className="mt-7 text-[18px] sm:text-[20px] font-normal text-[#0F2306]">
                {SEWER_REPAIR_DATA.includesTitle}
              </p>

              <ul className="mt-5 pl-6 sm:pl-10 list-disc space-y-1 text-[15.5px] sm:text-[17px] text-[#0F2306] leading-[1.5]">
                {SEWER_REPAIR_DATA.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10 text-center text-[12px] sm:text-[13px] text-[#0F2306]">
            {SEWER_REPAIR_DATA.captionTitle}
          </p>
          <p className="mt-5 text-center text-[11px] sm:text-[11.5px] text-[#0F2306]">
            {SEWER_REPAIR_DATA.captionNote}
          </p>
        </div>
      </section>

      {/* 4. Why Choose FIXIT PLUMBER for Drain & Sewer Services? */}
      <section className="bg-[#FEFFFB] py-10 sm:py-14 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[980px] mx-auto bg-[#C3D2BA] rounded-[16px] px-6 sm:px-14 lg:px-20 py-12 sm:py-16">
          <div className="text-center">
            <h2 className="text-[28px] sm:text-[38px] lg:text-[42px] font-extrabold text-[#0F2306] leading-[1.12] tracking-tight">
              Why Choose FIXIT PLUMBER
              <br className="hidden sm:inline" /> for Drain &amp; Sewer Services?
            </h2>
            <p className="mt-4 text-[14px] sm:text-[15px] text-[#263B52] max-w-[560px] mx-auto leading-[1.55]">
              A well-functioning drainage and sewer system keeps your home safe, clean and
              comfortable. Here is why the right expertise makes a difference.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 space-y-8 max-w-[740px] mx-auto">
            {WHY_CHOOSE_DRAIN_SEWER_ITEMS.map((item) => (
              <div key={item.id} className="flex items-start gap-5 sm:gap-6 text-left">
                <WhyDrainIcon type={item.id} />
                <div className="pt-0.5">
                  <h3 className="text-[16px] sm:text-[17px] font-bold text-[#002B5C] leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] sm:text-[14.5px] text-[#263B52] leading-[1.55]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Need Drainage or Sewer Line Services in Patna? */}
      <section className="bg-[#FEFFFB] pt-6 pb-20 sm:pb-32 lg:pb-40 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[1320px] mx-auto bg-[#EBF2E7] rounded-[24px] px-6 sm:px-14 lg:px-20 py-12 sm:py-16">
          <h2 className="text-[28px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#0F2306] leading-[1.12] tracking-tight text-center">
            Need Drainage or Sewer Line Services in
            <br className="hidden sm:inline" /> Patna?
          </h2>

          <div className="mt-8 sm:mt-10 max-w-[780px] mx-auto text-left space-y-10 text-[15.5px] sm:text-[17.5px] text-[#0F2306] leading-[1.55]">
            <p>
              Whether you need a new drainage system,{' '}
              <AppLink
                href={ROUTE_REGISTRY['installation-replacement'].path}
                className="text-[#002B5C] font-semibold underline decoration-[#002B5C]/40 underline-offset-2 hover:text-[#135CB8] transition-colors"
              >
                sump pump and pipe installation
              </AppLink>
              ,{' '}
              <AppLink
                href={ROUTE_REGISTRY['new-construction'].path}
                className="text-[#002B5C] font-semibold underline decoration-[#002B5C]/40 underline-offset-2 hover:text-[#135CB8] transition-colors"
              >
                new construction or remodeling pipelines
              </AppLink>
              ,{' '}
              <AppLink
                href={ROUTE_REGISTRY['maintenance-inspection'].path}
                className="text-[#002B5C] font-semibold underline decoration-[#002B5C]/40 underline-offset-2 hover:text-[#135CB8] transition-colors"
              >
                routine plumbing inspections
              </AppLink>
              , or repair of a damaged sewer line,{' '}
              <AppLink
                href="/#contact"
                className="text-[#002B5C] font-semibold underline decoration-[#002B5C]/40 underline-offset-2 hover:text-[#135CB8] transition-colors"
              >
                contact FIXIT PLUMBER
              </AppLink>{' '}
              to discuss your plumbing requirements and service availability in Patna, Bihar.
            </p>
            <p>FIXIT PLUMBER – Practical Drainage &amp; Sewer Plumbing Solutions.</p>
          </div>
        </div>
      </section>

      <ServicePageConnectAndRelated currentPage="drain-sewer" showContactCtas={true} />
    </div>
  );
}
