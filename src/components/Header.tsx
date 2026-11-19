import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { BUSINESS_WHATSAPP_LINK } from '../data/plumbingData';
import { PageRoute, ROUTE_REGISTRY } from '../routes';
import { AppLink } from './AppLink';
import { OptimizedImage } from './OptimizedImage';

export type { PageRoute };

interface HeaderProps {
  currentPage: PageRoute;
  onActionClick: (mode: 'call' | 'whatsapp' | 'request') => void;
}

export function Header({ currentPage, onActionClick }: HeaderProps) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const closeAllMenus = () => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#EBF2E7]/95 backdrop-blur-sm border-b border-black/5">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-8 xl:px-14 h-[74px] flex items-center justify-between gap-3 xl:gap-4">
        {/* Left Logo */}
        <AppLink
          href="/"
          onClick={closeAllMenus}
          className="flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C6ED5] rounded-md"
          aria-label="FIXIT PLUMBER Home"
        >
          <OptimizedImage
            src="/images/logo.png"
            alt="FIXIT PLUMBER logo"
            width={265}
            height={80}
            loading="eager"
            className="h-10 sm:h-11 w-auto object-contain"
          />
        </AppLink>

        {/* Center Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-10 text-[12px] font-semibold tracking-[0.06em] text-[#111827]"
        >
          <AppLink
            href="/"
            onClick={closeAllMenus}
            className={`hover:text-[#065F96] transition-colors whitespace-nowrap ${
              currentPage === 'home' ? 'text-[#111827]' : ''
            }`}
          >
            HOME
          </AppLink>
          <AppLink
            href="/#about"
            onClick={closeAllMenus}
            className="hover:text-[#065F96] transition-colors whitespace-nowrap"
          >
            ABOUT
          </AppLink>

          {/* Services Hover Dropdown (Desktop) */}
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
              className={`flex items-center gap-1 py-2 hover:text-[#065F96] transition-colors whitespace-nowrap cursor-pointer ${
                currentPage === 'installation-replacement' ||
                currentPage === 'drain-sewer' ||
                currentPage === 'new-construction' ||
                currentPage === 'maintenance-inspection'
                  ? 'text-[#065F96]'
                  : ''
              }`}
            >
              <span>SERVICES</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  servicesOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {servicesOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1 z-50">
                <div
                  role="menu"
                  className="w-[330px] bg-white rounded-xl shadow-xl border border-black/10 py-2"
                >
                  <AppLink
                    href="/#services"
                    role="menuitem"
                    onClick={closeAllMenus}
                    className="block w-full text-left px-4 py-2.5 text-[13px] font-medium text-[#1F2937] hover:bg-[#EBF2E7] hover:text-[#002B5C] transition-colors cursor-pointer"
                  >
                    General Plumbing Service
                  </AppLink>
                  <AppLink
                    href={ROUTE_REGISTRY['installation-replacement'].path}
                    role="menuitem"
                    onClick={closeAllMenus}
                    className={`block w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors cursor-pointer ${
                      currentPage === 'installation-replacement'
                        ? 'bg-[#EBF2E7] text-[#002B5C] font-semibold'
                        : 'text-[#1F2937] hover:bg-[#EBF2E7] hover:text-[#002B5C]'
                    }`}
                  >
                    Installation &amp; Replacement
                  </AppLink>
                  <AppLink
                    href={ROUTE_REGISTRY['drain-sewer'].path}
                    role="menuitem"
                    onClick={closeAllMenus}
                    className={`block w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors cursor-pointer ${
                      currentPage === 'drain-sewer'
                        ? 'bg-[#EBF2E7] text-[#002B5C] font-semibold'
                        : 'text-[#1F2937] hover:bg-[#EBF2E7] hover:text-[#002B5C]'
                    }`}
                  >
                    Drain &amp; Sewer Services
                  </AppLink>
                  <AppLink
                    href={ROUTE_REGISTRY['new-construction'].path}
                    role="menuitem"
                    onClick={closeAllMenus}
                    className={`block w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors cursor-pointer ${
                      currentPage === 'new-construction'
                        ? 'bg-[#EBF2E7] text-[#002B5C] font-semibold'
                        : 'text-[#1F2937] hover:bg-[#EBF2E7] hover:text-[#002B5C]'
                    }`}
                  >
                    New Construction &amp; Remodeling
                  </AppLink>
                  <AppLink
                    href={ROUTE_REGISTRY['maintenance-inspection'].path}
                    role="menuitem"
                    onClick={closeAllMenus}
                    className={`block w-full text-left px-4 py-2.5 text-[13px] font-medium leading-snug transition-colors cursor-pointer ${
                      currentPage === 'maintenance-inspection'
                        ? 'bg-[#EBF2E7] text-[#002B5C] font-semibold'
                        : 'text-[#1F2937] hover:bg-[#EBF2E7] hover:text-[#002B5C]'
                    }`}
                  >
                    Comprehensive Plumbing Maintenance and Inspection Program
                  </AppLink>
                </div>
              </div>
            )}
          </div>

          <AppLink
            href="/#contact"
            onClick={closeAllMenus}
            className="hover:text-[#065F96] transition-colors whitespace-nowrap"
          >
            CONTACT
          </AppLink>
        </nav>

        {/* Right Desktop Action Buttons */}
        <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0">
          <a
            href={BUSINESS_WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setServicesOpen(false)}
            className="bg-white border border-[#475569] text-[#111827] hover:bg-neutral-50 rounded-full px-4 xl:px-6 py-2 text-[12.5px] font-medium transition-colors whitespace-nowrap cursor-pointer"
          >
            WhatsApp
          </a>
          <AppLink
            href="/#contact"
            onClick={() => {
              closeAllMenus();
              onActionClick('request');
            }}
            className="bg-black text-white hover:bg-neutral-800 rounded-full px-4 xl:px-6 py-2 text-[12.5px] font-medium transition-colors whitespace-nowrap cursor-pointer"
          >
            Request Plumbing Service
          </AppLink>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          className="lg:hidden p-2.5 -mr-1 rounded-lg text-[#111827] hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#065F96] transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#EBF2E7] border-t border-black/10 px-5 py-4 space-y-1 shadow-lg max-w-full max-h-[calc(100vh-74px)] overflow-y-auto overflow-x-hidden">
          <AppLink
            href="/"
            onClick={closeAllMenus}
            className="block py-2.5 text-sm font-semibold text-[#111827]"
          >
            HOME
          </AppLink>
          <AppLink
            href="/#about"
            onClick={closeAllMenus}
            className="block py-2.5 text-sm font-semibold text-[#111827]"
          >
            ABOUT
          </AppLink>

          {/* Collapsible Mobile Services Submenu */}
          <div>
            <button
              type="button"
              onClick={() => setMobileServicesOpen((prev) => !prev)}
              aria-expanded={mobileServicesOpen}
              className="w-full flex items-center justify-between py-2.5 text-sm font-semibold text-[#111827] cursor-pointer"
            >
              <span>SERVICES</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-150 ${
                  mobileServicesOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {mobileServicesOpen && (
              <div className="pl-3 pb-2 space-y-1 border-l-2 border-[#0877B9]/30 ml-1">
                <AppLink
                  href="/#services"
                  onClick={closeAllMenus}
                  className="block w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-[#1F2937] hover:bg-white/70 transition-colors cursor-pointer"
                >
                  General Plumbing Service
                </AppLink>
                <AppLink
                  href={ROUTE_REGISTRY['installation-replacement'].path}
                  onClick={closeAllMenus}
                  className={`block w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    currentPage === 'installation-replacement'
                      ? 'bg-white text-[#002B5C] font-semibold'
                      : 'text-[#1F2937] hover:bg-white/70'
                  }`}
                >
                  Installation &amp; Replacement
                </AppLink>
                <AppLink
                  href={ROUTE_REGISTRY['drain-sewer'].path}
                  onClick={closeAllMenus}
                  className={`block w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    currentPage === 'drain-sewer'
                      ? 'bg-white text-[#002B5C] font-semibold'
                      : 'text-[#1F2937] hover:bg-white/70'
                  }`}
                >
                  Drain &amp; Sewer Services
                </AppLink>
                <AppLink
                  href={ROUTE_REGISTRY['new-construction'].path}
                  onClick={closeAllMenus}
                  className={`block w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    currentPage === 'new-construction'
                      ? 'bg-white text-[#002B5C] font-semibold'
                      : 'text-[#1F2937] hover:bg-white/70'
                  }`}
                >
                  New Construction &amp; Remodeling
                </AppLink>
                <AppLink
                  href={ROUTE_REGISTRY['maintenance-inspection'].path}
                  onClick={closeAllMenus}
                  className={`block w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium leading-snug transition-colors cursor-pointer ${
                    currentPage === 'maintenance-inspection'
                      ? 'bg-white text-[#002B5C] font-semibold'
                      : 'text-[#1F2937] hover:bg-white/70'
                  }`}
                >
                  Comprehensive Plumbing Maintenance and Inspection Program
                </AppLink>
              </div>
            )}
          </div>

          <AppLink
            href="/#contact"
            onClick={closeAllMenus}
            className="block py-2.5 text-sm font-semibold text-[#111827]"
          >
            CONTACT
          </AppLink>

          <div className="pt-3 flex flex-col sm:flex-row gap-2.5">
            <a
              href={BUSINESS_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeAllMenus}
              className="w-full bg-white border border-[#475569] text-[#111827] rounded-full py-2.5 text-sm font-medium text-center cursor-pointer"
            >
              WhatsApp
            </a>
            <AppLink
              href="/#contact"
              onClick={() => {
                closeAllMenus();
                onActionClick('request');
              }}
              className="w-full bg-black text-white rounded-full py-2.5 text-sm font-medium text-center cursor-pointer"
            >
              Request Plumbing Service
            </AppLink>
          </div>
        </div>
      )}
    </header>
  );
}
