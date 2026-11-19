import {
  Wrench,
  Search,
  Hammer,
  MessageSquare,
  Home,
  Shield,
  Phone,
  Check,
} from 'lucide-react';
import {
  INSTALLATION_SERVICES,
  EXPERT_TIPS,
  EXPERT_APPROACH_CARDS,
  SERVICE_APPROACH_STEPS,
  INSTALLATION_PROCESS_STEPS,
  ExpertApproachCard,
  InstallationProcessStep,
} from '../data/installationData';
import { BUSINESS_PHONE_TEL, BUSINESS_WHATSAPP_LINK } from '../data/plumbingData';
import { ROUTE_REGISTRY } from '../routes';
import { AppLink } from '../components/AppLink';
import { OptimizedImage } from '../components/OptimizedImage';
import {
  ServiceBreadcrumb,
  ServicePageConnectAndRelated,
} from '../components/ServiceSubpageFooterLinks';

interface InstallationReplacementPageProps {
  onActionClick: (mode: 'call' | 'whatsapp' | 'request') => void;
}

function ApproachIcon({ type }: { type: ExpertApproachCard['id'] }) {
  return (
    <div className="w-10 h-10 rounded-[10px] bg-[#1C6ED5] text-white flex items-center justify-center mb-4 shadow-sm">
      {type === 'approach' && <Wrench className="w-5 h-5" />}
      {type === 'inspection' && <Search className="w-5 h-5" />}
      {type === 'workmanship' && <Hammer className="w-5 h-5" />}
      {type === 'communication' && <MessageSquare className="w-5 h-5" />}
      {type === 'customer' && <Home className="w-5 h-5" />}
      {type === 'reliable' && <Shield className="w-5 h-5" />}
    </div>
  );
}

function ProcessStepIcon({ icon }: { icon: InstallationProcessStep['icon'] }) {
  if (icon === 'phone') {
    return <Phone className="w-4 h-4 text-[#475569]" />;
  }
  if (icon === 'search') {
    return <Search className="w-4 h-4 text-[#475569]" />;
  }
  if (icon === 'wrench') {
    return <Wrench className="w-4 h-4 text-[#475569]" />;
  }
  return (
    <span className="w-4 h-4 rounded-[3px] bg-[#16A34A] text-white inline-flex items-center justify-center">
      <Check className="w-3 h-3 stroke-[3]" />
    </span>
  );
}

