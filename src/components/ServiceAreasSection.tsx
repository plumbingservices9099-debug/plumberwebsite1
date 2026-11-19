import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { HOME_SERVICE_AREAS } from '../data/plumbingData';
import { AppLink } from './AppLink';

export function ServiceAreasSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      setPrefersReducedMotion(true);
      setIsVisible(true);
      return;
    }

    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="service-areas"
      aria-labelledby="service-areas-heading"
      className="bg-[#EBF2E7] py-14 sm:py-16 px-5 sm:px-8 lg:px-14 scroll-mt-[84px]"
    >
      <div className="max-w-[1220px] mx-auto">
        <div
          className={`text-center max-w-[700px] mx-auto ${
            prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : `transition-all duration-500 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`
          }`}
        >
          <h2
            id="service-areas-heading"
            className="text-[28px] sm:text-[34px] lg:text-[38px] font-extrabold text-[#002B5C] tracking-tight"
          >
            Our Service Areas in Patna
          </h2>
          <p className="mt-3 text-[14.5px] sm:text-[15.5px] text-[#475569] leading-relaxed">
            FIXIT PLUMBER provides professional plumbing installation, repair and maintenance
            services across Patna and nearby areas.{' '}
            <AppLink
              href="/#contact"
              className="text-[#002B5C] font-semibold underline decoration-[#002B5C]/40 underline-offset-2 hover:text-[#135CB8] transition-colors"
            >
              Contact us
            </AppLink>{' '}
            for reliable plumbing assistance in your locality.
          </p>
        </div>

        <ul className="mt-9 grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
          {HOME_SERVICE_AREAS.map((area, index) => (
            <li
              key={area}
              style={
                prefersReducedMotion
                  ? undefined
                  : { transitionDelay: isVisible ? `${Math.min(index * 16, 420)}ms` : '0ms' }
              }
              className={`group flex items-center gap-2.5 min-w-0 bg-white border border-[#002B5C]/10 rounded-[10px] px-3 sm:px-3.5 py-2.5 shadow-[0_2px_6px_rgba(0,43,92,0.05)] ${
                prefersReducedMotion
                  ? 'opacity-100 translate-y-0'
                  : `transition-[opacity,transform,box-shadow,border-color] duration-400 ease-out md:hover:-translate-y-0.5 md:hover:border-[#1C6ED5]/45 md:hover:shadow-[0_6px_16px_rgba(0,43,92,0.1)] ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`
              }`}
            >
              <span className="w-7 h-7 rounded-md bg-[#EBF3FE] text-[#1C6ED5] flex items-center justify-center shrink-0 transition-colors duration-200 md:group-hover:bg-[#1C6ED5] md:group-hover:text-white">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
              <span className="text-[13px] sm:text-[14px] font-semibold text-[#002B5C] leading-snug min-w-0 break-words">
                {area}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