export function InstallationReplacementPage({
  onActionClick,
}: InstallationReplacementPageProps) {
  return (
    <div className="bg-white">
      <ServiceBreadcrumb currentPage="installation-replacement" />

      {/* 1. Hero / Intro Section */}
      <section className="bg-white pt-12 sm:pt-14 pb-10 px-5 sm:px-8 lg:px-14 text-center">
        <div className="max-w-[1040px] mx-auto">
          <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#135CB8]">
            OUR SERVICES
          </p>
          <h1 className="mt-3 text-[30px] sm:text-[38px] lg:text-[42px] font-extrabold text-[#002B5C] leading-[1.16] tracking-tight">
            Plumbing Installation &amp;
            <br className="hidden sm:inline" /> Replacement Services in Patna
          </h1>
          <p className="mt-4 text-[14.5px] sm:text-[15.5px] text-[#475569] max-w-[540px] mx-auto leading-relaxed">
            Plumbing-focused installation, replacement and connection work for homes in Patna,
            Bihar.
          </p>

          <div className="mt-8 space-y-1.5 text-[14px] sm:text-[15px] text-[#2F465E] max-w-[960px] mx-auto leading-[1.7]">
            <p>
              Looking for reliable plumbing installation or replacement services in Patna? FIXIT
              PLUMBER provides practical plumbing solutions for residential properties, helping
              homeowners install, replace and maintain essential plumbing connections.
            </p>
            <p>
              From water pipe installation to water heater and pump connections, our focus is on
              suitable materials, proper fitting and careful workmanship. Whether you are setting up
              a new plumbing connection or replacing an existing component, we aim to provide a
              clean and dependable service.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Four Detailed Installation & Replacement Service Cards */}
      <section className="bg-white py-6 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[1160px] mx-auto space-y-10">
          {INSTALLATION_SERVICES.map((section, idx) => (
            <article
              key={section.id}
              id={section.id}
              className="bg-[#D5DDD1] rounded-[24px] px-6 sm:px-10 lg:px-12 py-9 sm:py-11 shadow-[0_8px_22px_rgba(0,0,0,0.08)]"
            >
              <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-extrabold text-[#111827] text-center tracking-tight leading-tight">
                {section.title}
              </h2>

              <h3 className="mt-5 mb-7 text-[20px] sm:text-[24px] lg:text-[27px] font-extrabold text-[#111827] tracking-tight leading-snug">
                {section.subtitle}
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-11 items-start">
                <div className="lg:col-span-5">
                  <OptimizedImage
                    src={section.image}
                    alt={section.imageAlt}
                    width={section.id === 'water-heater-services' ? 510 : 517}
                    height={388}
                    priority={idx === 0}
                    className="w-full aspect-[517/388] object-cover rounded-[16px] shadow-sm"
                  />
                </div>

                <div className="lg:col-span-7 text-[15px] sm:text-[15.5px] text-[#1F2937] leading-[1.6]">
                  <div className="space-y-4">
                    {section.paragraphs.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>

                  <ul className="mt-5 space-y-1.5 pl-4">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#111827] shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-8 text-center text-[12.5px] sm:text-[13px] text-[#2F465E]">
                {section.caption}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Helpful Plumbing Tips & Expert Advice */}
      <section className="bg-white pt-16 pb-14 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#135CB8]">
              EXPERT ADVICE
            </p>
            <h2 className="mt-2 text-[28px] sm:text-[34px] font-extrabold text-[#002B5C] tracking-tight">
              Helpful Plumbing Tips &amp; Expert Advice
            </h2>
            <p className="mt-3 text-[14.5px] text-[#475569] max-w-[540px] mx-auto leading-relaxed">
              Practical guidance to help you recognise plumbing issues early and make informed
              decisions about installations.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-7">
            {EXPERT_TIPS.map((tip) => (
              <article
                key={tip.id}
                className="bg-[#C3D2BA] rounded-[16px] p-6 sm:p-7 shadow-[0_6px_16px_rgba(0,0,0,0.08)] text-left"
              >
                <OptimizedImage
                  src={tip.image}
                  alt={tip.imageAlt}
                  width={tip.id === 'heater-tip' ? 188 : 187}
                  height={185}
                  className="w-28 h-28 rounded-[10px] object-cover mb-5"
                />
                <h3 className="text-[17px] font-bold text-[#002B5C] leading-snug mb-3">
                  {tip.title}
                </h3>
                <p className="text-[13.5px] text-[#475569] leading-[1.6]">{tip.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Our Installation Experts? */}
      <section className="bg-white pt-10 pb-14 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#135CB8]">
              OUR APPROACH
            </p>
            <h2 className="mt-2 text-[28px] sm:text-[34px] font-extrabold text-[#002B5C] leading-[1.2] tracking-tight">
              Why Choose Our Installation
              <br />
              Experts?
            </h2>
            <p className="mt-3 text-[14.5px] text-[#475569] max-w-[540px] mx-auto leading-relaxed">
              We focus on careful, well-communicated work that keeps your home&apos;s plumbing
              running smoothly.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPERT_APPROACH_CARDS.map((card) => (
              <div
                key={card.id}
                className="bg-[#C3D2BA] rounded-[16px] p-6 sm:p-7 shadow-[0_6px_16px_rgba(0,0,0,0.08)] text-left"
              >
                <ApproachIcon type={card.id} />
                <h3 className="text-[12.5px] font-extrabold tracking-wide uppercase text-[#002B5C] mb-2">
                  {card.title}
                </h3>
                <p className="text-[13.5px] text-[#475569] leading-[1.6]">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose FIXIT PLUMBER for Installation & Replacement Services? */}
      <section className="bg-white pt-10 pb-14 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[1160px] mx-auto">
          <h2 className="text-center text-[28px] sm:text-[36px] lg:text-[40px] font-extrabold text-[#111827] leading-[1.18] tracking-tight mb-10">
            Why Choose FIXIT PLUMBER for Installation &amp;
            <br className="hidden sm:inline" /> Replacement Services?
          </h2>

          <div className="space-y-5 text-[15px] sm:text-[16px] text-[#1F2937] leading-[1.65]">
            <p>
              Choosing the right plumbing service is important for the reliability of your
              home&apos;s water system. Poor pipe connections or incorrect installation can lead to
              leakage, water supply problems and avoidable repair costs
            </p>
            <p>
              At FIXIT PLUMBER, we focus on understanding your plumbing requirements and providing
              suitable installation and replacement solutions for residential properties in Patna.
              For full home upgrades, explore our{' '}
              <AppLink
                href={ROUTE_REGISTRY['new-construction'].path}
                className="text-[#002B5C] font-semibold underline decoration-[#002B5C]/40 underline-offset-2 hover:text-[#135CB8] transition-colors"
              >
                new construction and remodeling plumbing
              </AppLink>{' '}
              services, or keep new fixtures reliable with{' '}
              <AppLink
                href={ROUTE_REGISTRY['maintenance-inspection'].path}
                className="text-[#002B5C] font-semibold underline decoration-[#002B5C]/40 underline-offset-2 hover:text-[#135CB8] transition-colors"
              >
                plumbing maintenance and inspection
              </AppLink>
              .
            </p>
          </div>

          <h3 className="mt-7 mb-4 text-[20px] sm:text-[22px] font-medium text-[#111827]">
            Our Service Approach
          </h3>

          <ol className="list-decimal pl-5 space-y-1.5 text-[15px] sm:text-[16px] text-[#1F2937] leading-[1.65]">
            {SERVICE_APPROACH_STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. How Our Installation Service Works */}
      <section className="bg-white pt-10 pb-20 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#135CB8]">
              OUR PROCESS
            </p>
            <h2 className="mt-2 text-[28px] sm:text-[34px] font-extrabold text-[#002B5C] tracking-tight">
              How Our Installation Service Works
            </h2>
          </div>

          <div className="space-y-6">
            {INSTALLATION_PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="bg-[#EBF2E7] rounded-[14px] border-t-2 border-t-[#1C6ED5] p-6 sm:p-7 shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 shrink-0">
                    <ProcessStepIcon icon={step.icon} />
                    <span className="text-[22px] font-extrabold text-[#1C6ED5] tabular-nums leading-none">
                      {step.number}
                    </span>
                  </div>

                  {/* Connector line matching reference */}
                  <div className="hidden sm:flex items-center flex-1 ml-24">
                    <div className="h-[1px] bg-[#1C6ED5]/65 flex-1" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C6ED5]" aria-hidden="true" />
                  </div>
                </div>

                <h3 className="mt-3 text-[16px] font-bold text-[#002B5C]">{step.title}</h3>
                <p className="mt-1.5 text-[13.5px] text-[#475569]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Need Plumbing Installation or Replacement in Patna? CTA Banner */}
      <section className="bg-[#5C6B55] py-16 px-5 sm:px-8 lg:px-14 text-center">
        <div className="max-w-[760px] mx-auto">
          <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-extrabold text-white leading-[1.15] tracking-tight">
            Need Plumbing Installation or
            <br />
            Replacement in Patna?
          </h2>

          <div className="mt-5 space-y-4 text-[14.5px] sm:text-[15.5px] text-white/90 leading-relaxed">
            <p>
              Whether you need new water pipes, water heater connections or pump installation
              assistance, FIXIT PLUMBER is ready to discuss your plumbing requirements.
            </p>
            <p>
              <AppLink
                href="/#contact"
                onClick={() => onActionClick('request')}
                className="font-semibold text-white underline decoration-white/60 underline-offset-2 hover:text-white/90 transition-colors"
              >
                Contact us
              </AppLink>{' '}
              to explain your needs and enquire about service availability in your area.
            </p>
            <p>FIXIT PLUMBER – Reliable Plumbing Solutions in Patna, Bihar.</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={BUSINESS_PHONE_TEL}
              className="bg-black text-white hover:bg-neutral-900 rounded-md px-8 py-3 min-h-[44px] text-[13px] font-semibold min-w-[135px] transition-colors cursor-pointer inline-flex items-center justify-center"
            >
              Call Now
            </a>
            <a
              href={BUSINESS_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#8EB279] text-[#0F2306] hover:bg-[#7FA569] rounded-md px-8 py-3 min-h-[44px] text-[13px] font-semibold min-w-[155px] transition-colors cursor-pointer inline-flex items-center justify-center"
            >
              WhatsApp Us
            </a>
            <AppLink
              href="/#contact"
              onClick={() => onActionClick('request')}
              className="bg-white text-[#002B5C] hover:bg-neutral-100 rounded-md px-8 py-3 min-h-[44px] text-[13px] font-semibold min-w-[170px] transition-colors cursor-pointer inline-flex items-center justify-center"
            >
              Request a Service
            </AppLink>
          </div>
        </div>
      </section>

      <ServicePageConnectAndRelated
        currentPage="installation-replacement"
        showContactCtas={false}
      />
    </div>
  );
}
